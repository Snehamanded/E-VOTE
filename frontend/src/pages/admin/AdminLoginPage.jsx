/****************************** Voter Login Page **************************************/

import {
  useState,
  TextField,
  Button,
  Dialog,
  DialogContent,
  FadeLoader,
  axios,
  swal,
  useNavigate,
} from "../../common/Imports";

const AdminLoginPage = () => {
  // used for redirect
  const navigate = useNavigate();

  const [usedStates, setUsedStates] = useState({
    loading: false,

    loginDetails: {
      userName: "",
      password: "",
    },

    errors: {
      userNameError: "",
      passwordError: "",
    },
  });

  /*************************** Destructering Objects Start **************************/

  const { loading, loginDetails, errors } = usedStates;

  const { userName, password } = loginDetails;

  const { userNameError, passwordError } = errors;

  /*************************** Destructering Objects end **************************/

  // handle input event
  const handleInputEvent = (event) => {
    const { name, value } = event.target;

    setUsedStates((prevValue) => {
      return {
        ...prevValue,
        loginDetails: {
          ...prevValue.loginDetails,
          [name]: value,
        },
      };
    });
  };

  // handle reset Errors
  const handleResetErrors = (props) => {
    setUsedStates((prevValue) => {
      return {
        ...prevValue,
        errors: {
          ...prevValue.errors,
          [props]: "",
        },
      };
    });
  };

  // handle submit
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      // enable loading
      setUsedStates((prevValue) => {
        return {
          ...prevValue,
          loading: true,
        };
      });

      const result = await axios.get("/api/loginDetails", { params: loginDetails });

      // on success
      if (result.data) {
        setUsedStates((prevValue) => {
          return {
            ...prevValue,
            loading: false, //disable loading
          };
        });

        

        // navigate to welcome page
        navigate("/admin-home");
      }
    } catch (err) {
      // disable loading
      setUsedStates((prevValue) => {
        return {
          ...prevValue,
          loading: false,
        };
      });

      const { errors, loginError } = err.response.data;

      // validation Error
      if (errors) {
        const { userNameError, passwordError } = errors;

        setUsedStates((prevValue) => {
          return {
            ...prevValue,
            errors: {
              ...prevValue.errors,
              userNameError,
              passwordError,
            },
          };
        });
      }

      // DB Error
      else if (loginError) {
        swal({ title: "Sorry", icon: "error", text: loginError });
      }
      // display error rather than input errors
      else {
        err.response
          ? swal({
              title: `${err.response.status}`,
              text: `${err.response.data}`,
              icon: "error",
            })
          : swal({
              title: `Error`,
              text: `${err}`,
              icon: "error",
            });
      }
    }
  };

  return (
    <>
      <section className="login-section">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center min-vh-100">
            {/* <div className="col-xl-4">
            <img
              src={require("../dist/img/chatbot.png")}
              alt="chatbot.png"
              className="img-fluid"
            />
          </div> */}

            <div className="col-xl-4">
              <div className="card h-100 border-0 shadow">
                <div className="card-header bg-glass mt-2 border-bottom  text-center">
                  <h1 className="fs-4 fw-bold">Admin Login</h1>
                </div>
                <div className="card-body">
                  <form
                    autoComplete="off"
                    method="POST"
                    onSubmit={handleSubmit}
                  >
                    <div className="row g-2">
                      {/* Enter user Name */}
                      <div className="col-xl-12">
                        <TextField
                          required
                          variant="standard"
                          fullWidth
                          label="User Name"
                          id="userName"
                          name="userName"
                          value={userName}
                          onChange={(event) => {
                            handleInputEvent(event);
                            handleResetErrors("userNameError");
                          }}
                          error={userNameError ? true : false}
                          helperText={userNameError}
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
                            handleResetErrors("passwordError");
                          }}
                          error={passwordError ? true : false}
                          helperText={passwordError}
                          type="password"
                        />
                      </div>

                      {/* sign in*/}
                      <div className="col-xl-12 mt-4 text-center">
                        {/* sign in*/}
                        <Button
                          variant="outlined"
                          fullWidth
                          className="primary-button"
                          type="submit"
                          disabled={loading}
                        >
                          sign in
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

export default AdminLoginPage;
