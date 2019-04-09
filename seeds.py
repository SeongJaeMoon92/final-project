from app import app, db

from models.user import UserSchema

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

    db.session.commit()
