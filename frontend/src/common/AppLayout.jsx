/*************************************** App Layout Component *****************************************/

import  { Header, Outlet } from "./Imports";

const AppLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default AppLayout;
