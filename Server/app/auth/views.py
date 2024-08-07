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
    current_user_identity = get_jwt_identity()
    current_user = User.query.filter_by(username=current_user_identity['username']).first()
    return current_user

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
    
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({"message": "User registered successfully"}), 201

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
    return jsonify({
        "username": current_user.username,
        "email": current_user.email,
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

@auth_blueprint.route('/admin/update_balance', methods=['PUT'])
@jwt_required()
def update_balance():
    current_user = get_current_user()
    if not current_user.is_admin:
        return jsonify({"error": "Unauthorized access"}), 403
    
    data = request.get_json()
    username = data.get('username')
    new_balance = data.get('new_balance')
    
    user = User.query.filter_by(username=username).first()
    if user is None:
        return jsonify({"error": "User not found"}), 404
    
    user.account_balance = new_balance
    user.last_credited_amount = new_balance  # or any other logic for updating last credited amount
    db.session.commit()
    
    return jsonify({"message": "Account balance updated successfully"}), 200

@auth_blueprint.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_current_user()
    return jsonify(logged_in_as=current_user.username), 200
@auth_blueprint.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    jti = get_jwt()['jti']
    blacklist.add(jti)
    return jsonify({"message": "Successfully logged out"}), 200
