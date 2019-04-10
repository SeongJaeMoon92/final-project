from app import app
from controllers import auth, posts, profiles, messages, external

app.register_blueprint(auth.api, url_prefix='/api')
app.register_blueprint(posts.api, url_prefix='/api')
app.register_blueprint(profiles.api, url_prefix='/api')
app.register_blueprint(messages.api, url_prefix='/api')
app.register_blueprint(external.api, url_prefix='/api')
