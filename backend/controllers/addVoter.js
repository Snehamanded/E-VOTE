const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Voter = require('../models/Voter');
const { body, validationResult } = require('express-validator');

// Middleware to validate Voter data
const validateVoterData = [
    body('name').trim().isLength({ min: 1 }).withMessage('Name is required'),
    body('UID').trim().isLength({ min: 1 }).withMessage('UID is required'),
    body('email').trim().isEmail().withMessage('Invalid email'),
    body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

// POST /api/voters/add-voter
router.post('/add-voter', validateVoterData, async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, UID, email, password, votedFor } = req.body;

    try {
        const existingVoter = await Voter.findOne({ email });
        if (existingVoter) {
            return res.status(400).json({ message: 'Voter with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newVoter = new Voter({ name, UID, email, password: hashedPassword, votedFor });
        const savedVoter = await newVoter.save();

        res.status(201).json({ message: 'Voter added successfully', voter: savedVoter });
    } catch (err) {
        console.error('Error adding Voter:', err);
        res.status(500).json({ message: 'Failed to add Voter' });
    }
});

// GET /api/voters/list
router.get('/list', async(req, res) => {
    try {
        const voters = await Voter.find();
        res.json(voters);
    } catch (err) {
        console.error('Error fetching voters:', err);
        res.status(500).json({ message: 'Failed to fetch voters' });
    }
});

// GET /api/voters/:id
router.get('/:id', async(req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'Invalid Voter ID format' });
    }

    try {
        const voter = await Voter.findById(id);
        if (!voter) {
            return res.status(404).json({ message: 'Voter not found' });
        }
        res.json(voter);
    } catch (err) {
        console.error('Error fetching voter:', err);
        res.status(500).json({ message: 'Failed to fetch voter' });
    }
});

// PUT /api/voters/update/:id
router.put('/update/:id', validateVoterData, async(req, res) => {
    const { id } = req.params;
    const { name, UID, email, password, votedFor } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'Invalid Voter ID format' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const updatedVoter = await Voter.findByIdAndUpdate(id, { name, UID, email, password: hashedPassword, votedFor }, { new: true });
        if (!updatedVoter) {
            return res.status(404).json({ message: 'Voter not found' });
        }
        res.json(updatedVoter);
    } catch (err) {
        console.error('Error updating Voter:', err);
        res.status(500).json({ message: 'Failed to update Voter' });
    }
});

// DELETE /api/voters/delete/:id
router.delete('/delete/:id', async(req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'Invalid Voter ID format' });
    }

    try {
        const deletedVoter = await Voter.findByIdAndDelete(id);
        if (!deletedVoter) {
            return res.status(404).json({ message: 'Voter not found' });
        }
        res.json({ message: 'Voter deleted successfully' });
    } catch (err) {
        console.error('Error deleting Voter:', err);
        res.status(500).json({ message: 'Failed to delete Voter' });
    }
});

// POST /api/voters/login - Login voter
router.post('/voter/login', async(req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }

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
        const token = jwt.sign(payload, 'asdfghjklmnbvcxz', { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ message: 'Failed to log in' });
    }
});

module.exports = router;