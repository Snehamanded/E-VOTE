// routes/candidates.js

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

        // Create new candidate
        const newCandidate = new Candidate({
            name,
            party,
            age,
            email,
        });

        // Save new candidate
        const savedCandidate = await newCandidate.save();

        res.status(201).json({ message: 'Candidate added successfully', candidate: savedCandidate });
    } catch (err) {
        console.error('Error saving candidate:', err);
        res.status(500).json({ message: 'Failed to add candidate' });
    }
});

// PUT /api/candidates/:candidateId - Update candidate verification status
router.put('/candidates/:candidateId', async(req, res) => {
    const { candidateId } = req.params;
    const { status } = req.body;

    try {
        const candidate = await Candidate.findByIdAndUpdate(
            candidateId, { status }, { new: true } // Return updated document
        );

        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }

        res.status(200).json({ message: 'Candidate status updated successfully', candidate });
    } catch (error) {
        console.error('Error updating candidate status:', error);
        res.status(500).json({ message: 'Failed to update candidate status' });
    }
});



module.exports = router;