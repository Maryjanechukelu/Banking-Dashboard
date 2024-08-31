# Banking Dashboard API

This is a RESTful API built with Flask for a banking dashboard application. The API handles user authentication, user account management, and admin functionalities such as crediting, debiting, and editing user information.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Endpoints](#endpoints)
  - [Authentication](#authentication)
  - [User Account Management](#user-account-management)
  - [Admin Functions](#admin-functions)
- [CORS](#cors)
- [Running the Application](#running-the-application)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-repo/Banking-Dashboard.git
    cd Banking-Dashboard
    ```
2. Install the required packages:
    ```bash
    pip install -r requirements.txt
    ```
3. Set up the database:
    ```bash
    flask db init
    flask db migrate
    flask db upgrade
    ```

## Configuration

Ensure you have the appropriate configuration settings in `app/config.py` for database connections, JWT settings, etc.

## Endpoints

### Authentication

- **POST `/auth/register`**  
  Register a new user.
  ```json
  {
      "username": "string",
      "email": "string",
      "password": "string"
  }
<h2>'POST /auth/login' </h2>
Log in a user and return a JWT token.
json
{
    "email": "string",
    "password": "string"
}
User Account Management
GET /auth/account
Get the details of the logged-in user.

Authorization: Bearer <JWT_TOKEN>
Admin Functions
PUT /auth/admin/credit_user
Credit a user's account.

Authorization: Bearer <JWT_TOKEN>
json
{
    "username": "string",
    "amount": 100.00,
    "depositor_name": "AdminName"
}
<h2>PUT /auth/admin/debit_user</h2>
Debit a user's account.

Authorization: Bearer <JWT_TOKEN>
json

{
    "username": "string",
    "amount": 50.00
}
<h2>PUT /auth/admin/edit_user</h2>
Edit a user's information.

<h2>Authorization: Bearer <JWT_TOKEN> </h2>
json
{
    "username": "string",
    "new_username": "new_username",
    "new_email": "new_email@example.com"
}
CORS
To allow Cross-Origin Resource Sharing (CORS) for your API, the flask-cors package is used. CORS is enabled for all routes, allowing the API to handle requests from different origins.

Running the Application
Start the Flask application:
flask run
Optionally, you can create an initial admin user using the createAdmin.py script:
python createAdmin.py
<h2>Notes</h2>
Make sure to replace placeholder values like <JWT_TOKEN> with actual tokens and data in your requests.
