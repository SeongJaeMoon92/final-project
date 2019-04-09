from app import app
from controllers import auth

app.register_blueprint(auth.api, url_prefix='/api')
