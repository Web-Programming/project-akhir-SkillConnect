const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const usersRouter = require('./app_server/routes/users');
const auth = require('./app_server/middleware/auth');
const authRouter = require('./app_server/routes/auth');

const app = express();

// Enable CORS
app.use(cors({
  origin: 'http://localhost:4200', // URL frontend Angular
  credentials: true
}));

// Parse JSON bodies
app.use(express.json());

// Mount routes
app.use('/api/auth', authRouter);
app.use('/api/users', auth, usersRouter);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});

// Pastikan MongoDB terkoneksi
mongoose.connect('mongodb://localhost:27017/skillconnect')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Gunakan port yang berbeda
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});

module.exports = app;
