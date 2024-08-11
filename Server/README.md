<h1>Banking Dashboard API Documentation</h1>
<h2>Overview</h2>
This API provides functionalities for user registration, authentication, account management, and admin-specific operations. The API uses JWT (JSON Web Tokens) for authentication and provides separate endpoints for regular users and admins.

<h2>Base URL</h2>
Development: http://127.0.0.1:5000
<h2>Authentication</h2>
<h3>1. User Registration</h3>
<h2>Endpoint: POST /auth/register</h2>
<h3>Description:</h3> Registers a new user. The user will be assigned a unique account number and an initial account balance of 0.00.
<h3>Request Body:</h3>
json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
<h3>Response:</h3>
<h4>Success (201):</h4>
json
{
  "message": "User registered successfully",
  "account_number": "unique_account_number"
}
Error (400):
json
{
  "error": "Username already taken"
}
<h3>2. User Login</h3>
<h2>Endpoint: POST /auth/login</h2>
<h3>Description:</h3> Logs in a user and returns a JWT token.
<h3>Request Body:</h3>
json
{
  "username": "string",
  "password": "string"
}
<h3>Response:</h3>
<h4>Success (200):</h4>
json
{
  "message": "Login successful",
  "token": "jwt_token"
}
<h4>Error (401):</h4>
json
{
  "error": "Invalid username or password"
}
<h3>. User Logout</h3>
<h3>Endpoint: POST /auth/logout</h3>
<h3>Description:</3> Logs out the current user. This endpoint requires JWT authentication.
<h4>Headers:<h4>
<h4>Authorization:</h4> Bearer <jwt_token>
<h3>Response:</h3>
<h4>Success (200):</h4>
json
{
  "message": "Logout successful"
}
<h2>User Account Management</h2>
<h3>1. Get Account Details</h3>
<h3>Endpoint: GET /account</h3>
<h3>Description:</h3> Returns the account details of the logged-in user, including balance and last credited amount.
<h4>Headers:</h4>
<h4>Authorization:</h4> Bearer <jwt_token>
<h3>Response:</h3>
<h4>Success (200):</h4>
json
{
  "username": "string",
  "account_number": "unique_account_number",
  "account_balance": 0.00,
  "last_credited_amount": 0.00
}
<h3>2. Get User Notifications</h3>
<h3>Endpoint: GET /auth/notifications</h3>
<h3>Description:</h3> Fetches the notifications for the logged-in user, including credit alerts.
<h4>Headers:</h4>
<h3>Authorization:</h3> Bearer <jwt_token>
<h3>Response:</h3>
<h4>Success (200):</h4>
json
{
  "notifications": [
    {
      "message": "Your account has been credited with 100.00 by Admin.",
      "timestamp": "2024-08-10T12:34:56"
    }
  ]
}
<h2>Admin Operations</h2>
<h3>1. Admin Registration</h3>
<h3>Endpoint: POST /auth/admin/register</h3>
<h3>Description:</h3> Registers a new admin. This endpoint can only be accessed by an existing admin.
<h4>Headers:</h4>
<h3>Authorization:</h3> Bearer <jwt_token>
<h4>Request Body:</h4>
json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
<h3>Response:</h3>
<h4>Success (201):</h4>
json
{
  "message": "Admin registered successfully"
}
<h4>Error (403):</h4>
json
{
  "error": "Unauthorized access"
}
<h3>2. View All Users</h3>
<h3>Endpoint: GET /auth/admin/users</h3>
<h3>Description:</h3> Retrieves a list of all registered users. This endpoint can only be accessed by an admin.
<h3>Headers:</h3>
<h3>Authorization:</h3> Bearer <jwt_token>
<h4>Response:</h4>
<h3>Success (200):</h3>
json
{
  "users": [
    {
      "username": "string",
      "email": "string",
      "account_number": "unique_account_number",
      "account_balance": 0.00,
      "last_credited_amount": 0.00
    }
  ]
}
<h3>3. Update User Account Balance</h3>
<h3>Endpoint: PUT /auth/admin/update_balance</h3>
<h3>Description:</h3> Allows the admin to credit a user’s account. The user receives a notification of the credit.
<h3>Headers:</h3>
<h3>Authorization:</h3> Bearer <jwt_token>
<h4>Request Body:</h4>
json
{
  "username": "string",
  "amount": 100.00,
  "depositor_name": "Admin"
}
<h4>Response:</h4>
<h4>Success (200):</h4>
json
{
  "message": "Account balance updated successfully"
}
<h4>Error (403):</h4>
json
{
  "error": "Unauthorized access"
}
<h4>Error (404):</h4>
json
{
  "error": "User not found"
}
<h2>Authentication and Authorization Notes</h2>
JWT Tokens are required for most endpoints. Ensure you include the token in the Authorization header as Bearer <jwt_token>.
<h4>Admin Access:</h4> Only users with is_admin = True can access admin-specific routes.
<h3>Error Handling</h3>
All endpoints return standard HTTP status codes along with JSON responses indicating the nature of the error (e.g., 400, 401, 403, 404).
<h3>Security Considerations</h3>
Use HTTPS in production to secure the transmission of sensitive data.
Store JWTs securely on the client side to prevent XSS attacks.
<h3>Summary</h3>
This API provides a robust system for managing user accounts and admin operations in a banking dashboard scenario, ensuring secure and efficient handling of user and admin tasks.
