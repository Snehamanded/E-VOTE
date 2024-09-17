import  { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
  Button,
  Modal,
  TextField,
} from '@mui/material';
import axios from 'axios';
import MaterialTable from '@material-table/core';
import swal from 'sweetalert';

const Addvoter = () => {
  const [name, setName] = useState('');
  const [UID, setUID] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [voters, setVoters] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  useEffect(() => {
    // Fetch voters list on component mount
    const fetchVoters = async () => {
      try {
        const response = await axios.get('/api/list');
        setVoters(response.data);
      } catch (error) {
        console.error('Error fetching voters:', error);
      }
    };

    fetchVoters();
  }, []);

  const handleAddVoter = async () => {
    try {
      // Validate form fields
      if (!name || !UID || !email || !password) {
        setError('Please fill in all fields.');
        return;
      }

      // Create voter data to send to backend
      const voterData = {
        name,
        UID,
        email,
        password,
        votedFor: null, // Initialize votedFor field as null or handle as required
      };

      // Make POST request to backend to add voter
      const response = await axios.post('/api/add-voter', voterData);

      // Handle success message and update state
      setVoters([...voters, response.data.voter]);
      setName('');
      setUID('');
      setEmail('');
      setPassword('');
      setError(null);

      // Show success message to user
      swal({
        title: 'Success',
        text: 'Voter added successfully',
        icon: 'success',
      });
    } catch (error) {
      // Handle error and display error message
      console.error('Error adding voter:', error.response.data);
      setError(error.response.data.message || 'Failed to add voter. Please try again.');
      swal({
        title: 'Error',
        text: error.response.data.message || 'Failed to add voter. Please try again.',
        icon: 'error',
      });
    }
  };

  const handleUpdateVoter = async (newData, oldData) => {
    try {
      const response = await axios.put(`/api/update/${oldData._id}`, newData);

      const updatedVoters = [...voters];
      const index = updatedVoters.findIndex((voter) => voter._id === oldData._id);
      updatedVoters[index] = response.data;

      setVoters(updatedVoters);

      // Show success message to user
      swal({
        title: 'Success',
        text: 'Voter details updated successfully',
        icon: 'success',
      });
    } catch (error) {
      console.error('Error updating voter:', error);
      swal({
        title: 'Error',
        text: 'Failed to update voter details. Please try again.',
        icon: 'error',
      });
    }
  };

  const handleDeleteVoter = async (oldData) => {
    try {
      await axios.delete(`/api/delete/${oldData._id}`);

      const updatedVoters = voters.filter((voter) => voter._id !== oldData._id);
      setVoters(updatedVoters);

       // Show success message to user
       swal({
        title: 'Success',
        text: 'Voter deleted successfully',
        icon: 'success',
      });
    } catch (error) {
      console.error('Error deleting voter:', error);
      swal({
        title: 'Error',
        text: 'Failed to delete voter. Please try again.',
        icon: 'error',
      });
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    // Reset form fields and error state when closing modal
    setName('');
    setUID('');
    setEmail('');
    setPassword('');
    setError(null);
  };

  const columns = [
    { title: 'Name', field: 'name' },
    { title: 'UID', field: 'UID' },
    { title: 'Email', field: 'email' },
    { title: 'Password', field: 'password', render: () => '******' }, // Hide password as asterisks
  ];

  return (
    <Grid container justifyContent="center" mt={5}>
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <Card>
          <CardHeader
            title="Manage Voters"
            titleTypographyProps={{ variant: 'h5', align: 'center' }}
            sx={{ bgcolor: 'primary.main', color: 'white' }}
          />
          <CardContent>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenModal}
              sx={{ marginBottom: 2 }}
            >
              Add Voter
            </Button>

            <MaterialTable
              title="Voters List"
              columns={columns}
              data={voters}
              editable={{
                onRowUpdate: handleUpdateVoter,
                onRowDelete: handleDeleteVoter,
              }}
              options={{
                actionsColumnIndex: -1,
                pageSize: 5,
                pageSizeOptions: [5, 10, 20],
                addRowPosition: 'first',
                headerStyle: {
                  backgroundColor: '#f2f2f2',
                  fontWeight: 'bold',
                },
              }}
            />
            {error && (
              <Typography variant="body2" color="error" align="center" mt={2}>
                {error}
              </Typography>
            )}

            {/* Modal for adding voter */}
            <Modal
              open={openModal}
              onClose={handleCloseModal}
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
            >
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  bgcolor: 'background.paper',
                  boxShadow: 24,
                  p: 4,
                  minWidth: 300,
                  maxWidth: '80%',
                  borderRadius: 4,
                }}
              >
                <Grid item xs={12} mb={2}>
                  <Typography variant="h6" align="center" id="modal-title">
                    Add Voter
                  </Typography>
                </Grid>
                <Grid item xs={12} mb={2}>
                  <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} mb={2}>
                  <TextField
                    label="UID"
                    variant="outlined"
                    fullWidth
                    required
                    value={UID}
                    onChange={(e) => setUID(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} mb={2}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} mb={2}>
                  <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    required
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </Grid>
                <Grid item xs={12} mb={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleAddVoter}
                  >
                    Add Voter
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    onClick={handleCloseModal}
                  >
                    Close
                  </Button>
                </Grid>
                {error && (
                  <Grid item xs={12}>
                    <Typography variant="body2" color="error" align="center">
                      {error}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Modal>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Addvoter;
