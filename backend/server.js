const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');

app.use(express.json());

// Import and use controllers
app.use(require("./controllers/login"));
app.use(require("./controllers/addCandidate"));
app.use(require("./controllers/addVoter"));
app.use(require("./controllers/vote"));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/E-Vote', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
    })
    .catch(err => console.error('Error connecting to MongoDB:', err));