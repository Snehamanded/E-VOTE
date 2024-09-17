// AdminHomePage.js
import { NavLink } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const AdminHomePage = () => {
  return (
    <Container style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Admin Home Page
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} style={{ padding: '1rem', textAlign: 'center' }}>
            <NavLink to="/add-candidate" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="h6">Add Candidate</Typography>
            </NavLink>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} style={{ padding: '1rem', textAlign: 'center' }}>
            <NavLink to="/add-voter" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="h6">Add Voter</Typography>
            </NavLink>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} style={{ padding: '1rem', textAlign: 'center' }}>
            <NavLink to="/verify-candidate" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="h6">Verify Candidate</Typography>
            </NavLink>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} style={{ padding: '1rem', textAlign: 'center' }}>
            <NavLink to="/declare-results" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="h6">Declare Results</Typography>
            </NavLink>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminHomePage;
