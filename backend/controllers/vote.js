const express = require('express');
const { validationResult } = require('express-validator');
const Voter = require('../models/Voter');
const Candidate = require('../models/Candidate');
const { body } = require('express-validator');

const router = express.Router();

// Validate vote data middleware
const validateVoteData = [
    body('email').isEmail().withMessage('Email is invalid'),
    body('votedFor').isMongoId().withMessage('Invalid candidate ID'),
];

// POST /api/voters/vote - Record voter's vote
router.post('/voters/vote', validateVoteData, async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('Validation errors:', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, votedFor } = req.body;

    try {
        console.log(`Looking for voter with email: ${email}`);
        const voter = await Voter.findOne({ email });
        if (!voter) {
            console.log('Voter not found');
            return res.status(404).json({ message: 'Voter not found' });
        }

        // Check if the voter has already voted
        if (voter.votedFor) {
            console.log('Voter has already voted');
            return res.status(400).json({ message: 'You have already voted' });
        }

        console.log(`Incrementing vote for candidate ID: ${votedFor}`);
        // Find the candidate by ID and update their votes
        const candidate = await Candidate.findByIdAndUpdate(votedFor, { $inc: { votes: 1 } }, { new: true });
        if (!candidate) {
            console.log('Candidate not found');
            return res.status(404).json({ message: 'Candidate not found' });
        }

        // Update the voter's votedFor field and save
        voter.votedFor = votedFor;
        await voter.save();

        console.log('Vote recorded successfully');
        res.status(200).json({ success: true, candidate });
    } catch (error) {
        console.error('Error recording vote:', error);
        res.status(500).json({ message: 'Failed to record vote' });
    }
});

module.exports = router;