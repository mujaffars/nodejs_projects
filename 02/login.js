const express = require('express');
const session = require('express-session');

const app = express();

// Middleware setup
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
    secret: 'secret', // Change this to a long, randomly generated string in production
    resave: false,
    saveUninitialized: true
}));

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the homepage!');
});

app.get('/login', (req, res) => {
    res.send(`
    <form action="/login" method="post">
      <input type="text" name="username" placeholder="Username" required><br>
      <input type="password" name="password" placeholder="Password" required><br>
      <button type="submit">Login</button>
    </form>
  `);
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // In a real application, you would validate the username and password against a database
    if (username === 'user' && password === 'password') {
        req.session.authenticated = true;
        var hour = 3600000
        req.session.cookie.expires = new Date(Date.now() + hour)
        req.session.cookie.maxAge = hour
        res.redirect('/dashboard');
    } else {
        res.send('Invalid username or password');
    }
});

app.get('/dashboard', (req, res) => {
    console.log("asdf af " + req.session.cookie.maxAge);
    if (req.session.authenticated) {
        res.send('Welcome to the dashboard!');
    } else {
        res.redirect('/login');
    }
});


app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
        } else {
            res.redirect('/');
        }
    });
});

// Start server
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
