import { useState, useEffect } from 'react';
import { Typography, Paper, IconButton } from '@mui/material';
import MaterialTable from '@material-table/core';
import { CheckCircle, Cancel } from '@mui/icons-material';
import axios from 'axios';

const VerifyCandidates = () => {
    const [candidates, setCandidates] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response = await axios.get('/api/candidates');
                setCandidates(response.data.candidates);
            } catch (error) {
                console.error('Error fetching candidates:', error);
                setError('Failed to fetch candidates');
            }
        };

        fetchCandidates();
    }, []);

    const handleAction = async (candidateId, action) => {
        try {
            const isVerified = action === 'Verified';

            // Make PUT request to update candidate verification status in the database
            await axios.put(`/api/candidates/${candidateId}`, { isVerified });

            // Update local state with updated candidate verification status
            const updatedCandidates = candidates.map(candidate =>
                candidate._id === candidateId ? { ...candidate, isVerified } : candidate
            );
            setCandidates(updatedCandidates);
        } catch (error) {
            console.error('Error updating candidate verification status:', error);
            setError('Failed to update candidate verification status');
        }
    };

    const columns = [
        { title: 'Name', field: 'name' },
        { title: 'Party', field: 'party' },
        { title: 'Age', field: 'age', type: 'numeric' },
        { title: 'Email', field: 'email' },
        {
            title: 'Verification Status',
            field: 'isVerified',
            render: rowData => (
                <Typography
                    variant="body2"
                    color={
                        rowData.isVerified
                            ? 'primary'
                            : rowData.isVerified === false
                                ? 'error'
                                : 'inherit'
                    }
                >
                    {rowData.isVerified ? 'Verified' : 'Not Verified'}
                </Typography>
            ),
        },
        {
            title: 'Actions',
            render: rowData => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {!rowData.isVerified && (
                        <>
                            <IconButton
                                aria-label="Verify"
                                size="small"
                                color="primary"
                                onClick={() => handleAction(rowData._id, 'Verified')}
                            >
                                <CheckCircle />
                            </IconButton>
                            <IconButton
                                aria-label="Reject"
                                size="small"
                                color="error"
                                onClick={() => handleAction(rowData._id, 'Rejected')}
                            >
                                <Cancel />
                            </IconButton>
                        </>
                    )}
                </div>
            ),
        },
    ];

    return (
        <div className="container-fluid mt-5" style={{ maxWidth: '800px' }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Verify Candidates
                </Typography>
                {error && (
                    <Typography variant="body2" color="error" align="center" paragraph>
                        {error}
                    </Typography>
                )}
                <MaterialTable
                    columns={columns}
                    data={candidates.map(candidate => ({ ...candidate, isVerified: candidate.isVerified ?? false }))}
                    options={{
                        search: false,
                        paging: false,
                        toolbar: false,
                        headerStyle: {
                            backgroundColor: '#f2f2f2',
                            fontWeight: 'bold',
                        },
                    }}
                />
            </Paper>
        </div>
    );
};

export default VerifyCandidates;
