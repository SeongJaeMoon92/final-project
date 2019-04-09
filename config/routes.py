from app import app
from controllers import auth, profiles

app.register_blueprint(auth.api, url_prefix='/api')
app.register_blueprint(profiles.api, url_prefix='/api')
