from app import db, ma
from marshmallow import fields
from models.base import BaseModel, BaseSchema
from models.user import User

class Message(db.Model, BaseModel):

    __tablename__ = 'messages'

    message_content = db.Column(db.Text, nullable=False)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    receiver_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    sender = db.relationship('User', foreign_keys=[sender_id], backref='sent_messages')
    receiver = db.relationship('User', foreign_keys=[receiver_id], backref='received_messages')

    def __str__(self):
        return f'{self.id}'

class MessageSchema(ma.ModelSchema, BaseSchema):
    sender = fields.Nested('UserSchema', only=('id', 'username', 'user_profile'))
    receiver = fields.Nested('UserSchema', only=('id', 'username', 'user_profile'))

    class Meta:
        model = Message
