const express = require('express');
const app = express();

// Custom middleware to modify route path
function modifyRoute(req, res, next) {
    // Add a prefix to the route path
    req.url = '/prefix' + req.url;
    console.log(req.url)
    next(); // Call the next middleware function in the stack
}

// Register the middleware function
app.use(modifyRoute);

// Route handler
app.get('/prefix/hello', (req, res) => {
    res.send('Hello, world!');
});

// Start the server
const PORT = 3011;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
