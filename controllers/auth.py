from flask import Blueprint, jsonify, request, g
from models.user import User, UserSchema
from models.profile_folder.profile import Profile, ProfileSchema
from lib.helpers import is_unique
from lib.secure_route import secure_route

api = Blueprint('auth', __name__)

user_schema = UserSchema()
profile_schema = ProfileSchema()

@api.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    user, errors = user_schema.load(data)

    if not is_unique(model=User, key='username', value=data['username']):
        errors['username'] = errors.get('username', []) + ['Username already taken']

    if not is_unique(model=User, key='email', value=data['email']):
        errors['email'] = errors.get('email', []) + ['Email already taken']

    if errors:
        return jsonify(errors), 422
    user.save()
    return jsonify({'message': 'Registration successful'}), 201

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data.get('email')).first()

    if not user or not user.validate_password(data.get('password', '')):
        return jsonify({'message': 'Unauthorized'}), 401
    return jsonify({
        'message': 'Welcome back {}!'.format(user.username),
        'token': user.generate_token()
    })

@api.route('/users/<int:user_id>/profile', methods=['GET'])
@secure_route
def user_profile_show(user_id):
    profile = Profile.query.filter_by(owner_id=user_id).first()
    if profile.owner != g.current_user:
        return jsonify({'message': 'Unauthorized'}), 401
    return profile_schema.jsonify(profile), 200

    @api.route('/users/<int:user_id>', methods=['GET'])
    @secure_route
    def user(user_id):
        user = User.query.get(user_id)
        if user != g.current_user:
            return jsonify({'message': 'Unauthorized'}), 401
        return user_schema.jsonify(user), 200
