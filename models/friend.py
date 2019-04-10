from app import db, ma
from marshmallow import fields
from .base import BaseModel, BaseSchema
from .user import User

class Friend(db.Model, BaseModel):

    __tablename__ = 'friends'

    friend_a_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    friend_b_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    status = db.Column(db.String(100))

    friend_a = db.relationship('User', foreign_keys=[friend_a_id], backref='sent_friend_requests')
    friend_b = db.relationship('User', foreign_keys=[friend_b_id], backref='received_friend_requests')

    def __str__(self):
        return f'{self.friend_a_id, self.status}'

class FriendSchema(ma.ModelSchema, BaseSchema):

    friend_a = fields.Nested('UserSchema', only=('id', 'username'))
    friend_b = fields.Nested('UserSchema', only=('id', 'username'))
    class Meta:

        model = Friend
