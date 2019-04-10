from flask import Blueprint, request, jsonify, g
# pylint: disable=C0301
from models.friend import Friend, FriendSchema
from models.user import User, UserSchema
from lib.secure_route import secure_route

api = Blueprint('friends', __name__)
friend_schema = FriendSchema()

def friend_pending(friend_a, friend_b):
    is_friend = Friend.query.filter(Friend.friend_a_id == friend_a, Friend.friend_b_id == friend_b, Friend.status == 'Accepted').first()

    is_pending = Friend.query.filter(Friend.friend_a_id == friend_a, Friend.friend_b_id == friend_b, Friend.status == 'Requested').first()

    return is_friend, is_pending

@api.route('/friends', methods=['POST'])
@secure_route
def add_friend():
    data = request.get_json()
    friend, errors = friend_schema.load(data)
    print(data, 'THISISTHEDATA')
    print(data['friend_b_id'], 'THISISFRIENDID')
    print(friend)
    friend.friend_b = User.query.filter_by(id=data['friend_b_id']).first()
    print('B', friend.friend_b)
    if errors:
        return jsonify(errors), 422
        friend.friend_a = g.current_user
    print('A', friend.friend_a)

    is_friend, is_pending = friend_pending(friend.friend_a, friend.friend_b)

    if friend.friend_a == friend.friend_b:
        return jsonify({'message': 'You cannot add yourself as a friend'})
    if is_friend:
        return jsonify({'message': 'You are already friend'})
    if is_pending:
        return jsonify({'message': 'Your friend request is pending'})
    friend = Friend(friend_a_id=friend.friend_a,
    friend_b_id=friend.friend_b, status='Requested')

    friend.save()
    return friend_schema.jsonify(friend), 201
