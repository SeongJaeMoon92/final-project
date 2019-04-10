from flask import Blueprint, jsonify, request, g
from sqlalchemy import or_
from models.user import User, UserSchema
from models.message import Message, MessageSchema
from lib.secure_route import secure_route

user_schema = UserSchema()
message_schema = MessageSchema()

api = Blueprint('messages', __name__)

@api.route('/messages', methods=['GET'])
@secure_route
def profile():
    return user_schema.jsonify(g.current_user), 200

@api.route('/messages', methods=['POST'])
@secure_route
def message_create():
    data = request.get_json()
    message, errors = message_schema.load(data)
    if errors:
        return jsonify(errors), 422
    message.sender = g.current_user
    message.receiver = User.query.get(data['receiver_id'])
    message.save()
    return message_schema.jsonify(message), 201
