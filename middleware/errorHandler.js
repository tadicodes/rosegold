// server.js

const express = require('express');
const app = express();
const errorHandler = require('./middleware/errorHandler'); // Adjust the path as necessary

// Your other middleware and route handlers here

// Use the error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

