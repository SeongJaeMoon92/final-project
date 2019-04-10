from app import db, ma
from marshmallow import fields
from models.user import User
from models.base import BaseModel, BaseSchema
from .industry import Industry

likes = db.Table(
    'likes',
    db.Column('job_post_id', db.Integer, db.ForeignKey('job_posts.id')),
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'))
)

industries_job_posts = db.Table('industries_job_posts',
    db.Column('industry_id', db.Integer, db.ForeignKey('industries.id'), primary_key=True),
    db.Column('job_post_id', db.Integer, db.ForeignKey('job_posts.id'), primary_key=True)
)

class JobPost(db.Model, BaseModel):

    __tablename__ = 'job_posts'

    company = db.Column(db.String(50), nullable=False)
    job_title = db.Column(db.String(50), nullable=False)
    post_content = db.Column(db.Text, nullable=False)
    post_image = db.Column(db.String)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    owner = db.relationship('User', backref='owned_job_posts')
    industries = db.relationship('Industry', secondary=industries_job_posts, backref='job_posts')
    liked_by = db.relationship('User', secondary=likes, backref='likes')


class JobPostSchema(ma.ModelSchema, BaseSchema):

    liked_by = fields.Nested('UserSchema', many=True, only=('id', 'username'))
    owner = fields.Nested('UserSchema', only=('id', 'username'))
    industries = fields.Nested('IndustrySchema', many=True, only=('id', 'industry'))

    class Meta:
        model = JobPost
