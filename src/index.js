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
import SuperadminDetailResearch from "./pages/superadmin/superadmin-research/DetailResearch";
import SuperadminLecturerList from "./pages/superadmin/superadmin-lecturer-list/LecturerList";
import SuperadminAddLecturer from "./pages/superadmin/superadmin-lecturer-list/AddLecturer";
import SuperadminProfile from "./pages/superadmin/superadmin-profile/SuperadminProfile";
import SuperadminUpdateProfile from "./pages/superadmin/superadmin-profile/UpdateSuperadminProfile";
import SuperadminReport from "./pages/superadmin/superadmin-report/Report";
import SuperadminAddReport from "./pages/superadmin/superadmin-report/AddReport";
import SuperadminDetailReport from "./pages/superadmin/superadmin-report/DetailReport";
import SuperadminUpdateReport from "./pages/superadmin/superadmin-report/UpdateReport";

const roots = document.getElementById("root");
const root = createRoot(roots);

root.render(
  <Router>
    <SnackbarProvider maxSnack={3}>
      <Routes>
        <Route path="/" element={<Navigate to="/lecturer/login" replace />} />
        
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
        <Route path="/superadmin/research/detail/" element={<SuperadminDetailResearch />}>
          <Route path=":id" element={<SuperadminDetailResearch />}/>
        </Route>
        <Route path="/superadmin/lecturer/list" element={<SuperadminLecturerList />}></Route>
        <Route path="/superadmin/lecturer/create" element={<SuperadminAddLecturer />}></Route>
        <Route path="/superadmin/profile" element={<SuperadminProfile />}></Route>
        <Route path="/superadmin/profile/update/" element={<SuperadminUpdateProfile />}>
          <Route path=":id" element={<SuperadminUpdateProfile />}/>
        </Route>
        <Route path="/superadmin/report" element={<SuperadminReport />}></Route>
        <Route path="/superadmin/report/create" element={<SuperadminAddReport />}></Route>
        <Route path="/superadmin/report/detail/" element={<SuperadminDetailReport />}>
          <Route path=":id" element={<SuperadminDetailReport />}/>
        </Route>
        <Route path="/superadmin/report/update/" element={<SuperadminUpdateReport />}>
          <Route path=":id" element={<SuperadminUpdateReport />}/>
        </Route>
      </Routes>
    </SnackbarProvider>
  </Router>
);