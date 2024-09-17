import { useState } from 'react';
import { Container, Card, CardHeader, CardContent, Button, Typography, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const DeclareResults = () => {
  const [winner, setWinner] = useState('');
  const [totalVotes, setTotalVotes] = useState('');
  const [candidatesData, setCandidatesData] = useState([]);
  const [error, setError] = useState(null);

  const handleDeclareResults = async () => {
    try {
      const response = await axios.get('/api/candidates');
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
      setError('Failed to fetch vote counts');
    }
  };

  const containerStyle = {
    marginTop: '80px',
    maxWidth: '600px',
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  };

  const cardHeaderStyle = {
    backgroundColor: '#1976d2',
    color: 'white',
    textAlign: 'center',
    padding: '10px',
    borderRadius: '10px 10px 0 0',
  };

  const buttonStyle = {
    marginTop: '20px',
    width: '100%',
    padding: '10px',
    backgroundColor: '#1976d2',
    color: 'white',
    fontSize: '16px',
  };

  const listItemStyle = {
    backgroundColor: '#e0f7fa',
    margin: '5px 0',
    padding: '10px',
    borderRadius: '5px',
  };

  const winnerStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#388e3c',
  };

  const errorStyle = {
    color: 'red',
    textAlign: 'center',
    marginTop: '10px',
  };

  return (
    <Container style={containerStyle}>
      <Card>
        <CardHeader title="Declare Election Results" style={cardHeaderStyle} />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Click the button below to declare the election results
          </Typography>
          <Button
            variant="contained"
            style={buttonStyle}
            onClick={handleDeclareResults}
          >
            Declare Results
          </Button>
          {error && (
            <Typography variant="body2" style={errorStyle} paragraph>
              {error}
            </Typography>
          )}
          {winner && (
            <Typography variant="body1" style={winnerStyle} paragraph>
              <strong>Winner:</strong> {winner}
            </Typography>
          )}
          {totalVotes && (
            <Typography variant="body1" paragraph>
              <strong>Total Votes:</strong> {totalVotes}
            </Typography>
          )}
          {candidatesData.length > 0 && (
            <List>
              {candidatesData.map((candidate, index) => (
                <ListItem key={index} style={listItemStyle}>
                  <ListItemText
                    primary={`${candidate.name}: ${candidate.votes} votes`}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default DeclareResults;
