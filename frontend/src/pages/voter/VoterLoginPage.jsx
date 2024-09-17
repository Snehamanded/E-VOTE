import { useState } from 'react';
import {
  TextField,
  Button,
  Dialog,
  DialogContent,
} from '@mui/material';
import FadeLoader from 'react-spinners/FadeLoader';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const VoterLoginPage = () => {
  const navigate = useNavigate();

  const [usedStates, setUsedStates] = useState({
    loading: false,
    loginDetails: {
      email: '',
      password: '',
    },
    errors: {
      emailError: '',
      passwordError: '',
    },
  });

  const { loading, loginDetails, errors } = usedStates;
  const { email, password } = loginDetails;
  const { emailError, passwordError } = errors;

  // handle input event
  const handleInputEvent = (event) => {
    const { name, value } = event.target;
    setUsedStates((prevValue) => ({
      ...prevValue,
      loginDetails: {
        ...prevValue.loginDetails,
        [name]: value,
      },
    }));
  };

  // handle reset Errors
  const handleResetErrors = (props) => {
    setUsedStates((prevValue) => ({
      ...prevValue,
      errors: {
        ...prevValue.errors,
        [props]: '',
      },
    }));
  };

  // handle submit
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      // enable loading
      setUsedStates((prevValue) => ({
        ...prevValue,
        loading: true,
      }));

      const result = await axios.post('/api/voters/login', loginDetails);

      // on success
      if (result.data) {
        setUsedStates((prevValue) => ({
          ...prevValue,
          loading: false, // disable loading
        }));

        const { token } = result.data;

        // store token in session to use this value in multiple screens
        window.sessionStorage.setItem('token', token);
        window.sessionStorage.setItem('email', email);

        // navigate to voter home page
        navigate('/voter-home');
      }
    } catch (err) {
      // disable loading
      setUsedStates((prevValue) => ({
        ...prevValue,
        loading: false,
      }));

      const { errors, message } = err.response.data;

      // validation Error
      if (errors) {
        const { emailError, passwordError } = errors;

        setUsedStates((prevValue) => ({
          ...prevValue,
          errors: {
            ...prevValue.errors,
            emailError,
            passwordError,
          },
        }));
      }
      // DB Error
      else if (message) {
        swal({ title: 'Sorry', icon: 'error', text: message });
      }
      // display error rather than input errors
      else {
        err.response
          ? swal({
              title: `${err.response.status}`,
              text: `${err.response.data}`,
              icon: 'error',
            })
          : swal({
              title: 'Error',
              text: `${err}`,
              icon: 'error',
            });
      }
    }
  };

  return (
    <>
      <section className="login-section">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center min-vh-100">
            <div className="col-xl-4">
              <div className="card h-100 border-0 shadow">
                <div className="card-header bg-glass mt-2 border-bottom text-center">
                  <h1 className="fs-4 fw-bold">Voter Login</h1>
                </div>
                <div className="card-body">
                  <form autoComplete="off" method="POST" onSubmit={handleSubmit}>
                    <div className="row g-2">
                      {/* Enter Email */}
                      <div className="col-xl-12">
                        <TextField
                          required
                          variant="standard"
                          fullWidth
                          label="Email"
                          id="email"
                          name="email"
                          value={email}
                          onChange={(event) => {
                            handleInputEvent(event);
                            handleResetErrors('emailError');
                          }}
                          error={!!emailError}
                          helperText={emailError}
                        />
                      </div>

                      {/* Password */}
                      <div className="col-xl-12">
                        <TextField
                          required
                          variant="standard"
                          fullWidth
                          label="Password"
                          id="password"
                          name="password"
                          value={password}
                          onChange={(event) => {
                            handleInputEvent(event);
                            handleResetErrors('passwordError');
                          }}
                          error={!!passwordError}
                          helperText={passwordError}
                          type="password"
                        />
                      </div>

                      {/* Log in */}
                      <div className="col-xl-12 mt-4 text-center">
                        <Button
                          variant="outlined"
                          fullWidth
                          className="primary-button"
                          type="submit"
                          disabled={loading}
                        >
                          Log in
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loading dialog */}
      <Dialog open={loading} className="loading-modal">
        <DialogContent>
          <FadeLoader color="var(--white)" size={25} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VoterLoginPage;
