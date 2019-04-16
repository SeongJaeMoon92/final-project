from flask import Blueprint, request, jsonify, g
# pylint: disable=C0301
from models.friend import Friend, FriendSchema
from models.user import User, UserSchema
from lib.secure_route import secure_route

api = Blueprint('friends', __name__)
friend_schema = FriendSchema()

def friend_pending_declined(friend_a, friend_b):
    is_friend = Friend.query.filter(Friend.friend_a_id == friend_a, Friend.friend_b_id == friend_b, Friend.status == 'Accepted').first()

    is_pending = Friend.query.filter(Friend.friend_a_id == friend_a, Friend.friend_b_id == friend_b, Friend.status == 'Requested').first()

    is_declined = Friend.query.filter(Friend.friend_a_id == friend_a, Friend.friend_b_id == friend_b, Friend.status == 'Declined').first()

    return is_friend, is_pending, is_declined

@api.route('/friends', methods=['POST'])
@secure_route
def add_friend():
    data = request.get_json()
    friend_request, errors = friend_schema.load(data)

    if errors:
        return jsonify(errors), 422

    requester = g.current_user
    requestee = User.query.get(data['friend_b_id'])

    is_friend, is_pending, is_declined = friend_pending_declined(requester.id, requestee.id)

    if requester.id == requestee.id:
        return jsonify({'message': 'You cannot add yourself as a friend'}), 422
    if is_friend:
        return jsonify({'message': 'You are already friends'}), 422
    if is_pending:
        return jsonify({'message': 'Your friend request is pending'}), 422
    if is_declined:
        return jsonify({'message': 'Your friend request was declined'}), 422

    friend_request = Friend(friend_a_id=requester.id,
    friend_b_id=requestee.id, status='Requested')

    friend_request.save()
    return friend_schema.jsonify(friend_request), 201

@api.route('/friends/<int:friend_id>', methods=['PUT'])
@secure_route
def accept_friend(friend_id):
    friend_request = Friend.query.get(friend_id)
    friend_request, errors = friend_schema.load(request.get_json(), instance=friend_request, partial=True)
    if errors:
        return jsonify(errors), 422

    if friend_request.friend_b != g.current_user:
        return jsonify({'message': 'Unauthorized'}), 401

    friend_request.save()
    return friend_schema.jsonify(friend_request), 202
