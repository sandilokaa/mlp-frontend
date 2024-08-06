import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import "bootstrap/dist/css/bootstrap.min.css";

import LecturerLogin from "./pages/auth/LecturerLogin";
import LecturerDashboard from "./pages/dashboard/LecturerDashboard";
import LecturerProfile from "./pages/lecturer/lecturer-profile/LecturerProfile";
import LectureResearch from "./pages/lecturer/lecturer-research/Research";
import AddResearch from "./pages/lecturer/lecturer-research/AddResearch";
import UpdateResearch from "./pages/lecturer/lecturer-research/UpdateResearch";
import UpdateLecturerProfile from "./pages/lecturer/lecturer-profile/UpdateLecturerProfile";
import LecturerDetailResearch from "./pages/lecturer/lecturer-research/DetailResearch";

import SuperadminLogin from "./pages/auth/SuperadminLogin";
import SuperadminDashboard from "./pages/dashboard/SuperadminDashboard";
import SuperadminResearch from "./pages/superadmin/superadmin-research/SuperadminResearch";

const roots = document.getElementById("root");
const root = createRoot(roots);

root.render(
  <Router>
    <SnackbarProvider maxSnack={3}>
      <Routes>
        <Route path="/" element={<Navigate to="/lecturer/dashboard" replace />} />
        
        <Route path="/lecturer/dashboard" element={<LecturerDashboard />}></Route>
        <Route path="/lecturer/login" element={<LecturerLogin />}></Route>
        <Route path="/lecturer/profile" element={<LecturerProfile />}></Route>
        <Route path="/lecturer/research" element={<LectureResearch />}></Route>
        <Route path="/lecturer/research/create" element={<AddResearch />}></Route>
        <Route path="/lecturer/research/update/" element={<UpdateResearch />}>
          <Route path=":id" element={<UpdateResearch />}/>
        </Route>
        <Route path="/lecturer/research/detail/" element={<LecturerDetailResearch />}>
          <Route path=":id" element={<LecturerDetailResearch />}/>
        </Route>
        <Route path="/lecturer/profile/update" element={<UpdateLecturerProfile />}>
          <Route path=":id" element={<UpdateLecturerProfile />}/>
        </Route>

        <Route path="/superadmin/login" element={<SuperadminLogin />}></Route>
        <Route path="/superadmin/dashboard" element={<SuperadminDashboard />}></Route>
        <Route path="/superadmin/research" element={<SuperadminResearch />}></Route>
      </Routes>
    </SnackbarProvider>
  </Router>
);