from datetime import datetime, timedelta
from app import db, ma, bcrypt
from config.environment import secret
import jwt
from sqlalchemy.ext.hybrid import hybrid_property
from marshmallow import validates_schema, ValidationError, fields, validate
from .base import BaseModel, BaseSchema

friend_to_friend = db.Table('friend_to_friend',
    db.Column('friend_a_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('friend_b_id', db.Integer, db.ForeignKey('users.id'), primary_key=True)
)

class User(db.Model, BaseModel):

    __tablename__ = 'users'

    username = db.Column(db.String(28), nullable=False, unique=True)
    email = db.Column(db.String(120), nullable=False, unique=True)
    password_hash = db.Column(db.String(128))

    @hybrid_property # equivalent of virtual
    def password(self):
        pass

    @password.setter
    def password(self, plaintext):
        self.password_hash = bcrypt.generate_password_hash(plaintext).decode('utf-8')

    def validate_password(self, plaintext):
        return bcrypt.check_password_hash(self.password_hash, plaintext)

    def generate_token(self):
        payload = {
        'exp': datetime.utcnow() + timedelta(days=1),
        'iat': datetime.utcnow(),
        'sub': self.id
        }

        token = jwt.encode(
            payload,
            secret,
            'HS256'
        ).decode('utf-8')

        return token

class UserSchema(ma.ModelSchema, BaseSchema):

    username = fields.String(
        required=True,
        error_messages={'required': ''}
    )

    email = fields.String(
        required=True,
        error_messages={'required': ''}
    )

    password = fields.String(
        required=True,
        validate=[validate.Length(min=8, max=50)]
    )

    password_confirmation = fields.String(required=True)

    @validates_schema
    #pylint: disable=R0201
    def validate_username(self, data):
        if not data.get('username'):
            raise ValidationError(
                'Username is required',
                'username'
            )

    @validates_schema
    #pylint: disable=R0201
    def validate_email(self, data):
        if not data.get('email'):
            raise ValidationError(
                'Email is required',
                'email'
            )

    @validates_schema
    #pylint: disable=R0201
    def check_passwords_match(self, data):
        if data.get('password') != data.get('password_confirmation'):
            raise ValidationError(
            'Passwords do not match',
            'password_confirmation'
            )

    user_profile = fields.Nested('ProfileSchema', only=('id',))
    owned_job_posts = fields.Nested('JobPostSchema', many=True)
    owned_social_posts = fields.Nested('SocialPostSchema', many=True)
    likes_job_post = fields.Nested('JobPostSchema', many=True, only=('id', 'job_title'))
    likes_social_post = fields.Nested('SocialPostSchema', many=True, only=('id', 'post_title'))
#pylint: disable=C0301
    sent_messages = fields.Nested('MessageSchema', many=True, only=('id', 'message_content', 'receiver', 'sender'))
    received_messages = fields.Nested('MessageSchema', many=True, only=('id', 'message_content', 'sender', 'receiver'))
    sent_friend_requests = fields.Nested('FriendSchema', many=True, only=('id', 'friend_b', 'status'))
    received_friend_requests = fields.Nested('FriendSchema', many=True, only=('id', 'friend_a', 'status'))

    class Meta:
        model = User
        exclude = ('password_hash', )
