/*************************************** Header Component *****************************************/

import { MenuIcon } from "../common/Icons";
import {
  SideBar,
  AppBar,
//   Box,
  Toolbar,
  Typography,
  IconButton,
  useState,
  Box,
} from "../common/Imports";
import image from "../assets/logo.jpg";

export default function Header() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <AppBar
        position="fixed" // Ensures the AppBar is fixed at the top
        sx={{ backgroundColor: "white", color: "black", zIndex: 1300 }} // Adjust styles as needed
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            E - Vote
          </Typography>
          <Box sx={{ ml: "auto" }}>
            <img
              src={image}
              alt="Prosoft_Logo.png"
              className="img-fluid"
              width={65}
              height={35}
            />
          </Box> 

        </Toolbar>
      </AppBar>
      <Toolbar />
      <SideBar open={open} toggleDrawer={toggleDrawer} />
    </>
  );
}
