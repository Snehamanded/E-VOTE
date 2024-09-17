/*************************************** SideBarData file *****************************************/

import {
    HomeIcon,
    PersonAddIcon,
    PowerSettingsNewIcon,
    HowToRegIcon,
    AccountBoxIcon,
    GroupAddIcon,
    EmojiEventsIcon,
    SettingsIcon,
  } from "../common/Icons";
  
  const sideBarData = [
    {
      text: "Home",
      icon: <HomeIcon />,
      path: "/admin-home",
    },
    {
      text: "Add Candidate",
      icon: <PersonAddIcon />,
      path: "/add-candidate",
    },
    {
      text: "Verify Candidate",
      icon: <HowToRegIcon />,
      path: "/verify-candidate",
    },
    {
      text: "Candidate Details",
      icon: <AccountBoxIcon />,
      path: "/candidate-details",
    },
    {
      text: "Add Voter",
      icon: <GroupAddIcon />,
      path: "/add-voter",
    },
    {
      text: "Manage Elections",
      icon: <SettingsIcon />,
      path: "/manage-elections",
    },
    {
      text: "Declare Results",
      icon: <EmojiEventsIcon />,
      path: "/declare-results",
    },
    {
      text: "Logout",
      icon: <PowerSettingsNewIcon />,
      path: "/admin-login",
    },
  ];
  
  export default sideBarData;
  