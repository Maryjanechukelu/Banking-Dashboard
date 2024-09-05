# backend/app/auth/views.py

from flask import Blueprint, request, jsonify
from app import db, bcrypt
from app.models import User
from flask_jwt_extended import (
    create_access_token, create_refresh_token, jwt_required, get_jwt_identity, 
    get_jwt
)
from datetime import timedelta

auth_blueprint = Blueprint('auth', __name__)

# Utility function to get current user
def get_current_user():
    try:
        current_user_identity = get_jwt_identity()
        if current_user_identity:
            return User.query.filter_by(username=current_user_identity['username']).first()
    except Exception as e:
        print(f"Error retrieving current user: {e}")
    return None

@auth_blueprint.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    
    if User.query.filter_by(username=username).first() is not None:
        return jsonify({"error": "Username already taken"}), 400
    
    new_user = User(username=username, email=email)
    new_user.set_password(password)
    new_user.account_balance = 0.00
    
    db.session.add(new_user)
    db.session.commit()
    # Send a welcome email with the account number
    msg = Message(
        "Welcome to Ultra",
        recipients=[email]
    )
    msg.body = f"Dear {username},\n\nWelcome to Ultra Account!\n\nYour account number is: {new_user.account_number}\n\nThank you for joining us."

    mail.send(msg)
    
    return jsonify({"message": "User registered successfully", "account_number": new_user.account_number}), 201

@auth_blueprint.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    user = User.query.filter_by(username=username).first()
    
    if user is None or not user.check_password(password):
        return jsonify({"error": "Invalid credentials"}), 401
    
    access_token = create_access_token(identity={'username': user.username}, expires_delta=timedelta(hours=1))
    refresh_token = create_refresh_token(identity={'username': user.username})
    print (access_token)
    print ("access_token")
    return jsonify({"access_token": access_token, "refresh_token": refresh_token}), 200

#@auth_blueprint.route('/logout', methods=['POST'])
#@jwt_required()
#def logout():
 #   jti = get_jwt()['jti']
    # Store the token identifier (jti) to invalidate it later, 
    # this could be implemented with a token blacklist in production.
  #  return jsonify({"message": "Successfully logged out"}), 200

@auth_blueprint.route('/account', methods=['GET'])
@jwt_required()
def account():
    current_user = get_current_user()
    print(current_user)
    return jsonify({
        "username": current_user.username,
        "email": current_user.email,
        "account_number": current_user.account_number,
        "account_balance": current_user.account_balance,
        "last_credited_amount": current_user.last_credited_amount
    }), 200

@auth_blueprint.route('/admin/login', methods=['POST'])
def admin_login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    user = User.query.filter_by(username=username, is_admin=True).first()
    
    if user is None or not user.check_password(password):
        return jsonify({"error": "Invalid credentials"}), 401
    
    access_token = create_access_token(identity={'username': user.username}, expires_delta=timedelta(hours=1))
    return jsonify({"access_token": access_token}), 200

@auth_blueprint.route('/admin/credit_user', methods=['PUT'])
@jwt_required()
def credit_user():
    current_user = get_current_user()
    if not current_user.is_admin:
        return jsonify({"error": "Unauthorized access"}), 403

    data = request.get_json()
    username = data.get('username')
    account_number = data.get('account_number')
    amount = data.get('amount')
    depositor_name = data.get('depositor_name')

    user = User.query.filter_by(username=username).first()
    if user is None:
        return jsonify({"error": "User not found"}), 404

    user.account_balance += amount
    user.last_credited_amount = amount

    # Add a notification
    notification_message = f"Your account has been credited with {amount:.2f} by {depositor_name}."
    user.add_notification(notification_message)

    db.session.commit()

    return jsonify({"message": "Account balance credited successfully"}), 200
@auth_blueprint.route('/admin/debit_user', methods=['PUT'])
@jwt_required()
def debit_user():
    current_user = get_current_user()
    if not current_user.is_admin:
        return jsonify({"error": "Unauthorized access"}), 403

    data = request.get_json()
    username = data.get('username')
    amount = data.get('amount')

    user = User.query.filter_by(username=username).first()
    if user is None:
        return jsonify({"error": "User not found"}), 404

    if user.account_balance < amount:
        return jsonify({"error": "Insufficient funds"}), 400

    user.account_balance -= amount

    # Add a notification
    notification_message = f"Your account has been debited with {amount:.2f}."
    user.add_notification(notification_message)

    db.session.commit()

    return jsonify({"message": "Account balance debited successfully"}), 200
@auth_blueprint.route('/admin/edit_user', methods=['PUT'])
@jwt_required()
def edit_user():
    current_user = get_current_user()
    if not current_user.is_admin:
        return jsonify({"error": "Unauthorized access"}), 403

    data = request.get_json()
    username = data.get('username')
    new_username = data.get('new_username')
    new_email = data.get('new_email')

    user = User.query.filter_by(username=username).first()
    if user is None:
        return jsonify({"error": "User not found"}), 404

    if new_username:
        user.username = new_username
    if new_email:
        user.email = new_email

    db.session.commit()

    return jsonify({"message": "User information updated successfully"}), 200

@auth_blueprint.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_current_user()
    return jsonify(logged_in_as=current_user.username), 200
blacklist = set()

@auth_blueprint.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    jti = get_jwt()['jti']  # JWT ID
    blacklist.add(jti)  # Add the token to the blacklist
    return jsonify({"message": "Successfully logged out"}), 200

@auth_blueprint.route('/admin/register', methods=['POST'])
@jwt_required()
def register_admin():
    current_user = get_current_user()
    
    # Check if the current user is an admin
    if not current_user.is_admin:
        return jsonify({"error": "Unauthorized access"}), 403
    
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    
    if User.query.filter_by(username=username).first() is not None:
        return jsonify({"error": "Username already taken"}), 400
    
    new_admin = User(username=username, email=email)
    new_admin.set_password(password)
    new_admin.is_admin = True
    new_admin.account_balance = 0.00
    
    db.session.add(new_admin)
    db.session.commit()
    
    return jsonify({"message": "Admin registered successfully"}), 201
@auth_blueprint.route('/admin/users', methods=['GET'])
@jwt_required()
def get_all_users():
    current_user = get_current_user()
    
    # Check if the current user is an admin
    if not current_user.is_admin:
        return jsonify({"error": "Unauthorized access"}), 403
    
    users = User.query.all()
    users_data = [
        {
            "username": user.username,
            "email": user.email,
            "account_number": user.account_number,
            "account_balance": user.account_balance,
            "last_credited_amount": user.last_credited_amount
        }
        for user in users
    ]
    print(user.account_number)
    return jsonify({"users": users_data}), 200
@auth_blueprint.route('/notifications', methods=['GET'])
@jwt_required()
def get_notifications():
    current_user = get_current_user()
    return jsonify({"notifications": current_user.notifications}), 200

