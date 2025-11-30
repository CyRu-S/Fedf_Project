# NutriWell Backend Setup Guide

## Prerequisites

1. **MongoDB**: Install and run MongoDB on your system
   - Download from: https://www.mongodb.com/try/download/community
   - Or use MongoDB Compass GUI

2. **Node.js**: Make sure you have Node.js installed (v16 or higher)

## Setup Steps

### 1. Install Backend Dependencies

```powershell
cd "d:\FEDF\Visual Studio Code\sec108\React\Fedf_Project\backend"
npm install
```

### 2. Start MongoDB

**Option A: Windows Service (if installed as service)**
- Open Services (services.msc)
- Find "MongoDB" service and start it

**Option B: Manual Start**
```powershell
# Navigate to MongoDB installation directory
# Usually: C:\Program Files\MongoDB\Server\7.0\bin\
mongod --dbpath "C:\data\db"
```

**Option C: MongoDB Compass**
- Open MongoDB Compass
- Connect to: mongodb://127.0.0.1:27017

### 3. Verify Environment Configuration

Check that `backend/.env` has:
```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/nutriwell
FRONTEND_URL=http://localhost:5173
JWT_ACCESS_SECRET=nutriwell-super-secret-jwt-key-2024
JWT_REFRESH_SECRET=nutriwell-super-secret-refresh-key-2024
NODE_ENV=development
```

### 4. Start Backend Server

```powershell
cd "d:\FEDF\Visual Studio Code\sec108\React\Fedf_Project\backend"
npm run dev
```

You should see:
```
MongoDB connected
Server running on port 5000
```

### 5. Start Frontend

In a new terminal:
```powershell
cd "d:\FEDF\Visual Studio Code\sec108\React\Fedf_Project"
npm run dev
```

## Testing the Setup

1. **Registration Test**:
   - Go to http://localhost:5173
   - Click "Sign up" 
   - Fill out the form with valid data
   - Should register successfully and redirect to dashboard

2. **Login Test**:
   - Go to http://localhost:5173/login
   - Use the email/password you just registered
   - Should login and redirect to dashboard

3. **Verify in MongoDB**:
   - Open MongoDB Compass
   - Connect to mongodb://127.0.0.1:27017
   - Check `nutriwell` database
   - Should see `users` and `profiles` collections with your data

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/profile/me` - Get user profile (protected)
- `PUT /api/profile/me` - Update user profile (protected)

## Troubleshooting

1. **CORS Errors**: 
   - Make sure frontend runs on http://localhost:5173
   - Backend allows 5173, 3000, and 3001 ports

2. **MongoDB Connection Failed**:
   - Ensure MongoDB service is running
   - Check MongoDB URI in .env file
   - Try connecting via MongoDB Compass first

3. **Server Error on Registration**:
   - Check backend terminal for specific error
   - Verify all required fields are sent from frontend
   - Check MongoDB is accessible and writable

4. **Login Issues**:
   - Ensure you're using the same email/password from registration
   - Check backend logs for authentication errors
   - Verify JWT secrets are set in .env
