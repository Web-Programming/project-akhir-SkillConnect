const express = require('express');
const cors = require('cors');
const connectDB = require('./app_server/database/db');

const app = express();


app.use(cors());
app.use(express.json());


connectDB();


app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});


app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection:', err);

  server.close(() => process.exit(1));
});

module.exports = app;
