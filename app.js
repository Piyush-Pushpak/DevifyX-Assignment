const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const rateLimiter = require('./middlewares/rateLimiter');
const errorHandler = require('./middlewares/errorHandler');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const passwordRoutes = require('./routes/passwordRoutes');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(rateLimiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/password', passwordRoutes);

// Swagger Docs
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error handler
app.use(errorHandler);

module.exports = app;