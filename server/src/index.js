const path = require('path');
const dotenv = require('dotenv');
// Must be called FIRST before anything else reads process.env
dotenv.config({ path: path.join(__dirname, '../.env') });

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();
const port = process.env.PORT || 5000;

// App Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS - allow the Vite dev server and any local frontend
app.use(cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
}));

app.use(helmet({
    contentSecurityPolicy: false,
}));
app.use(morgan('dev'));

// Database Connection Middleware - Ensure DB is connected before handling requests
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        next(error);
    }
});

// Routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Poultry Farm API is running', env: process.env.NODE_ENV });
});

// Error Middleware
app.use(errorHandler);

// Only listen if NOT running on Vercel
if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
    app.listen(port, () => {
        console.log(`\x1b[32m✔ Server is running at http://localhost:${port}\x1b[0m`);
    });
}

// Export for Vercel
module.exports = app;
