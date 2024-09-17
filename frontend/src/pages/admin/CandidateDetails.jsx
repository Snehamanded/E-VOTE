import  { useState, useEffect } from 'react';
import { Typography, Paper, Card, CardContent, CardMedia, Grid } from '@mui/material';
import axios from 'axios';

const CandidateDetails = () => {
    const [candidates, setCandidates] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCandidateDetails = async () => {
            try {
                const response = await axios.get('/api/candidates/verified'); // Fetch only verified candidates
                setCandidates(response.data.candidates);
            } catch (error) {
                console.error('Error fetching candidate details:', error);
                setError('Failed to fetch candidate details');
            }
        };

        fetchCandidateDetails();
    }, []);

    return (
        <div className="container-fluid mt-5" style={{ maxWidth: '800px' }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Verified Candidates Details
                </Typography>
                {error && (
                    <Typography variant="body2" color="error" align="center" paragraph>
                        {error}
                    </Typography>
                )}
                <Grid container spacing={3}>
                    {candidates.map((candidate) => (
                        <Grid item xs={12} sm={6} md={4} key={candidate._id}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image="https://via.placeholder.com/150" // Replace with actual image URL or keep for testing
                                    alt={`${candidate.name}'s image`}
                                />
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        {candidate.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>Party:</strong> {candidate.party}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>Age:</strong> {candidate.age}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>Email:</strong> {candidate.email}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>Status:</strong> {candidate.isVerified ? 'Verified' : 'Not Verified'}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </div>
    );
};

export default CandidateDetails;
