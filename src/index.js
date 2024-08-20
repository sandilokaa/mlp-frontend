import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import "bootstrap/dist/css/bootstrap.min.css";

import LecturerLogin from "./pages/auth/LecturerLogin";
import LecturerDashboard from "./pages/dashboard/LecturerDashboard";
import LecturerProfile from "./pages/lecturer/lecturer-profile/LecturerProfile";
import LectureDevotion from "./pages/lecturer/lecturer-devotion/Devotion";
import AddDevotion from "./pages/lecturer/lecturer-devotion/AddDevotion";
import UpdateDevotion from "./pages/lecturer/lecturer-devotion/UpdateDevotion";
import UpdateLecturerProfile from "./pages/lecturer/lecturer-profile/UpdateLecturerProfile";
import DevotionDetail from "./pages/lecturer/lecturer-devotion/DevotionDetail";
import LecturerAssignment from "./pages/lecturer/lecturer-assignment/Assignment";
import AddAssignment from "./pages/lecturer/lecturer-assignment/AddAssignment";
import AssignmentDetail from "./pages/lecturer/lecturer-assignment/AssignmentDetail";
import UpdateAssignment from "./pages/lecturer/lecturer-assignment/UpdateAssignment";
import LectureListGroup from "./pages/lecturer/lecturer-list/LecturerList";
import OtherLecturerDetail from "./pages/lecturer/lecturer-list/LecturerDetail";

import SuperadminLogin from "./pages/auth/SuperadminLogin";
import SuperadminDashboard from "./pages/dashboard/SuperadminDashboard";

import ExpertiseGroupDevotion from "./pages/superadmin/expertise-group/devotion/Devotion";
import ExpertiseGroupDevotionDetail from "./pages/superadmin/expertise-group/devotion/DevosionDetail";
import ExpertiseGroupLecturerList from "./pages/superadmin/expertise-group/lecturer-list/LecturerList";
import ExpertiseGroupAddLecturer from "./pages/superadmin/expertise-group/lecturer-list/AddLecturer";
import ExpertiseGroupLectureDetail from "./pages/superadmin/expertise-group/lecturer-list/LecturerDetail";
import ExpertiseGroupProfile from "./pages/superadmin/expertise-group/profile/Profile";
import ExpertiseGroupUpdateProfile from "./pages/superadmin/expertise-group/profile/UpdateProfile";
import ExpertiseGroupReport from "./pages/superadmin/expertise-group/report/Report";
import ExpertiseGroupAddReport from "./pages/superadmin/expertise-group/report/AddReport";
import ExpertiseGroupDetailReport from "./pages/superadmin/expertise-group/report/DetailReport";
import ExpertiseGroupUpdateReport from "./pages/superadmin/expertise-group/report/UpdateReport";
import ExpertiseGroupAssignment from "./pages/superadmin/expertise-group/assignment/Assignment";
import ExpertiseGroupAssignmentDetail from "./pages/superadmin/expertise-group/assignment/AssignmentDetail";

import DeanProfile from "./pages/superadmin/faculty-dean/profile/Profile";
import DeanUpdateProfile from "./pages/superadmin/faculty-dean/profile/UpdateProfile";
import DeanLecturerList from "./pages/superadmin/faculty-dean/lecturer-list/LecturerList";
import DeanLecturerDetail from "./pages/superadmin/faculty-dean/lecturer-list/LecturerDetail";
import DeanReport from "./pages/superadmin/faculty-dean/report/Report";

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
        <Route path="/lecturer/devotion" element={<LectureDevotion />}></Route>
        <Route path="/lecturer/devotion/create" element={<AddDevotion />}></Route>
        <Route path="/lecturer/devotion/update/" element={<UpdateDevotion />}>
          <Route path=":id" element={<UpdateDevotion />}/>
        </Route>
        <Route path="/lecturer/devotion/detail/" element={<DevotionDetail />}>
          <Route path=":id" element={<DevotionDetail />}/>
        </Route>
        <Route path="/lecturer/profile/update" element={<UpdateLecturerProfile />}>
          <Route path=":id" element={<UpdateLecturerProfile />}/>
        </Route>
        <Route path="/lecturer/assignment" element={<LecturerAssignment />}></Route>
        <Route path="/lecturer/assignment/create" element={<AddAssignment />}></Route>
        <Route path="/lecturer/assignment/detail/" element={<AssignmentDetail />}>
          <Route path=":id" element={<AssignmentDetail />}/>
        </Route>
        <Route path="/lecturer/assignment/update/" element={<UpdateAssignment />}>
          <Route path=":id" element={<UpdateAssignment />}/>
        </Route>
        <Route path="/lecturer/list" element={<LectureListGroup />}></Route>
        <Route path="/lecturer/list/detail/" element={<OtherLecturerDetail />}>
          <Route path=":id" element={<OtherLecturerDetail />}/>
        </Route>

        <Route path="/superadmin/login" element={<SuperadminLogin />}></Route>
        <Route path="/superadmin/dashboard" element={<SuperadminDashboard />}></Route>

        <Route path="/expertisegroup/devotion" element={<ExpertiseGroupDevotion />}></Route>
        <Route path="/expertisegroup/devotion/detail/" element={<ExpertiseGroupDevotionDetail />}>
          <Route path=":id" element={<ExpertiseGroupDevotionDetail />}/>
        </Route>
        <Route path="/expertisegroup/assignment" element={<ExpertiseGroupAssignment />}></Route>
        <Route path="/expertisegroup/assignment/detail/" element={<ExpertiseGroupAssignmentDetail />}>
          <Route path=":id" element={<ExpertiseGroupAssignmentDetail />}/>
        </Route>
        <Route path="/expertisegroup/lecturer/list" element={<ExpertiseGroupLecturerList />}></Route>
        <Route path="/expertisegroup/lecturer/create" element={<ExpertiseGroupAddLecturer />}></Route>
        <Route path="/expertisegroup/lecturer/detail/" element={<ExpertiseGroupLectureDetail />}>
          <Route path=":id" element={<ExpertiseGroupLectureDetail />}/>
        </Route>
        <Route path="/expertisegroup/profile" element={<ExpertiseGroupProfile />}></Route>
        <Route path="/expertisegroup/profile/update/" element={<ExpertiseGroupUpdateProfile />}>
          <Route path=":id" element={<ExpertiseGroupUpdateProfile />}/>
        </Route>
        <Route path="/expertisegroup/report" element={<ExpertiseGroupReport />}></Route>
        <Route path="/expertisegroup/report/create" element={<ExpertiseGroupAddReport />}></Route>
        <Route path="/expertisegroup/report/detail/" element={<ExpertiseGroupDetailReport />}>
          <Route path=":id" element={<ExpertiseGroupDetailReport />}/>
        </Route>
        <Route path="/expertisegroup/report/update/" element={<ExpertiseGroupUpdateReport />}>
          <Route path=":id" element={<ExpertiseGroupUpdateReport />}/>
        </Route>

        <Route path="/dean/profile" element={<DeanProfile />}></Route>
        <Route path="/dean/profile/update/" element={<DeanUpdateProfile />}>
          <Route path=":id" element={<DeanUpdateProfile />}/>
        </Route>
        <Route path="/dean/lecturer/list" element={<DeanLecturerList />}></Route>
        <Route path="/dean/lecturer/detail/" element={<DeanLecturerDetail />}>
          <Route path=":id" element={<DeanLecturerDetail />}/>
        </Route>
        <Route path="/dean/report" element={<DeanReport />}></Route>

      </Routes>
    </SnackbarProvider>
  </Router>
);