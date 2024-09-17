/* eslint-disable react/prop-types */
/*************************************** SideBar Component *****************************************/

import {
  NavLink,
  Divider,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  ListItem,
  List,
  Drawer,
  Box,
} from "../common/Imports";
import sideBarData from "./sideBarData";

export default function SideBar({ open, toggleDrawer }) {
  const DrawerList = (
    <Box
      sx={{
        width: 250,
        zIndex: 1400,
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        {sideBarData.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={NavLink}
              to={item.path}
              exact
              style={{
                textDecoration: "none",
                color: "inherit",
                padding: "16px 16px", // Adjust padding as needed
                justifyContent: "flex-start",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.08)",
                },
              }}
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
              sx={{
                "&.active": {
                  backgroundColor: "rgba(0, 0, 0, 0.08)",
                  color: "blue",
                  "& .MuiListItemIcon-root": {
                    color: "blue",
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: "auto", marginRight: 1 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    // side menu bar drawer
    <div>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        variant="temporary"
        sx={{
          zIndex: 1400,
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 250,
          },
        }}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}