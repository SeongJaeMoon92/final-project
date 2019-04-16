import os

secret = os.getenv('SECRET', 'shhhh its a secret')
db_uri = os.getenv('DATABASE_URL', 'postgres://localhost:5432/notlinkedin')
