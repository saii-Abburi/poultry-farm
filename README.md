# Poultry Farm Full-Stack Application

A modern, award-winning UI for a premium poultry product portfolio website.

## Tech Stack
**Frontend:** React (Vite) + JavaScript, Tailwind CSS V4, Framer Motion, Axios, i18next
**Backend:** Node.js, Express, MongoDB (Mongoose), JWT, Cloudinary

## Folder Structure
```
poultry-farm/
├── client/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── i18n.js
│   │   └── App.jsx
│   └── public/
└── server/          # Node.js backend
    ├── src/
    │   ├── config/
    │   ├── controllers/
    │   ├── middleware/
    │   ├── models/
    │   ├── routes/
    │   └── index.js
    └── .env
```

## Running the Application Locally

### 1. Prerequisites
- Node.js (v18+)
- MongoDB running locally or a MongoDB Atlas URI
- Cloudinary account credentials

### 2. Backend Setup
1. Open a terminal and navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install background dependencies (already installed if generated completely):
   ```bash
   npm install
   ```
3. Ensure `.env` is configured correctly with your Cloudinary API details:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/poultry_farm
   JWT_SECRET=supersecretjwtkey_123456789
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
4. Start the server (Development mode):
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Open another terminal and navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install frontend dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

### 4. Application Details
- View the app at `http://localhost:5173`.
- Make sure to create an admin programmatically or through the `/auth/admin/register` endpoint (using Postman/Bruno) to interact with the Admin Dashboard.
- Admin portal login is at `/auth`.
