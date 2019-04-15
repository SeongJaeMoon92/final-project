#pylint: disable=R0201
from app import db, ma
from marshmallow import validates_schema, ValidationError, fields
from models.base import BaseModel, BaseSchema
from models.user import User, UserSchema

class Profile(db.Model, BaseModel):

    __tablename__ = 'profiles'

    name = db.Column(db.String(20), nullable=False)
    headline = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(20), nullable=False)
    image = db.Column(db.String)
    summary = db.Column(db.Text)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    owner = db.relationship('User', backref='user_profile')

class Experience(db.Model, BaseModel):

    __tablename__ = 'experiences'

    title = db.Column(db.String(40), nullable=False)
    company = db.Column(db.String(40), nullable=False)
    location = db.Column(db.String(30), nullable=False)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime)
    description = db.Column(db.Text)
    profile_id = db.Column(db.Integer, db.ForeignKey('profiles.id'))
    profile = db.relationship('Profile', backref='profile_experience')

class Education(db.Model, BaseModel):

    __tablename__ = 'educations'

    school = db.Column(db.String(40), nullable=False)
    degree = db.Column(db.String(100), nullable=False)
    field_of_study = db.Column(db.String(30), nullable=False)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime)
    grade = db.Column(db.String(10))
    description = db.Column(db.Text)
    profile_id = db.Column(db.Integer, db.ForeignKey('profiles.id'))
    profile = db.relationship('Profile', backref='profile_education')


class ProfileSchema(ma.ModelSchema, BaseSchema):
    name = fields.String(
        required=True,
        error_messages={'required': ''}
    )

    headline = fields.String(
        required=True,
        error_messages={'required': ''}
    )

    location = fields.String(
        required=True,
        error_messages={'required': ''}
    )

    profile_education = fields.Nested('EducationSchema', many=True)
    profile_experience = fields.Nested('ExperienceSchema', many=True)
    owner = fields.Nested('UserSchema', only=('id', 'username',))


    @validates_schema
    def validate_name(self, data):
        if not data.get('name'):
            raise ValidationError(
                'Name is required',
                'name'
            )

    @validates_schema
    def validate_headline(self, data):
        if not data.get('headline'):
            raise ValidationError(
                'Headline is required',
                'headline'
            )

    @validates_schema
    def validate_location(self, data):
        if not data.get('location'):
            raise ValidationError(
                'Location is required',
                'location'
            )

    class Meta:
        model = Profile

class ExperienceSchema(ma.ModelSchema, BaseSchema):
    title = fields.String(
        required=True,
        error_messages={'required': ''}
    )
    company = fields.String(
        required=True,
        error_messages={'required': ''}
    )
    location = fields.String(
        required=True,
        error_messages={'required': ''}
    )
    start_date = fields.DateTime(
        format='%Y-%m-%d',
        required=True,
        error_messages={'required': ''}
    )
    end_date = fields.DateTime(format='%Y-%m-%d')

    @validates_schema
    def validate_title(self, data):
        if not data.get('title') or data.get('title') == '':
            raise ValidationError(
                'Title is required',
                'title'
            )

    @validates_schema
    def validate_company(self, data):
        if not data.get('company'):
            raise ValidationError(
                'Company is required',
                'company'
            )

    @validates_schema
    def validate_location(self, data):
        if not data.get('location'):
            raise ValidationError(
                'Location is required',
                'location'
            )

    @validates_schema
    def validate_dates(self, data):
        if not data.get('start_date') or data.get('start_date') == '':
            raise ValidationError(
                'Start date is required',
                'start_date'
            )

    class Meta:
        model = Experience

class EducationSchema(ma.ModelSchema, BaseSchema):

    school = fields.String(
        required=True,
        error_messages={'required': ''}
    )

    degree = fields.String(
        required=True,
        error_messages={'required': ''}
    )

    field_of_study = fields.String(
        required=True,
        error_messages={'required': ''}
    )

    start_date = fields.DateTime(
        format='%Y-%m-%d',
        required=True,
        error_messages={'required': ''}
    )

    end_date = fields.DateTime(format='%Y-%m-%d')


    @validates_schema
    def validate_school(self, data):
        if not data.get('school'):
            raise ValidationError(
                'School is required',
                'school'
            )

    @validates_schema
    def validate_degree(self, data):
        if not data.get('degree'):
            raise ValidationError(
                'Degree is required',
                'degree'
            )

    @validates_schema
    def validate_field_of_study(self, data):
        if not data.get('field_of_study'):
            raise ValidationError(
                'Field of Study is required',
                'field_of_study'
            )

    @validates_schema
    def validate_education_date(self, data):
        if not data.get('start_date') or data.get('start_date') == '':
            raise ValidationError(
                'Start Date is required',
                'start_date'
            )

    class Meta:
        model = Education
