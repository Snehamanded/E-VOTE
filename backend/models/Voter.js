const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voterSchema = new Schema({
    name: { type: String, required: true },
    UID: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    votedFor: { type: Schema.Types.ObjectId, ref: 'Candidate' }
});

module.exports = mongoose.model('Voter', voterSchema);