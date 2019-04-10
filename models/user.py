from datetime import datetime, timedelta
from app import db, ma, bcrypt
from config.environment import secret
import jwt
from sqlalchemy.ext.hybrid import hybrid_property
from marshmallow import validates_schema, ValidationError, fields, validate
from .base import BaseModel, BaseSchema

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

    @validates_schema
    #pylint: disable=R0201
    def check_passwords_match(self, data):
        if data.get('password') != data.get('password_confirmation'):
            raise ValidationError(
            'Passwords do not match',
            'password_confirmation'
            )

    password = fields.String(
        required=True,
        validate=[validate.Length(min=8, max=50)]
    )

    password_confirmation = fields.String(required=True)

    owned_job_posts = fields.Nested('JobPostSchema', many=True)
    owned_social_posts = fields.Nested('SocialPostSchema', many=True)
    likes_job_post = fields.Nested('JobPostSchema', many=True, only=('id', 'job_title'))
    likes_social_post = fields.Nested('SocialPostSchema', many=True, only=('id', 'post_title'))
    sent_messages = fields.Nested('MessageSchema', many=True, only=('id', 'message_content', 'receiver'))
    received_messages = fields.Nested('MessageSchema', many=True, only=('id', 'message_content', 'sender_id'))

    class Meta:
        model = User
        exclude = ('password_hash', )
