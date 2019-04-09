from app import app, db

from models.user import UserSchema
from models.profile_folder.profile import Profile, Experience, Education

user_schema = UserSchema()

with app.app_context():
    db.drop_all()
    db.create_all()

    moon, errors = user_schema.load({
        'username': 'moon',
    	'email': 'moon@email',
    	'password': 'moon12345',
    	'password_confirmation': 'moon12345'
    })

    wes, errors = user_schema.load({
        'username': 'wes',
    	'email': 'wes@email',
    	'password': 'wes12345',
    	'password_confirmation': 'wes12345'
    })

    if errors:
        raise Exception(errors)

    db.session.add(moon)

    test_subject1 = Profile(name='Wesley Hall',
    summary='I like to dance', location='Royal Oak', owner=wes)

    test_subject2 = Profile(name='Seong Jae Moon',
    summary='I dont like to dance', location='Sutton', owner=moon)

    education1 = Education(school='GA',
    field_of_study='Web Development Immersive',
    date_from=2019, date_to=2019, grade='D', profile=test_subject1)

    education2 = Education(school='Kings College',
    field_of_study='Physics',
    date_from=2017, date_to=2019, grade='First', profile=test_subject2)

    education3 = Education(school='GA2',
    field_of_study='Web Development Immersive',
    date_from=2019, date_to=2019, grade='D', profile=test_subject1)

    experience1 = Experience(title='Marketing Executive',
    company='General Assembly', location='Aldgate',
    start_date=2018, end_date=2019, description='GA is amazing', profile=test_subject2)

    db.session.add(experience1)

    db.session.add(education1)
    db.session.add(education2)
    db.session.add(education3)

    db.session.add(test_subject1)
    db.session.add(test_subject2)


    db.session.commit()
