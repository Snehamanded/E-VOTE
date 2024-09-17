/**************************** inlcude all import files *******************************************/

// inbuilt css
import "bootstrap/dist/css/bootstrap.min.css";

//custom css
import "../styles/index.css";

//font-family
import "@fontsource/assistant";

import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  useNavigate,
  useLocation,
  Navigate,
  Link,
  NavLink,
  Routes,
  Route,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import {
  Container,
  TextField,
  Box,
  Toolbar,
  Typography,
  AppBar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Popover,
} from "@mui/material";
import swal from "sweetalert";
import axios from "axios";
import { FadeLoader } from "react-spinners";

// cutom components
import Router from "../router/Router";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import HomePage from "../pages/HomePage";
import AppLayout from "./AppLayout";
import AdminLoginPage from "../pages/admin/AdminLoginPage";
import AdminHomePage from "../pages/admin/AdminHomePage";
import AddCandidate from "../pages/admin/AddCandidate";
import AddVoter from "../pages/admin/AddVoter";
import CandidateDetails from "../pages/admin/CandidateDetails";
import DeclareResults from "../pages/admin/DeclareResults";
import ManageElections from "../pages/admin/ManageElections";
import VerifyCandidate from "../pages/admin/VerifyCandidate";
import VoterLoginPage from "../pages/voter/VoterLoginPage";
import VoterHomePage from "../pages/voter/VoterHomePage";

export {
  VoterHomePage,
  AddCandidate,
  AddVoter,
  CandidateDetails,
  DeclareResults,
  ManageElections,
  VerifyCandidate,
  AdminHomePage,
  AdminLoginPage,
  AppLayout,
  SideBar,
  Header,
  FadeLoader,
  VoterLoginPage,
  swal,
  axios,
  Container,
  HomePage,
  Router,
  useState,
  useEffect,
  ReactDOM,
  TextField,
  Box,
  Toolbar,
  Typography,
  AppBar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Popover,
  BrowserRouter,
  useNavigate,
  useLocation,
  Navigate,
  Link,
  NavLink,
  Routes,
  Route,
  Outlet,
  RouterProvider,
};
