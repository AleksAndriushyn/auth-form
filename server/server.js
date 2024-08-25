const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

let users = []; // This will act as our in-memory database for simplicity

// Secret key for JWT
const SECRET_KEY = 'your_secret_key';

// Helper function to generate JWT token
const generateToken = (user) => {
    return jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });
};

// Registration endpoint
app.post('/register.php', async (req, res) => {
    const { email, password } = req.body;

    // Check if the user already exists
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
        return res.status(400).json({ status: 'error', message: 'User already exists' });
    }

    // Password validation
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/;
    if (
        !passwordPattern.test(password) ||
        /^[!@#$%^&*]/.test(password) ||
        /[!@#$%^&*]$/.test(password)
    ) {
        return res.status(400).json({ status: 'error', message: 'Password does not meet requirements' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user
    const newUser = { email, password: hashedPassword };
    users.push(newUser);

    res.status(201).json({ status: 'success', message: 'User registered successfully', user: { email } });
});

// Login endpoint
app.post('/login.php', async (req, res) => {
    const { email, password } = req.body;

    // Find the user
    const user = users.find((user) => user.email === email);
    if (!user) {
        return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ status: 'error', message: 'Invalid credentials' });
    }

    // Generate a token
    const token = generateToken(user);

    res.json({ status: 'success', message: 'Login successful', user: { email }, token });
});

// Update endpoint
app.post('/update.php', async (req, res) => {
    const { email, password, new_email, new_password } = req.body;

    // Find the user
    const user = users.find((user) => user.email === email);
    if (!user) {
        return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    // Compare current password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ status: 'error', message: 'Invalid current password' });
    }

    // Update the email and password
    user.email = new_email || user.email;

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/;
    if (new_password && passwordPattern.test(new_password) && !/^[!@#$%^&*]/.test(new_password) && !/[!@#$%^&*]$/.test(new_password)) {
        user.password = await bcrypt.hash(new_password, 10);
    } else {
        return res.status(400).json({ status: 'error', message: 'New password does not meet requirements' });
    }

    res.json({ status: 'success', message: 'User updated successfully', user: { email: user.email } });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
