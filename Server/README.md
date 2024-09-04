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

## API Endpoints

All the following endpoints are part of the `auth` Blueprint and are located in the `auth` folder (`backend/app/auth/views.py`).

### Authentication and User Management

#### 1. **User Registration**
   - **Endpoint:** `/auth/register`
   - **Method:** `POST`
   - **Description:** Registers a new user.
   - **Request Body:**
     ```json
     {
       "username": "string",
       "email": "string",
       "password": "string"
     }
     ```
   - **Response:** 
     - `201 Created` - User registered successfully with an account number.

#### 2. **User Login**
   - **Endpoint:** `/auth/login`
   - **Method:** `POST`
   - **Description:** Logs in an existing user and returns JWT tokens.
   - **Request Body:**
     ```json
     {
       "username": "string",
       "password": "string"
     }
     ```
   - **Response:** 
     - `200 OK` - Access and refresh tokens returned.
     ```json
     {
       "access_token": "string",
       "refresh_token": "string"
     }
     ```

#### 3. **User Account Details**
   - **Endpoint:** `/auth/account`
   - **Method:** `GET`
   - **Description:** Retrieves the current user's account details.
   - **Authorization:** Requires JWT in the `Authorization` header.
   - **Response:** 
     - `200 OK` - User account information returned.
     ```json
     {
       "username": "string",
       "email": "string",
       "account_number": "string",
       "account_balance": "float",
       "last_credited_amount": "float"
     }
     ```

#### 4. **User Logout**
   - **Endpoint:** `/auth/logout`
   - **Method:** `POST`
   - **Description:** Logs out the current user by blacklisting their JWT token.
   - **Authorization:** Requires JWT in the `Authorization` header.
   - **Response:** 
     - `200 OK` - Logout confirmation message returned.

#### 5. **User Notifications**
   - **Endpoint:** `/auth/notifications`
   - **Method:** `GET`
   - **Description:** Retrieves the current user's notifications.
   - **Authorization:** Requires JWT in the `Authorization` header.
   - **Response:** 
     - `200 OK` - List of notifications returned.
     ```json
     {
       "notifications": ["string"]
     }
     ```

### Admin-Specific Endpoints

#### 1. **Admin Login**
   - **Endpoint:** `/auth/admin/login`
   - **Method:** `POST`
   - **Description:** Logs in an admin user and returns an access token.
   - **Request Body:**
     ```json
     {
       "username": "string",
       "password": "string"
     }
     ```
   - **Response:** 
     - `200 OK` - Access token returned.
     ```json
     {
       "access_token": "string"
     }
     ```

#### 2. **Admin Register**
   - **Endpoint:** `/auth/admin/register`
   - **Method:** `POST`
   - **Description:** Registers a new admin user.
   - **Authorization:** Requires Admin JWT in the `Authorization` header.
   - **Request Body:**
     ```json
     {
       "username": "string",
       "email": "string",
       "password": "string"
     }
     ```
   - **Response:** 
     - `201 Created` - Admin registered successfully.

#### 3. **Credit User Account**
   - **Endpoint:** `/auth/admin/credit_user`
   - **Method:** `PUT`
   - **Description:** Credits a user's account balance.
   - **Authorization:** Requires Admin JWT in the `Authorization` header.
   - **Request Body:**
     ```json
     {
       "username": "string",
       "amount": "float",
       "depositor_name": "string"
     }
     ```
   - **Response:** 
     - `200 OK` - Account balance credited successfully.

#### 4. **Debit User Account**
   - **Endpoint:** `/auth/admin/debit_user`
   - **Method:** `PUT`
   - **Description:** Debits a user's account balance.
   - **Authorization:** Requires Admin JWT in the `Authorization` header.
   - **Request Body:**
     ```json
     {
       "username": "string",
       "amount": "float"
     }
     ```
   - **Response:** 
     - `200 OK` - Account balance debited successfully.

#### 5. **Edit User Information**
   - **Endpoint:** `/auth/admin/edit_user`
   - **Method:** `PUT`
   - **Description:** Edits a user's information (username and/or email).
   - **Authorization:** Requires Admin JWT in the `Authorization` header.
   - **Request Body:**
     ```json
     {
       "username": "string",
       "new_username": "string",
       "new_email": "string"
     }
     ```
   - **Response:** 
     - `200 OK` - User information updated successfully.

#### 6. **Get All Users**
   - **Endpoint:** `/auth/admin/users`
   - **Method:** `GET`
   - **Description:** Retrieves all user accounts.
   - **Authorization:** Requires Admin JWT in the `Authorization` header.
   - **Response:** 
     - `200 OK` - List of all users returned.
     ```json
     {
       "users": [
         {
           "username": "string",
           "email": "string",
           "account_number": "string",
           "account_balance": "float",
           "last_credited_amount": "float"
         }
       ]
     }
     ```

#### 7. **Protected Route**
   - **Endpoint:** `/auth/protected`
   - **Method:** `GET`
   - **Description:** A test route to check if a user is logged in.

To allow Cross-Origin Resource Sharing (CORS) for your API, the flask-cors package is used. CORS is enabled for all routes, allowing the API to handle requests from different origins.

Running the Application
Start the Flask application:
flask run
Optionally, you can create an initial admin user using the createAdmin.py script:
python createAdmin.py
<h2>Notes</h2>
Make sure to replace placeholder values like <JWT_TOKEN> with actual tokens and data in your requests.

