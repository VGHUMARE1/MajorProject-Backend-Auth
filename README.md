# Authentication Module

A secure authentication system with user registration, login, and logout functionality, featuring image upload to Cloudinary and MongoDB storage.

## Features

- User registration with:
  - Name
  - Email
  - Phone Number
  - Password (bcrypt hashed)
  - Profile photo (Cloudinary storage)
- Session-based authentication using Passport.js
- Secure password hashing with bcrypt
- Image file upload handling with Multer and Cloudinary
- MongoDB data storage
- Responsive frontend forms
- Error handling and validation

## Technologies Used

- **Backend**: Node.js, Express
- **Authentication**: Passport.js
- **Database**: MongoDB (Mongoose ODM)
- **Cloud Storage**: Cloudinary
- **Frontend**: HTML5, CSS3, JavaScript
- **Middleware**: Multer, express-session



## API Endpoints

### Authentication Endpoints

| Endpoint                | Method | Description                     | Request Format               |
|-------------------------|--------|---------------------------------|------------------------------|
| `/auth/register`    | POST   | Register a new user             | `multipart/form-data`         |
| `/auth/login`       | POST   | Authenticate existing user      | `application/json`            |
| `/auth/logout`      | POST   | Terminate user session          | -                            |



## Installation

1. Clone the repository:
```bash
git clone https://github.com/VGHUMARE1/MajorProject-Backend-Auth
cd MajorProject-Backend-Auth


2. Install dependencies :
```bash
npm install


3.Run the application :
```bash
node app.js