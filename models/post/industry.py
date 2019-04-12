from app import db, ma
from marshmallow import fields
from models.base import BaseModel, BaseSchema

class Industry(db.Model, BaseModel):

    __tablename__ = 'industries'

    industry = db.Column(db.String(60), nullable=False)


class IndustrySchema(ma.ModelSchema, BaseSchema):

    job_posts = fields.Nested('JobPostSchema', many=True, only=('id', 'post_content',))
    social_posts = fields.Nested('SocialPostSchema', many=True, only=('id', 'post_content',))

    class Meta:
        model = Industry
