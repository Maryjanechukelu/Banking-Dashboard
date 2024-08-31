<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Banking Dashboard API Documentation</title>
</head>
<body>
    <h1>Banking Dashboard API</h1>
    <p>This is a RESTful API built with Flask for a banking dashboard application. The API handles user authentication, user account management, and admin functionalities such as crediting, debiting, and editing user information.</p>
    
    <h2>Table of Contents</h2>
    <ul>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#configuration">Configuration</a></li>
        <li><a href="#endpoints">Endpoints</a>
            <ul>
                <li><a href="#authentication">Authentication</a></li>
                <li><a href="#user-account-management">User Account Management</a></li>
                <li><a href="#admin-functions">Admin Functions</a></li>
            </ul>
        </li>
        <li><a href="#cors">CORS</a></li>
        <li><a href="#running-the-application">Running the Application</a></li>
    </ul>

    <h2 id="installation">Installation</h2>
    <ol>
        <li>Clone the repository:
            <pre><code>git clone https://github.com/your-repo/Banking-Dashboard.git
cd Banking-Dashboard
            </code></pre>
        </li>
        <li>Install the required packages:
            <pre><code>pip install -r requirements.txt
            </code></pre>
        </li>
        <li>Set up the database:
            <pre><code>flask db init
flask db migrate
flask db upgrade
            </code></pre>
        </li>
    </ol>

    <h2 id="configuration">Configuration</h2>
    <p>Ensure you have the appropriate configuration settings in <code>app/config.py</code> for database connections, JWT settings, etc.</p>

    <h2 id="endpoints">Endpoints</h2>

    <h3 id="authentication">Authentication</h3>
    <ul>
        <li><strong>POST /auth/register</strong>
            <p>Register a new user.</p>
            <p><strong>Request Body:</strong></p>
            <pre><code>{
    "username": "string",
    "email": "string",
    "password": "string"
}</code></pre>
        </li>

        <li><strong>POST /auth/login</strong>
            <p>Log in a user and return a JWT token.</p>
            <p><strong>Request Body:</strong></p>
            <pre><code>{
    "email": "string",
    "password": "string"
}</code></pre>
        </li>
    </ul>

    <h3 id="user-account-management">User Account Management</h3>
    <ul>
        <li><strong>GET /auth/account</strong>
            <p>Get the details of the logged-in user.</p>
            <p><strong>Headers:</strong></p>
            <pre><code>Authorization: Bearer &lt;JWT_TOKEN&gt;
            </code></pre>
        </li>
    </ul>

    <h3 id="admin-functions">Admin Functions</h3>
    <ul>
        <li><strong>PUT /auth/admin/credit_user</strong>
            <p>Credit a user's account.</p>
            <p><strong>Headers:</strong></p>
            <pre><code>Authorization: Bearer &lt;JWT_TOKEN&gt;
            </code></pre>
            <p><strong>Request Body:</strong></p>
            <pre><code>{
    "username": "string",
    "amount": 100.00,
    "depositor_name": "AdminName"
}</code></pre>
        </li>

        <li><strong>PUT /auth/admin/debit_user</strong>
            <p>Debit a user's account.</p>
            <p><strong>Headers:</strong></p>
            <pre><code>Authorization: Bearer &lt;JWT_TOKEN&gt;
            </code></pre>
            <p><strong>Request Body:</strong></p>
            <pre><code>{
    "username": "string",
    "amount": 50.00
}</code></pre>
        </li>

        <li><strong>PUT /auth/admin/edit_user</strong>
            <p>Edit a user's information.</p>
            <p><strong>Headers:</strong></p>
            <pre><code>Authorization: Bearer &lt;JWT_TOKEN&gt;
            </code></pre>
            <p><strong>Request Body:</strong></p>
            <pre><code>{
    "username": "string",
    "new_username": "new_username",
    "new_email": "new_email@example.com"
}</code></pre>
        </li>
    </ul>

    <h2 id="cors">CORS</h2>
    <p>To allow Cross-Origin Resource Sharing (CORS) for your API, the <code>flask-cors</code> package is used. CORS is enabled for all routes, allowing the API to handle requests from different origins.</p>

    <h2 id="running-the-application">Running the Application</h2>
    <ol>
        <li>Start the Flask application:
            <pre><code>flask run
            </code></pre>
        </li>
        <li>Optionally, you can create an initial admin user using the <code>createAdmin.py</code> script:
            <pre><code>python createAdmin.py
        </code></pre>
</body>
</html>

