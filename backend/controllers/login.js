const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const Voter = require('../models/Voter');
const {
    validateName,
    validatePassword,
    checkallvalidation,
} = require('../validation');

const router = express.Router();

// Middleware to validate admin login data
const validateAdminData = async(req, res, next) => {
    try {
        const { userName, password } = req.query;
        const errors = {};

        errors.userNameError = validateName(userName);
        errors.passwordError = validatePassword(password);

        if (checkallvalidation(errors)) {
            if (userName.toLowerCase() === 'admin' && password.toLowerCase() === 'admin@123') {
                next();
            } else {
                res.status(400).json({ loginError: 'Invalid Account' });
            }
        } else {
            res.status(400).json({ errors });
        }
    } catch (err) {
        res.status(500).send(`Internal Server Error: ${err}`);
    }
};

// Middleware to validate voter login data
const validateVoterData = [
    check('email').isEmail().withMessage('Email is invalid'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

// POST /api/voters/login - Login voter
router.post('/voters/login', validateVoterData, async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const voter = await Voter.findOne({ email });
        if (!voter) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, voter.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const payload = { voterId: voter._id };
        const token = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ message: 'Failed to log in' });
    }
});

// Admin login route
router.get('/loginDetails', validateAdminData, (req, res) => {
    res.status(200).json({ success: true });
});

module.exports = router;