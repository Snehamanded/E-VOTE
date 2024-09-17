import React, { useState } from 'react';
import { Container, Typography, Button, NavLink } from '../common/Imports';
import axios from 'axios';

const HomePage = () => {
  const [winner, setWinner] = useState('');
  const [totalVotes, setTotalVotes] = useState('');
  const [candidatesData, setCandidatesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchResults = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('/api/candidates'); // Fetch results from the API
      const candidates = response.data.candidates;

      if (candidates.length === 0) {
        setError('No candidates found.');
        return;
      }

      let highestVotes = 0;
      let winningCandidate = '';
      const updatedCandidatesData = candidates.map(candidate => {
        if (candidate.votes > highestVotes) {
          highestVotes = candidate.votes;
          winningCandidate = candidate.name;
        }
        return { name: candidate.name, votes: candidate.votes };
      });

      setWinner(winningCandidate);
      setTotalVotes(highestVotes);
      setCandidatesData(updatedCandidatesData);
      setError(null);
    } catch (error) {
      console.error('Error fetching vote counts:', error);
      setError('Failed to fetch vote counts.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={styles.container}>
      <Typography variant="h2" style={styles.header}>
        Secure Voting
      </Typography>
      <Typography variant="h5" style={styles.description}>
        Welcome to the E-VOTE. Cast your vote with confidence.
      </Typography>
      <div style={styles.buttonContainer}>
        {/* Voter Login Button */}
        <NavLink to="/voter-login" style={styles.link}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={styles.button}
          >
            Start Voting
          </Button>
        </NavLink>

        {/* View Results Button */}
        <Button
          variant="outlined"
          color="secondary"
          size="large"
          style={styles.button}
          onClick={fetchResults}
          disabled={loading}
        >
          {loading ? 'Fetching...' : 'View Results'}
        </Button>
      </div>

      {/* Display an error if any */}
      {error && (
        <Typography color="error" style={{ marginTop: '1rem' }}>
          {error}
        </Typography>
      )}

      {/* Display results if available */}
      {winner && (
        <div style={styles.resultsContainer}>
          <Typography variant="h6">Election Results</Typography>
          <Typography variant="body1" style={styles.winner}>
            <strong>Winner:</strong> {winner}
          </Typography>
          <Typography variant="body1">
            <strong>Total Votes:</strong> {totalVotes}
          </Typography>
          <ul>
            {candidatesData.map((candidate, index) => (
              <li key={index} style={styles.candidateItem}>
                {candidate.name}: {candidate.votes} votes
              </li>
            ))}
          </ul>
        </div>
      )}
    </Container>
  );
};

// CSS Styling
const styles = {
  container: {
    marginTop: '8rem',
    textAlign: 'center',
    padding: '2rem',
    backgroundColor: '#f4f6f8',
    borderRadius: '8px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  },
  header: {
    marginBottom: '2rem',
    fontWeight: 'bold',
    color: '#3f51b5',
  },
  description: {
    marginBottom: '2rem',
    color: '#555',
  },
  buttonContainer: {
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
  },
  button: {
    marginTop: '1rem',
    padding: '0.75rem 1.5rem',
    borderRadius: '25px',
  },
  link: {
    textDecoration: 'none',
  },
  resultsContainer: {
    marginTop: '2rem',
    padding: '1rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
  },
  winner: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#388e3c',
    marginBottom: '1rem',
  },
  candidateItem: {
    backgroundColor: '#e0f7fa',
    margin: '5px 0',
    padding: '10px',
    borderRadius: '5px',
    listStyle: 'none',
  },
};

export default HomePage;
