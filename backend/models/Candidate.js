const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const candidateSchema = new Schema({
    name: { type: String, required: true },
    party: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    isVerified: { type: Boolean, default: false },
    votes: { type: Number, default: 0 }
});

module.exports = mongoose.model('Candidate', candidateSchema);