from app import app, db

from models.user import UserSchema

from models.post.job_post import JobPost
from models.post.social_post import SocialPost
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
        industries=[consumer_services, insurance]
    )

    job_post_2 = JobPost(
        company='General Assembly',
        job_title="Some other job title",
        post_content='This is another job post. Join our amazing team today!',
        post_image='https://ga-core.s3.amazonaws.com/cms/files/files/000/000/886/original/ga-logo-gear.png',
        owner=hall,
        industries=[accounting, hospitality]
    )

    db.session.add(job_post_1)
    db.session.add(job_post_2)


# Social Posts

    social_post_1 = SocialPost(
        post_title="Some post title",
        post_content='This is a social post. Read my amazing article!',
        owner=hall,
        industries=[construction]
    )

    social_post_2 = SocialPost(
        post_title="Some other post title",
        post_content='This is another social post. BLah blah blah',
        owner=moon,
        industries=[insurance]
    )

    db.session.add(social_post_1)
    db.session.add(social_post_2)

    db.session.commit()
