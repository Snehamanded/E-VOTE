const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');

// Middleware to validate candidate data
const validateCandidateData = (req, res, next) => {
    const { name, party, age, email } = req.body;

    if (!name || !party || !age || !email) {
        return res.status(400).json({ message: 'Please provide name, party, age, and email' });
    }

    next();
};

// POST /api/add-candidate - Add a new candidate
router.post('/add-candidate', validateCandidateData, async(req, res) => {
    const { name, party, age, email } = req.body;

    try {
        // Check if candidate with the same email already exists
        const existingCandidate = await Candidate.findOne({ email });
        if (existingCandidate) {
            return res.status(400).json({ message: 'Candidate with this email already exists' });
        }

        const newCandidate = new Candidate({
            name,
            party,
            age,
            email,
            isVerified: false,
            votes: 0,
        });

        const savedCandidate = await newCandidate.save();

        res.status(201).json({ message: 'Candidate added successfully', candidate: savedCandidate });
    } catch (err) {
        console.error('Error saving candidate:', err);
        // Check if the error is due to duplicate key (email)
        if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
            return res.status(400).json({ message: 'Candidate with this email already exists' });
        }
        res.status(500).json({ message: 'Failed to add candidate' });
    }
});

// GET /api/candidates - Fetch all candidates
router.get('/candidates', async(req, res) => {
    try {
        const candidates = await Candidate.find();
        res.status(200).json({ candidates });
    } catch (error) {
        console.error('Error fetching candidates:', error);
        res.status(500).json({ message: 'Failed to fetch candidates' });
    }
});

// GET /api/candidates/verified - Fetch all verified candidates
router.get('/candidates/verified', async(req, res) => {
    try {
        const verifiedCandidates = await Candidate.find({ isVerified: true });
        res.status(200).json({ candidates: verifiedCandidates });
    } catch (error) {
        console.error('Error fetching verified candidates:', error);
        res.status(500).json({ message: 'Failed to fetch verified candidates' });
    }
});

// PUT /api/candidates/:candidateId - Update candidate verification status
router.put('/candidates/:candidateId', async(req, res) => {
    const { candidateId } = req.params;
    const { isVerified } = req.body;

    try {
        const candidate = await Candidate.findById(candidateId);
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }

        candidate.isVerified = isVerified;
        await candidate.save();

        res.status(200).json({ message: 'Candidate status updated successfully', candidate });
    } catch (error) {
        console.error('Error updating candidate status:', error);
        res.status(500).json({ message: 'Failed to update candidate status' });
    }
});

// PUT /api/voters/vote - Update voter's vote
router.put('/voters/vote', async(req, res) => {
    const { email, votedFor } = req.body;
    if (!email || !votedFor) {
        return res.status(400).json({ message: 'Email and candidate selection are required' });
    }

    try {
        const voter = await Voter.findOne({ email });
        if (!voter) {
            return res.status(404).json({ message: 'Voter not found' });
        }

        voter.votedFor = votedFor;
        await voter.save();

        // Increment the vote count for the selected candidate
        await Candidate.findByIdAndUpdate(votedFor, { $inc: { votes: 1 } });

        res.status(200).json({ message: 'Vote recorded successfully' });
    } catch (error) {
        console.error('Error recording vote:', error);
        res.status(500).json({ message: 'Failed to record vote' });
    }
});

module.exports = router;