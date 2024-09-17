import  { useState } from 'react';
import { Card, CardHeader, CardContent, TextField, Button, Typography, Grid } from '@mui/material';
import axios from 'axios';
import swal from 'sweetalert';

const AddCandidate = () => {
    const [name, setName] = useState('');
    const [party, setParty] = useState('');
    const [age, setAge] = useState(18);
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Validate form fields
            if (!name || !party || !age || !email) {
                setError('Please fill in all fields.');
                return;
            }

            // Create candidate data to send to backend
            const candidateData = {
                name,
                party,
                age: parseInt(age),
                email,
            };

            // Make POST request to backend
            const response = await axios.post('/api/add-candidate', candidateData);

            console.log('Candidate Added:', response.data);
            swal({
                title: "Success",
                text: "Candidate added successfully",
                icon: "success",
            });
            // Optionally, reset form fields after successful submission
            setName('');
            setParty('');
            setAge(18);
            setEmail('');
            setError(null); // Clear any previous errors
        } catch (error) {
            console.error('Error adding candidate:', error);
            setError('Failed to add candidate. Please try again.');
        }
    };

    const handleAgeChange = (event) => {
        const value = event.target.value;
        if (value >= 18) {
            setAge(value);
        }
        // You can optionally set an error message here if age is less than 18
    };

    return (
        <Grid container justifyContent="center" mt={5}>
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <Card>
                    <CardHeader
                        title="Add Candidate"
                        titleTypographyProps={{ variant: 'h5', align: 'center' }}
                        sx={{ bgcolor: 'primary.main', color: 'white' }}
                    />
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Name"
                                        variant="outlined"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Party"
                                        variant="outlined"
                                        required
                                        value={party}
                                        onChange={(e) => setParty(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Age"
                                        variant="outlined"
                                        type="number"
                                        required
                                        value={age}
                                        onChange={(e) => handleAgeChange(e)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        variant="outlined"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Grid>
                                {error && (
                                    <Grid item xs={12}>
                                        <Typography variant="body2" color="error">
                                            {error}
                                        </Typography>
                                    </Grid>
                                )}
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                    >
                                        Add Candidate
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default AddCandidate;
