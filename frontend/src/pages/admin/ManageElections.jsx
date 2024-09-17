// import  { useState } from 'react';
// import { Container, Card, CardHeader, CardContent, Button, Typography, TextField } from '@mui/material';


// const ManageElections = () => {
//   const [electionStatus, setElectionStatus] = useState('Election is not started');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');

//   const handleStartElection = () => {
//     if (!startDate) {
//       alert('Please select a start date');
//       return;
//     }
//     setElectionStatus(`Election started on ${startDate}`);
//     console.log('Election Started on', startDate);
//   };

//   const handleEndElection = () => {
//     if (!endDate) {
//       alert('Please select an end date');
//       return;
//     }
//     setElectionStatus(`Election ended on ${endDate}`);
//     console.log('Election Ended on', endDate);
//   };

//   return (
//     <Container style={{ marginTop: '80px', maxWidth: '600px' }}>
//       <Card>
//         <CardHeader title="Election Management" className="bg-primary text-white" />
//         <CardContent>
//           <Typography variant="h6" gutterBottom>
//             {electionStatus}
//           </Typography>
//           <TextField
//             label="Start Date"
//             type="date"
//             InputLabelProps={{ shrink: true }}
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="End Date"
//             type="date"
//             InputLabelProps={{ shrink: true }}
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//             fullWidth
//             margin="normal"
//           />
//           <Button
//             variant="contained"
//             color="success"
//             onClick={handleStartElection}
//             style={{ marginRight: '10px', marginTop: '10px' }}
//           >
//             Start Election
//           </Button>
//           <Button
//             variant="contained"
//             color="error"
//             onClick={handleEndElection}
//             style={{ marginTop: '10px' }}
//           >
//             End Election
//           </Button>
//         </CardContent>
//       </Card>
//     </Container>
//   );
// };

// export default ManageElections;
import { useState, useEffect } from 'react';
import { Container, Card, CardHeader, CardContent, Button, Typography, TextField } from '@mui/material';
import axios from 'axios';

const ManageElections = () => {
  const [electionStatus, setElectionStatus] = useState('Election is not started');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    // Fetch the current election status on component mount
    const fetchElectionStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5000/election-status');
        const { status, start_date, end_date } = response.data || {};
        setElectionStatus(status || 'Election is not started');
        setStartDate(start_date || '');
        setEndDate(end_date || '');
      } catch (error) {
        console.error('Error fetching election status:', error);
      }
    };

    fetchElectionStatus();
  }, []);

  const handleStartElection = async () => {
    if (!startDate) {
      alert('Please select a start date');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/start-election', {
        status: `Election started on ${startDate}`,
        start_date: startDate,
        end_date: endDate,
      });
      const { status } = response.data;
      setElectionStatus(status);
      console.log('Election Started on', startDate);
    } catch (error) {
      console.error('Error starting election:', error);
    }
  };

  const handleEndElection = async () => {
    if (!endDate) {
      alert('Please select an end date');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/end-election', {
        status: `Election ended on ${endDate}`,
        start_date: startDate,
        end_date: endDate,
      });
      const { status } = response.data;
      setElectionStatus(status);
      console.log('Election Ended on', endDate);
    } catch (error) {
      console.error('Error ending election:', error);
    }
  };

  return (
    <Container style={{ marginTop: '80px', maxWidth: '600px' }}>
      <Card>
        <CardHeader title="Election Management" className="bg-primary text-white" />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {electionStatus}
          </Typography>
          <TextField
            label="Start Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="End Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleStartElection}
            style={{ marginRight: '10px', marginTop: '10px' }}
          >
            Start Election
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleEndElection}
            style={{ marginTop: '10px' }}
          >
            End Election
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ManageElections;

