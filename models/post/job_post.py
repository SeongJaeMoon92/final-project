from app import db, ma
from marshmallow import fields
from models.user import User
from models.base import BaseModel, BaseSchema
from .industry import Industry
from marshmallow import validates_schema, ValidationError, fields, validate

likes_job_post = db.Table(
    'likes_job_post',
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
    liked_by = db.relationship('User', secondary=likes_job_post, backref='likes_job_post')


class JobPostSchema(ma.ModelSchema, BaseSchema):

    company = fields.String(
        required=True,
        error_messages={'required': ''}
    )

    job_title = fields.String(
        required=True,
        error_messages={'required': ''}
    )

    post_content = fields.String(
        required=True,
        error_messages={'required': ''}
    )

    liked_by = fields.Nested('UserSchema', many=True, only=('id', 'username'))
    owner = fields.Nested('UserSchema', only=('id', 'username', 'user_profile'))
    industries = fields.Nested('IndustrySchema', many=True, only=('id', 'industry'))

    @validates_schema
    #pylint: disable=R0201
    def validate_company(self, data):
        if not data.get('company'):
            raise ValidationError(
                'Company field is required',
                'company'
            )

    @validates_schema
    #pylint: disable=R0201
    def validate_job_title(self, data):
        if not data.get('job_title'):
            raise ValidationError(
                'Job title is required',
                'job_title'
            )

    @validates_schema
    #pylint: disable=R0201
    def validate_post_content(self, data):
        if not data.get('post_content'):
            raise ValidationError(
                'Content is required',
                'post_content'
            )

    class Meta:
        model = JobPost
