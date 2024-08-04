import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import LecturerProfile from "./pages/lecturer-profile/LecturerProfile";
import Research from "./pages/research/Research";
import AddResearch from "./pages/research/AddResearch";

const roots = document.getElementById("root");
const root = createRoot(roots);

root.render(
  <Router>
    <SnackbarProvider maxSnack={3}>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/lecturer-profile" element={<LecturerProfile />}></Route>
        <Route path="/research" element={<Research />}></Route>
        <Route path="/add-research" element={<AddResearch />}></Route>
      </Routes>
    </SnackbarProvider>
  </Router>
);