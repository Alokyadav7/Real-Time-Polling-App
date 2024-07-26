const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = (app) => {
    // Register a new user
    app.post('/api/users/register', async (req, res) => {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const user = new User({
                ...req.body,
                password: hashedPassword
            });
            await user.save();
            res.json(user);
        } catch (error) {
            res.status(400).send(error.message);
        }
    });

    // Login
    app.post('/api/users/login', async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (user && await bcrypt.compare(req.body.password, user.password)) {
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.json({ token, user });
            } else {
                res.status(401).send('Invalid credentials');
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    });

    // Middleware to protect routes
    app.use((req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) return res.status(403).send('Forbidden');
                req.userId = decoded.id;
                next();
            });
        } else {
            res.status(401).send('Unauthorized');
        }
    });
};
