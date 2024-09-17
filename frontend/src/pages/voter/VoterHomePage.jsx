import React, { useEffect, useState } from 'react';
import {
  Typography, Paper, Card, CardContent, CardMedia, Grid, FormControl,
  InputLabel, Select, MenuItem, Button, CircularProgress, Container
} from '@mui/material';
import axios from 'axios';
import swal from 'sweetalert';

const VoterHomePage = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get('/api/candidates/verified');
        setCandidates(response.data.candidates || []);
      } catch (error) {
        console.error('Error fetching candidates:', error);
        setError('Failed to fetch candidates');
      }
    };

    fetchCandidates();
  }, []);

  const handleVote = async () => {
    setLoading(true);
    try {
      const voterEmail = window.sessionStorage.getItem('email');
      console.log(`Voting for candidate ID: ${selectedCandidate} by voter email: ${voterEmail}`);
      const response = await axios.post('/api/voters/vote', { email: voterEmail, votedFor: selectedCandidate });

      if (response.data) {
        // Update the UI to reflect the new vote count
        setCandidates((prevCandidates) =>
          prevCandidates.map((candidate) =>
            candidate._id === selectedCandidate ? { ...candidate, votes: candidate.votes + 1 } : candidate
          )
        );
        // Show success message
        swal({ title: 'Success', text: 'Your vote has been recorded', icon: 'success' });
      }
    } catch (error) {
      console.error('Error voting:', error);
      // Show error message
      swal({ title: 'Error', text: 'Failed to record vote', icon: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Vote for your favorite candidate!
        </Typography>
        {error && (
          <Typography variant="body2" color="error" align="center" paragraph>
            {error}
          </Typography>
        )}
        <Grid container spacing={3}>
          {Array.isArray(candidates) && candidates.length > 0 ? (
            candidates.map((candidate) => (
              <Grid item xs={12} sm={6} md={4} key={candidate._id}>
                <Card
                  sx={{
                    borderRadius: '50%', // Make the card circular
                    overflow: 'hidden', // Clip the content inside the circle
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '200px', // Set a fixed height for consistency
                    width: '200px', // Set a fixed width for consistency
                    margin: 'auto' // Center align the card
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://via.placeholder.com/150" // Replace with actual image URL or keep for testing
                    alt={`${candidate.name}'s image`}
                    sx={{
                      width: '100%', // Ensure the image covers the entire circle
                      objectFit: 'cover', // Maintain aspect ratio
                      borderRadius: '50%' // Ensure the image itself is circular
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6" align="center">
                      {candidate.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center">
                      {candidate.party}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body2" align="center" paragraph>
              No candidates available.
            </Typography>
          )}
        </Grid>
        <FormControl fullWidth sx={{ mt: 4 }}>
          <InputLabel id="candidate-select-label">Select Candidate</InputLabel>
          <Select
            labelId="candidate-select-label"
            id="candidate-select"
            value={selectedCandidate}
            label="Select Candidate"
            onChange={(e) => setSelectedCandidate(e.target.value)}
          >
            {Array.isArray(candidates) && candidates.length > 0 ? (
              candidates.map((candidate) => (
                <MenuItem key={candidate._id} value={candidate._id}>
                  {candidate.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="">No candidates available</MenuItem>
            )}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 4 }}
          onClick={handleVote}
          disabled={loading || !selectedCandidate}
        >
          {loading ? <CircularProgress size={24} /> : 'Vote'}
        </Button>
      </Paper>
    </Container>
  );
};

export default VoterHomePage;

