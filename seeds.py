from app import app, db

from models.user import UserSchema
from models.profile_folder.profile import Profile, Experience, Education
from models.message import Message
from models.post.job_post import JobPost
from models.post.social_post import SocialPost, Comment
from models.post.industry import Industry
from models.friend import Friend

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

    jack, errors = user_schema.load({
        'username': 'beanslord',
    	'email': 'jack@email',
    	'password': 'password',
    	'password_confirmation': 'password'
    })

    if errors:
        raise Exception(errors)

    db.session.add(jack)

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
        liked_by=[wes]
    )

    job_post_2 = JobPost(
        company='General Assembly',
        job_title="Some other job title",
        post_content='This is another job post. Join our amazing team today!',
        post_image='https://ga-core.s3.amazonaws.com/cms/files/files/000/000/886/original/ga-logo-gear.png',
        owner=wes,
        industries=[accounting, hospitality],
        liked_by=[moon]
    )

    db.session.add(job_post_1)
    db.session.add(job_post_2)


# Social Posts

    social_post_1 = SocialPost(
        post_title="Some post title",
        post_content='This is a social post. Read my amazing article!',
        owner=wes,
        industries=[construction],
        liked_by=[moon]
    )

    social_post_2 = SocialPost(
        post_title="Some other post title",
        post_content='This is another social post. BLah blah blah',
        owner=moon,
        industries=[insurance],
        liked_by=[wes]
    )

    db.session.add(social_post_1)
    db.session.add(social_post_2)

    # Social Posts Comment

    comment1 = Comment(content="funny hahah", social_post=social_post_1, user=wes)

    db.session.add(comment1)

    profile_wes = Profile(name='Wesley Hall',
    summary='I like to dance', location='Royal Oak', owner=wes)

    profile_moon = Profile(name='Seong Jae Moon',
    summary='I dont like to dance', location='Sutton', owner=moon)

    education1 = Education(
        school='General Assembly',
        degree='Web Development Immersive',
        field_of_study='Web Development',
        date_from=2019,
        date_to=2019,
        description='A 12-week immersive course in web development.',
        profile=profile_wes
    )

    education2 = Education(
        school='Regent\'s University London',
        degree='BA (Hons) International Business with Marketing and Chinese (Mandarin)',
        field_of_study='International Business',
        date_from=2011,
        date_to=2014,
        grade='2:1',
        profile=profile_wes
    )

    education3 = Education(
        school='King\'s College',
        field_of_study='Physics',
        date_from=2017,
        date_to=2019,
        grade='First',
        profile=profile_moon
    )

    experience1 = Experience(
        title='Marketing Executive',
        company='SSL247',
        location='London, UK',
        start_date=2017,
        end_date=2018,
        description='Marketing Executive for a web security and cybersecurity company.',
        profile=profile_wes
    )
    experience2 = Experience(
        title='Marketing Assistant',
        company='First Point Group',
        location='London, UK',
        start_date=2016,
        end_date=2017,
        description='Marketing Assistant for a recruitment company specialising in telecommunications, broadcast media and cybersecurity.',
        profile=profile_wes
    )

    message1 = Message(message_content='Hello check check', sender=moon, receiver=wes)
    message2 = Message(message_content='Hello 2 check check', sender=moon, receiver=wes)
    message3 = Message(message_content='Hello 3 check check', sender=wes, receiver=moon)

    friend1 = Friend(friend_a=moon, friend_b=wes, status='Accepted')

    db.session.add(friend1)

    db.session.add(message1)
    db.session.add(message2)
    db.session.add(message3)

    db.session.add(experience1)

    db.session.add(education1)
    db.session.add(education2)
    db.session.add(education3)

    db.session.add(profile_wes)
    db.session.add(profile_moon)


    db.session.commit()
