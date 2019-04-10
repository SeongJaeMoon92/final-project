from app import app, db

from models.user import UserSchema
from models.profile_folder.profile import Profile, Experience, Education

from models.post.job_post import JobPost
from models.post.social_post import SocialPost, Comment
from models.post.industry import Industry

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

    if errors:
        raise Exception(errors)

    db.session.add(moon)

    wes, errors = user_schema.load({
        'username': 'wes',
    	'email': 'wes@email',
    	'password': 'wes12345',
    	'password_confirmation': 'wes12345'
    })

    if errors:
        raise Exception(errors)

    db.session.add(wes)

    hall, errors = user_schema.load({
        'username': 'hall',
    	'email': 'hall@email',
    	'password': 'hall12345',
    	'password_confirmation': 'hall12345'
    })

    if errors:
        raise Exception(errors)

    db.session.add(hall)

# Industries
    accounting = Industry(industry='Accounting')
    construction = Industry(industry='Construction')
    consumer_services = Industry(industry='Consumer Services')
    hospitality = Industry(industry='Hospitality')
    insurance = Industry(industry='Insurance')

    db.session.add(accounting)
    db.session.add(construction)
    db.session.add(consumer_services)
    db.session.add(hospitality)
    db.session.add(insurance)

# Job Posts

    job_post_1 = JobPost(
        company='General Assembly',
        job_title="Some job title",
        post_content='This is a job post. Come and work at our amazing company!',
        post_image='https://ga-core.s3.amazonaws.com/cms/files/files/000/000/886/original/ga-logo-gear.png',
        owner=moon,
        industries=[consumer_services, insurance],
        liked_by=[hall]
    )

    job_post_2 = JobPost(
        company='General Assembly',
        job_title="Some other job title",
        post_content='This is another job post. Join our amazing team today!',
        post_image='https://ga-core.s3.amazonaws.com/cms/files/files/000/000/886/original/ga-logo-gear.png',
        owner=hall,
        industries=[accounting, hospitality],
        liked_by=[moon]
    )

    db.session.add(job_post_1)
    db.session.add(job_post_2)


# Social Posts

    social_post_1 = SocialPost(
        post_title="Some post title",
        post_content='This is a social post. Read my amazing article!',
        owner=hall,
        industries=[construction],
        liked_by=[moon]
    )

    social_post_2 = SocialPost(
        post_title="Some other post title",
        post_content='This is another social post. BLah blah blah',
        owner=moon,
        industries=[insurance],
        liked_by=[hall]
    )

    db.session.add(social_post_1)
    db.session.add(social_post_2)

    # Social Posts Comment

    comment1 = Comment(content="funny hahah", social_post=social_post_1)

    db.session.add(comment1)

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
