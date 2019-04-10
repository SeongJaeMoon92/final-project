from app import db, ma
from marshmallow import fields
from models.base import BaseModel, BaseSchema
from models.user import User
from .industry import Industry

likes_social_post = db.Table(
    'likes_social_post',
    db.Column('social_post_id', db.Integer, db.ForeignKey('social_posts.id')),
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'))
)

industries_social_posts = db.Table('industries_social_posts',
    db.Column('industry_id', db.Integer, db.ForeignKey('industries.id'), primary_key=True),
    db.Column('social_post_id', db.Integer, db.ForeignKey('social_posts.id'), primary_key=True)
)

class SocialPost(db.Model, BaseModel):

    __tablename__ = 'social_posts'
    post_title = db.Column(db.String(50), nullable=False)
    post_content = db.Column(db.Text, nullable=False)
    post_image = db.Column(db.String)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    owner = db.relationship('User', backref='owned_social_posts')
    industries = db.relationship('Industry', secondary=industries_social_posts, backref='social_posts')
    liked_by = db.relationship('User', secondary=likes_social_post, backref='likes_social_post')


class Comment(db.Model, BaseModel):

    __tablename__ = 'comments'

    content = db.Column(db.Text, nullable=False)
    social_post_id = db.Column(db.Integer, db.ForeignKey('social_posts.id'))
    social_post = db.relationship('SocialPost', backref='comments')
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User')

class SocialPostSchema(ma.ModelSchema, BaseSchema):

    comments = fields.Nested('CommentSchema', many=True, only=('content', 'user', 'id'))
    liked_by = fields.Nested('UserSchema', many=True, only=('id', 'username'))
    owner = fields.Nested('UserSchema', only=('id', 'username'))
    industries = fields.Nested('IndustrySchema', many=True, only=('id', 'industry'))


    class Meta:
        model = SocialPost

class CommentSchema(ma.ModelSchema):

    user = fields.Nested('UserSchema', only=('username',) )
    class Meta:
        model = Comment
