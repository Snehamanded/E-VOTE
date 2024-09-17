/************************ Routing can handle by this file ************************/

import {
    Routes,
    Route,
    HomePage,
    VoterLoginPage,
    AppLayout,
    Outlet,
    Navigate,
    VoterHomePage,
    AdminLoginPage,
    AdminHomePage,
    AddCandidate,
    VerifyCandidate,
    CandidateDetails,
    AddVoter,
    ManageElections,
    DeclareResults,
  } from "../common/Imports";

  // Authenticate Routes
const AuthRoutes = () => {
  // get session data
  // const userId = window.sessionStorage.getItem("userId");
  const userId = true

  return userId ? <Outlet /> : <Navigate to="/voter-login" />;
};

  
  const Router = () => {
    return (
      <>
        <Routes>
          {/* Home Page */}
          <Route exact path="/" element={<HomePage />} />
       
  
          {/* Voter Login */}
          <Route exact path="/admin-login" element={<AdminLoginPage />} />
          {/* App Layout & Private Routes fo Admin */}
          <Route element={<AppLayout />}>
            <Route exact element={<AuthRoutes />}>
              <Route exact path="/admin-home" element={<AdminHomePage />} />
              <Route exact path="/add-candidate" element={<AddCandidate />} />
              <Route exact path="/verify-candidate" element={<VerifyCandidate />} />
              <Route exact path="/candidate-details" element={<CandidateDetails  />} />
              <Route exact path="/add-voter" element={<AddVoter />} />
              <Route exact path="/manage-elections" element={<ManageElections />} />
              <Route exact path="/declare-results" element={<DeclareResults />} />
            </Route>
          </Route>


          {/* Voter Login */}
          <Route exact path="/voter-login" element={<VoterLoginPage />} />
          {/* <Route exact element={<AuthRoutes />}> */}
              <Route exact path="/voter-home" element={<VoterHomePage />} />
          {/* </Route> */}
        </Routes>
      </>
    );
  };
  
  export default Router;
  