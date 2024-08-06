import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import "bootstrap/dist/css/bootstrap.min.css";

import LecturerLogin from "./pages/auth/LecturerLogin";
import LecturerDashboard from "./pages/dashboard/LecturerDashboard";
import LecturerProfile from "./pages/lecturer-profile/LecturerProfile";
import Research from "./pages/research/Research";
import AddResearch from "./pages/research/AddResearch";
import UpdateResearch from "./pages/research/UpdateResearch";
import UpdateLecturerProfile from "./pages/lecturer-profile/UpdateLecturerProfile";

const roots = document.getElementById("root");
const root = createRoot(roots);

root.render(
  <Router>
    <SnackbarProvider maxSnack={3}>
      <Routes>
        <Route path="/" element={<Navigate to="/lecturer-dashboard" replace />} />
        <Route path="/lecturer-dashboard" element={<LecturerDashboard />}></Route>
        <Route path="/lecturer-login" element={<LecturerLogin />}></Route>
        <Route path="/lecturer-profile" element={<LecturerProfile />}></Route>
        <Route path="/research" element={<Research />}></Route>
        <Route path="/add-research" element={<AddResearch />}></Route>
        <Route path="/update-research/" element={<UpdateResearch />}>
          <Route path=":id" element={<UpdateResearch />}/>
        </Route>
        <Route path="/update-lecturer-profile/" element={<UpdateLecturerProfile />}>
          <Route path=":id" element={<UpdateLecturerProfile />}/>
        </Route>
      </Routes>
    </SnackbarProvider>
  </Router>
);