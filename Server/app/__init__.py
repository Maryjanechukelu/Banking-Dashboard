from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_mail import Mail
import datetime

db = SQLAlchemy()
migrate = Migrate()
bcrypt = Bcrypt()
jwt = JWTManager()
mail = Mail()  
blacklist = set()

def create_app():
    app = Flask(__name__)
    app.config.from_object('app.config.Config')
    #mail configuration
    app.config['MAIL_SERVER'] = 'smtp.gmail.com'
    app.config['MAIL_PORT'] = 587
    app.config['MAIL_USE_TLS'] = True
    app.config['MAIL_USERNAME'] = 'kevinejikez@gmail.com'
    app.config['MAIL_PASSWORD'] = 'Littleangel@08063085647'
    app.config['MAIL_DEFAULT_SENDER'] = 'kevinejikez@gmail.com'


    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    jwt.init_app(app)
    mail.init_app(app)  

    # Register blueprints
    from app.auth.views import auth_blueprint
    app.register_blueprint(auth_blueprint, url_prefix='/auth')

    # Enable CORS for the entire application
    CORS(app, resources={r"/*": {"origins": "*"}})

    # JWT token blacklist checking
    @jwt.token_in_blocklist_loader
    def check_if_token_is_revoked(jwt_header, jwt_payload):
        jti = jwt_payload['jti']
        return jti in blacklist

    return app
