from app import db, ma
from marshmallow import fields
from models.base import BaseModel, BaseSchema
from models.user import User, UserSchema

class Profile(db.Model, BaseModel):

    __tablename__ = 'profiles'

    name = db.Column(db.String(20), nullable=False)
    image = db.Column(db.String)
    summary = db.Column(db.Text)
    location = db.Column(db.String(20), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    owner = db.relationship('User', backref='user_profile')

class Education(db.Model, BaseModel):

    __tablename__ = 'educations'

    school = db.Column(db.String(40), nullable=False)
    degree = db.Column(db.String(100), nullable=False)
    field_of_study = db.Column(db.String(30), nullable=False)
    start_date = db.Column(db.Integer, nullable=False)
    end_date = db.Column(db.Integer)
    grade = db.Column(db.String(10))
    description = db.Column(db.Text)
    profile_id = db.Column(db.Integer, db.ForeignKey('profiles.id'))
    profile = db.relationship('Profile', backref='profile_education')

class Experience(db.Model, BaseModel):

    __tablename__ = 'experiences'

    title = db.Column(db.String(40), nullable=False)
    company = db.Column(db.String(40), nullable=False)
    location = db.Column(db.String(30), nullable=False)
    start_date = db.Column(db.Integer, nullable=False)
    end_date = db.Column(db.Integer)
    description = db.Column(db.Text)
    profile_id = db.Column(db.Integer, db.ForeignKey('profiles.id'))
    profile = db.relationship('Profile', backref='profile_experience')

class ProfileSchema(ma.ModelSchema, BaseSchema):
    profile_education = fields.Nested('EducationSchema', many=True)
    profile_experience = fields.Nested('ExperienceSchema', many=True)
    owner = fields.Nested('UserSchema', only=('id', 'username',))
    class Meta:
        model = Profile

class ExperienceSchema(ma.ModelSchema, BaseSchema):

    class Meta:
        model = Experience

class EducationSchema(ma.ModelSchema, BaseSchema):

    class Meta:
        model = Education
