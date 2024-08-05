# Banking Dashboard with Admin Panel

This project is a banking dashboard application built using Next.js, Typescript and TailwindCSS, with a backend powered by Python Flask. It includes an admin panel that allows administrators to manage users effectively. 
## Features

- User Authentication
- Admin Authentication
- User Dashboard
- Admin Dashboard


## Technologies Used

- Next.js
- Typescript
- TailwindCSS
- NextAuth.js (for authentication)
- Axios (for API requests)
- Python Flask (for backend API)

## Getting Started

### Prerequisites

- Node.js (v12 or higher)
- npm or yarn
- Python 3.7 or higher
- pip

### Installation

#### Frontend

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/Banking-Dashboard.git
   cd fintech-dashboard
   ```

2. Install the dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file and add your environment variables:

   ```env
   NEXTAUTH_URL=http://localhost:3000
   ```

4. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

#### Backend

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Create a virtual environment and activate it:

   ```bash
   python -m venv venv
   source venv/bin/activate
   # On Windows, use `venv\Scripts\activate`
   ```

3. Install the dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Run the Flask server:

   ```bash
   export FLASK_APP=app.py
   export FLASK_ENV=development
   flask run
   ```

   The Flask server will run on [http://localhost:5000](http://localhost:5000).

## Project Structure

- `pages/`: Contains all the page components.
  - `admin/`: Contains the admin panel pages.
    - `index.js`: Admin dashboard.
    - `login.js`: Admin login page.
  - `api/`: Contains API routes.
    - `auth/`: Contains authentication API routes.
    - `admin/`: Contains admin API routes for user management.
- `styles/`: Contains the global styles and TailwindCSS configuration.
- `utils/`: Contains utility functions for authentication and user management.
- `backend/`: Contains the Flask backend.
  - `app.py`: The main Flask application.
  - `models.py`: Contains the database models.
  - `routes.py`: Contains the API routes.
  - `utils.py`: Contains utility functions for user management.

## Authentication

### User Authentication

User authentication is managed using `NextAuth.js`. Users can sign in and access their dashboard.

### Admin Authentication

Admin authentication is also managed using `NextAuth.js` but with different credentials. Only authenticated admins can access the admin panel.

## Admin Panel

### Admin Dashboard

The admin dashboard allows administrators to manage users. Admins can create new users, edit existing users, and delete users.

### API Endpoints

The following API endpoints are used for user management:

- `GET /api/admin/users`: Fetch all users.
- `POST /api/admin/users`: Create a new user.
- `PUT /api/admin/users/[id]`: Update an existing user.
- `DELETE /api/admin/users/[id]`: Delete an existing user.

## Backend

### Flask API

The Flask backend provides API endpoints for user management. Below is a brief overview of the structure:

#### `app.py`

```python
from flask import Flask
from routes import user_routes

app = Flask(__name__)

app.register_blueprint(user_routes, url_prefix='/api/admin/users')

if __name__ == '__main__':
    app.run(debug=True)
```
