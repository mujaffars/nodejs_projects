// Import required modules
const express = require('express');
const helmet = require('helmet');

// Create an Express app
const app = express();

// Use Helmet to set various HTTP headers for security
app.use(helmet());

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, Helmet is securing this app!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});