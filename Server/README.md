<p>This is a banking application API with basic functionalities like user registration, User logins, account balance and notification of last credit alert. the account balance for all users can be updated from the backend admin dashboard. 
</p>
<h1>Below is the Endpoints Summary for the API
Register a new user</h1>

<h2>POST /auth/register</h2>
Request body: { "username": "testuser", "email": "test@example.com", "password": "testpass" }
Log in a user

<h2>POST /auth/login</h2>
Request body: { "username": "testuser", "password": "testpass" }
Log out a user

<h2>POST /auth/logout</h2>
Requires JWT in Authorization header.
Get user account details

<h2>GET /auth/account</h2>
Requires JWT in Authorization header.
Admin login

<h2>POST /auth/admin/login</h2>
Request body: { "username": "adminuser", "password": "adminpass" }
Admin update user balance

<h2>PUT /auth/admin/update_balance</h2>
Request body: { "username": "testuser", "new_balance": 5000 }
Requires JWT in Authorization header with admin privileges.
Access protected route

<h2>GET /auth/protected</h2>
Requires JWT in Authorization header.
