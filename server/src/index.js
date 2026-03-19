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

// Connect to Database and start server
const startServer = async () => {
    try {
        await connectDB();
        
        // Middleware
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        // CORS - allow the Vite dev server and any local frontend
        app.use(cors({
            origin: [
                'http://localhost:5173',
                'http://localhost:3000',
                'http://127.0.0.1:5173',
            ],
            credentials: true,
        }));

        app.use(helmet());
        app.use(morgan('dev'));

        // Routes
        app.use('/auth', authRoutes);
        app.use('/products', productRoutes);

        // Error Middleware
        app.use(errorHandler);

        app.get('/', (req, res) => {
            res.send('Poultry Farm API is running');
        });

        app.listen(port, () => {
            console.log(`\x1b[32m✔ Server is running at http://localhost:${port}\x1b[0m`);
            console.log(`\x1b[34mℹ Mode: Development\x1b[0m`);
        });
    } catch (error) {
        console.error(`\x1b[31m✘ Critical Error: ${error.message}\x1b[0m`);
        process.exit(1);
    }
};

startServer();
