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
    #msg = Message(
     #   "Welcome to Ultra",
      #  recipients=[email]
   # )
    #msg.body = f"Dear {username},\n\nWelcome to Ultra Account!\n\nYour account number is: {new_user.account_number}\n\nThank you for joining us."

    #mail.send(msg)
    
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

import logging
logging.basicConfig(level=logging.DEBUG)
@auth_blueprint.route('/transfer', methods=['POST'])
@jwt_required()
def transfer():
    current_user = get_current_user()

    # Get transfer details from request
    data = request.get_json()
    logging.debug(f"Received transfer data: {data}")
    receiver_bank = data.get('receiver_bank')
    receiver_name = data.get('receiver_name')
    receiver_account_number = data.get('receiver_account_number')
    routing_number = data.get('routing_number')
    amount = data.get('amount')

    # Check for missing fields
    if not all([receiver_name, receiver_bank, receiver_account_number, routing_number, amount]):
        return jsonify({"error": "Missing required fields"}), 400

    # Validate the amount
    try:
        amount = float(amount)
        if amount <= 0:
            return jsonify({"error": "Amount must be positive"}), 400
    except ValueError:
        return jsonify({"error": "Invalid amount format"}), 400

    # Ensure current user has sufficient balance
    if current_user.account_balance < amount:
        return jsonify({"error": "Insufficient funds"}), 400

    # Step 1: Send authentication code to user's email
    auth_code = random.randint(100, 999)
    msg = Message(
        "Transfer Authentication Code",
        recipients=[current_user.email],
        body=f"Your transfer authentication code is: {auth_code}"
    )
    mail.send(msg)

    # Save the auth code temporarily
    current_user.pending_transfer = {
        'auth_code': auth_code,
        'receiver_name': receiver_name,
        'receiver_bank': receiver_bank,
        'receiver_account_number': receiver_account_number,
        'routing_number': routing_number,
        'amount': amount
    }
    db.session.commit()

    return jsonify({"message": "Transfer initiated. Please enter the authentication code."}), 200


@auth_blueprint.route('/verify_auth_code', methods=['POST'])
@jwt_required()
def verify_auth_code():
    current_user = get_current_user()
    data = request.get_json()

    # Verify the authentication code
    auth_code = data.get('auth_code')

    if not auth_code:
        return jsonify({"error": "Authentication code is required"}), 400

    if not current_user.pending_transfer or current_user.pending_transfer.get('auth_code') != int(auth_code):
        return jsonify({"error": "Invalid authentication code"}), 400

    return jsonify({"message": "Authentication code verified. Proceed to submit TIN."}), 200

# Endpoint to verify tax verification code and generate the final 3-digit code
@auth_blueprint.route('/save_tin', methods=['POST'])
@jwt_required()
def save_tin():
    current_user = get_current_user()
    data = request.get_json()
    #app.logger.info(f"Received data: {data}")

    # Verify the second (tax verification) authentication code
    tax_verification_code = data.get('tax_verification_code')

    if not tax_verification_code:
        return jsonify({"error": "Tax verification code is required"}), 400

    pending_transfer = current_user.pending_transfer

    if not pending_transfer or pending_transfer.get('second_auth_code') != int(tax_verification_code):
        return jsonify({"error": "Invalid tax verification code"}), 400

    # Save the tax verification code to the user details
    current_user.tax_identification_number = tax_verification_code
    db.session.commit()

    # Generate a 3-digit final authentication code
    final_auth_code = random.randint(1000, 9999)

    # Send the final authentication code to the user's email
    subject = "Final Authentication Code"
    message = f"Your final authentication code is: {final_auth_code}"
    send_email(current_user.email, subject, message)

    # Save the final authentication code in pending_transfer
    current_user.pending_transfer['final_auth_code'] = final_auth_code
    db.session.commit()

    return jsonify({"message": "Tax verification code saved successfully. Final authentication code sent."}),200


@auth_blueprint.route('/complete_transfer', methods=['POST'])
@jwt_required()
def complete_transfer():
    current_user = get_current_user()
    data = request.get_json()

    # Step 4: Verify the second authentication code
    second_auth_code = data.get('second_auth_code')

    if not second_auth_code or not current_user.pending_transfer:
        return jsonify({"error": "Second authentication code is required"}), 400

    if current_user.pending_transfer.get('second_auth_code') != int(second_auth_code):
        return jsonify({"error": "Invalid second authentication code"}), 400

    # Step 5: Complete the transfer
    amount = current_user.pending_transfer['amount']
    current_user.account_balance -= amount

    # In a real application, you'd communicate with the bank's API here
    db.session.commit()
    # Step 6: Add a notification about the completed transfer
    formatted_amount = f"{amount:,.2f}"
    notification_message = f"Transfer of ${formatted_amount} to {receiver_name} (Account: {account_number}, Bank: {receiver_bank}) has been successfully processed. You will receive the value in your bank account within 4-7 days."
    current_user.add_notification(notification_message)

    # Clear pending transfer after completion
    current_user.pending_transfer = None
    db.session.commit()

    return jsonify({"message": "Transfer successful. You will receive the value in your bank account within 4-7 days."}), 200
# Forgot Password Request
@auth_blueprint.route('/forgot_password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    email = data.get('email')

    if not email:
        return jsonify({"error": "Email is required"}), 400

    user = User.query.filter_by(email=email).first()

    if user:
        # Generate a unique token for password reset
        token = create_reset_token(user.id)

        # Send the reset email with the token
        reset_url = url_for('auth.reset_password', token=token, _external=True)
        subject = "Password Reset Request"
        message = f"To reset your password, visit the following link: {reset_url}"
        send_email(user.email, subject, message)

    # Return success even if email is not found to prevent email enumeration
    return jsonify({"message": "If your email is registered, a reset link will be sent."}), 200

# Reset Password
@auth_blueprint.route('/reset_password/<token>', methods=['POST'])
def reset_password(token):
    try:
        # Decode the reset token to get the user's ID
        user_id = decode_reset_token(token)
    except Exception as e:
        return jsonify({"error": "Invalid or expired token"}), 400

    data = request.get_json()
    new_password = data.get('new_password')

    if not new_password:
        return jsonify({"error": "Password is required"}), 400

    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    # Update the user's password
    user.password = bcrypt.generate_password_hash(new_password).decode('utf-8')
    db.session.commit()

    return jsonify({"message": "Password reset successful"}), 200

# Helper function to create reset token
def create_reset_token(user_id):
    expires = timedelta(hours=1)  # Token valid for 1 hour
    return create_access_token(identity=user_id, expires_delta=expires)

# Helper function to decode the reset token
def decode_reset_token(token):
    try:
        decoded_token = decode_token(token)
        user_id = decoded_token['sub']
        return user_id
    except (ExpiredSignatureError, InvalidTokenError):
        raise Exception("Invalid or expired token")

# Helper function to send emails
def send_email(to, subject, body):
    msg = Message(subject, recipients=[to], body=body)
    mail.send(msg)

@auth_blueprint.route('/send_message', methods=['POST'])
def send_message():
    data = request.get_json()

    # Validate the incoming data
    name = data.get('name')
    email = data.get('email')
    subject = data.get('subject')
    message = data.get('message')

    if not all([name, email, subject, message]):
        return jsonify({"error": "All fields are required"}), 400

    # Compose the message
    email_subject = f"New message from {name}: {subject}"
    email_body = f"""
    You have received a new message from {name} ({email}):

    Subject: {subject}

    Message:
    {message}
    """

    # Send email to support
    try:
        msg = Message(subject=email_subject,
                      recipients=["support@swissultra.com"],
                      body=email_body)

        mail.send(msg)
        return jsonify({"message": "Message sent successfully"}), 200

    except Exception as e:
        return jsonify({"error": f"Failed to send message: {str(e)}"}), 500

