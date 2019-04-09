from app import db, ma
from marshmallow import fields
from models.base import BaseModel, BaseSchema

class Interest(db.Model, BaseModel):

    __tablename__ = 'interests'

    interest = db.Column(db.String(20), nullable=False)


class InterestSchema(ma.ModelSchema, BaseSchema):

    job_posts = fields.Nested('JobPostSchema', many=True, only=('id', 'post_content',))
    social_posts = fields.Nested('SocialPostSchema', many=True, only=('id', 'post_content',))

    class Meta:
        model = Interest
