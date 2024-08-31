from app import create_app, db
from app.models import User  # Ensure the correct path to your User model
from flask_bcrypt import Bcrypt

app = create_app()
bcrypt = Bcrypt(app)

with app.app_context():  # Establishing the application context
    # Hash the password before setting it
    password = "adminpassword"  # Replace with the desired admin password
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    
    # Create the admin user
    admin_user = User(
        username="admin",  # Replace with the desired admin username
        email="admin@gmail.com",  # Replace with the desired admin email
        password_hash=hashed_password,
        is_admin=True,  # Assuming you have an is_admin field in your User model
    )
    
    db.session.add(admin_user)
    db.session.commit()

    print("Admin user created successfully.")

