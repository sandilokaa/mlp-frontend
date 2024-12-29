import React from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { PeriodProvider } from "./PeriodProvider";

import "bootstrap/dist/css/bootstrap.min.css";

import LecturerLogin from "./pages/auth/LecturerLogin";
import LecturerProfile from "./pages/lecturer/lecturer-profile/LecturerProfile";
import UpdateLecturerProfile from "./pages/lecturer/lecturer-profile/UpdateLecturerProfile";

import LectureDevotion from "./pages/lecturer/lecturer-devotion/Devotion";
import AddDevotion from "./pages/lecturer/lecturer-devotion/AddDevotion";
import UpdateDevotion from "./pages/lecturer/lecturer-devotion/UpdateDevotion";
import DevotionDetail from "./pages/lecturer/lecturer-devotion/DevotionDetail";

import LecturerResearch from "./pages/lecturer/lecturer-research/Research";
import AddResearch from "./pages/lecturer/lecturer-research/AddResearch";
import ResearchDetail from "./pages/lecturer/lecturer-research/ResearchDetail";
import UpdateResearch from "./pages/lecturer/lecturer-research/UpdateResearch";

import LecturerPublication from "./pages/lecturer/lecturer-publication/Publication";
import PublicationDetail from "./pages/lecturer/lecturer-publication/PublicationDetail";
import AddPublication from "./pages/lecturer/lecturer-publication/AddPublication";
import UpdatePublication from "./pages/lecturer/lecturer-publication/UpdatePublication";

import LecturerPatent from "./pages/lecturer/lecturer-patent/Patent";
import PatentDetail from "./pages/lecturer/lecturer-patent/PatentDetail";
import AddPatent from "./pages/lecturer/lecturer-patent/AddPatent";
import UpdatePatent from "./pages/lecturer/lecturer-patent/UpdatePatent";

import LecturerIPRight from "./pages/lecturer/lecturer-ipright/IPRight";
import AddIPRight from "./pages/lecturer/lecturer-ipright/AddIPRight";
import IPRightDetail from "./pages/lecturer/lecturer-ipright/IPRightDetail";
import UpdateIPRight from "./pages/lecturer/lecturer-ipright/UpdateIPRight";

import LectureListGroup from "./pages/lecturer/lecturer-list/LecturerList";
import OtherLecturerDetail from "./pages/lecturer/lecturer-list/LecturerDetail";

import SuperadminLogin from "./pages/auth/SuperadminLogin";

import ExpertiseGroupDevotion from "./pages/superadmin/expertise-group/devotion/Devotion";
import ExpertiseGroupDevotionDetail from "./pages/superadmin/expertise-group/devotion/DevotionDetail";

import ExpertiseGroupLecturerList from "./pages/superadmin/expertise-group/lecturer-list/LecturerList";
import ExpertiseGroupAddLecturer from "./pages/superadmin/expertise-group/lecturer-list/AddLecturer";
import ExpertiseGroupLectureDetail from "./pages/superadmin/expertise-group/lecturer-list/LecturerDetail";

import ExpertiseGroupProfile from "./pages/superadmin/expertise-group/profile/Profile";
import ExpertiseGroupUpdateProfile from "./pages/superadmin/expertise-group/profile/UpdateProfile";

import ExpertiseGroupReport from "./pages/superadmin/expertise-group/report/Report";
import ExpertiseGroupAddReport from "./pages/superadmin/expertise-group/report/AddReport";
import ExpertiseGroupDetailReport from "./pages/superadmin/expertise-group/report/DetailReport";
import ExpertiseGroupUpdateReport from "./pages/superadmin/expertise-group/report/UpdateReport";

import ExpertiseGroupResearch from "./pages/superadmin/expertise-group/research/Research";
import ExpertiseGroupResearchDetail from "./pages/superadmin/expertise-group/research/ResearchDetail";

import ExpertiseGroupPublication from "./pages/superadmin/expertise-group/publication/Publication";
import ExpertiseGroupPublicationDetail from "./pages/superadmin/expertise-group/publication/PublicationDetail";

import ExpertiseGroupPatent from "./pages/superadmin/expertise-group/patent/Patent";
import ExpertiseGroupPatentDetail from "./pages/superadmin/expertise-group/patent/PatentDetail";

import ExpertiseGroupIPRight from "./pages/superadmin/expertise-group/ipright/IPRight";
import ExpertiseGroupIPRightDetail from "./pages/superadmin/expertise-group/ipright/IPRightDetail";

import ExpertiseGroupDashboard from "./pages/superadmin/expertise-group/dashboard/Dashboard";

import DeanDashboard from "./pages/superadmin/faculty-dean/dashboard/Dashboard";

import DeanProfile from "./pages/superadmin/faculty-dean/profile/Profile";
import DeanUpdateProfile from "./pages/superadmin/faculty-dean/profile/UpdateProfile";

import DeanLecturerList from "./pages/superadmin/faculty-dean/lecturer-list/LecturerList";
import DeanLecturerDetail from "./pages/superadmin/faculty-dean/lecturer-list/LecturerDetail";

import DeanReport from "./pages/superadmin/faculty-dean/report/Report";
import DeanReportDetail from "./pages/superadmin/faculty-dean/report/ReportDetail";

const roots = document.getElementById("root");
const root = createRoot(roots);

root.render(
  <PeriodProvider>
    <Router>
      <SnackbarProvider maxSnack={3}>
        <Routes>
          <Route path="/" element={<Navigate to="/lecturer/login" replace />} />

          <Route path="/lecturer/login" element={<LecturerLogin />}></Route>
          <Route path="/lecturer/profile" element={<LecturerProfile />}></Route>

          <Route
            path="/lecturer/devotion"
            element={<LectureDevotion />}
          ></Route>
          <Route
            path="/lecturer/devotion/create"
            element={<AddDevotion />}
          ></Route>
          <Route path="/lecturer/devotion/update/" element={<UpdateDevotion />}>
            <Route path=":id" element={<UpdateDevotion />} />
          </Route>
          <Route path="/lecturer/devotion/detail/" element={<DevotionDetail />}>
            <Route path=":id" element={<DevotionDetail />} />
          </Route>

          <Route
            path="/lecturer/profile/update"
            element={<UpdateLecturerProfile />}
          >
            <Route path=":id" element={<UpdateLecturerProfile />} />
          </Route>

          <Route
            path="/lecturer/research"
            element={<LecturerResearch />}
          ></Route>
          <Route
            path="/lecturer/research/create"
            element={<AddResearch />}
          ></Route>
          <Route
            path="/lecturer/research/detail/"
            element={<ResearchDetail />}
          >
            <Route path=":id" element={<ResearchDetail />} />
          </Route>
          <Route
            path="/lecturer/research/update/"
            element={<UpdateResearch />}
          >
            <Route path=":id" element={<UpdateResearch />} />
          </Route>

          <Route
            path="/lecturer/publication"
            element={<LecturerPublication />}
          ></Route>
          <Route
            path="/lecturer/publication/detail/"
            element={<PublicationDetail />}
          >
            <Route path=":id" element={<PublicationDetail />} />
          </Route>
          <Route
            path="/lecturer/publication/create"
            element={<AddPublication />}
          ></Route>
          <Route
            path="/lecturer/publication/update/"
            element={<UpdatePublication />}
          >
            <Route path=":id" element={<UpdatePublication />} />
          </Route>

          <Route
            path="/lecturer/patent"
            element={<LecturerPatent />}
          ></Route>
          <Route
            path="/lecturer/patent/detail/"
            element={<PatentDetail />}
          >
            <Route path=":id" element={<PatentDetail />} />
          </Route>
          <Route
            path="/lecturer/patent/create"
            element={<AddPatent />}
          ></Route>
          <Route
            path="/lecturer/patent/update/"
            element={<UpdatePatent />}
          >
            <Route path=":id" element={<UpdatePatent />} />
          </Route>

          <Route
            path="/lecturer/ipright"
            element={<LecturerIPRight />}
          ></Route>
          <Route
            path="/lecturer/ipright/detail/"
            element={<IPRightDetail />}
          >
            <Route path=":id" element={<IPRightDetail />} />
          </Route>
          <Route
            path="/lecturer/ipright/create"
            element={<AddIPRight />}
          ></Route>
          <Route
            path="/lecturer/ipright/update/"
            element={<UpdateIPRight />}
          >
            <Route path=":id" element={<UpdateIPRight />} />
          </Route>

          <Route path="/lecturer/list" element={<LectureListGroup />}></Route>
          <Route
            path="/lecturer/list/detail/"
            element={<OtherLecturerDetail />}
          >
            <Route path=":id" element={<OtherLecturerDetail />} />
          </Route>

          <Route path="/superadmin/login" element={<SuperadminLogin />}></Route>

          <Route
            path="/expertisegroup/devotion"
            element={<ExpertiseGroupDevotion />}
          ></Route>
          <Route
            path="/expertisegroup/devotion/detail/"
            element={<ExpertiseGroupDevotionDetail />}
          >
            <Route path=":id" element={<ExpertiseGroupDevotionDetail />} />
          </Route>

          <Route
            path="/expertisegroup/research"
            element={<ExpertiseGroupResearch />}
          ></Route>
          <Route
            path="/expertisegroup/research/detail/"
            element={<ExpertiseGroupResearchDetail />}
          >
            <Route path=":id" element={<ExpertiseGroupResearchDetail />} />
          </Route>

          <Route
            path="/expertisegroup/publication"
            element={<ExpertiseGroupPublication />}
          ></Route>
          <Route
            path="/expertisegroup/publication/detail/"
            element={<ExpertiseGroupPublicationDetail />}
          >
            <Route path=":id" element={<ExpertiseGroupPublicationDetail />} />
          </Route>

          <Route
            path="/expertisegroup/patent"
            element={<ExpertiseGroupPatent />}
          ></Route>
          <Route
            path="/expertisegroup/patent/detail/"
            element={<ExpertiseGroupPatentDetail />}
          >
            <Route path=":id" element={<ExpertiseGroupPatentDetail />} />
          </Route>

          <Route
            path="/expertisegroup/ipright"
            element={<ExpertiseGroupIPRight />}
          ></Route>
          <Route
            path="/expertisegroup/ipright/detail/"
            element={<ExpertiseGroupIPRightDetail />}
          >
            <Route path=":id" element={<ExpertiseGroupIPRightDetail />} />
          </Route>

          <Route
            path="/expertisegroup/dashboard"
            element={<ExpertiseGroupDashboard />}
          ></Route>

          <Route
            path="/expertisegroup/lecturer/list"
            element={<ExpertiseGroupLecturerList />}
          ></Route>
          <Route
            path="/expertisegroup/lecturer/create"
            element={<ExpertiseGroupAddLecturer />}
          ></Route>
          <Route
            path="/expertisegroup/lecturer/detail/"
            element={<ExpertiseGroupLectureDetail />}
          >
            <Route path=":id" element={<ExpertiseGroupLectureDetail />} />
          </Route>

          <Route
            path="/expertisegroup/profile"
            element={<ExpertiseGroupProfile />}
          ></Route>
          <Route
            path="/expertisegroup/profile/update/"
            element={<ExpertiseGroupUpdateProfile />}
          >
            <Route path=":id" element={<ExpertiseGroupUpdateProfile />} />
          </Route>

          <Route
            path="/expertisegroup/report"
            element={<ExpertiseGroupReport />}
          ></Route>
          <Route
            path="/expertisegroup/report/create"
            element={<ExpertiseGroupAddReport />}
          ></Route>
          <Route
            path="/expertisegroup/report/detail/"
            element={<ExpertiseGroupDetailReport />}
          >
            <Route path=":id" element={<ExpertiseGroupDetailReport />} />
          </Route>
          <Route
            path="/expertisegroup/report/update/"
            element={<ExpertiseGroupUpdateReport />}
          >
            <Route path=":id" element={<ExpertiseGroupUpdateReport />} />
          </Route>

          <Route
            path="/dean/dashboard"
            element={<DeanDashboard />}
          ></Route>

          <Route path="/dean/profile" element={<DeanProfile />}></Route>
          <Route path="/dean/profile/update/" element={<DeanUpdateProfile />}>
            <Route path=":id" element={<DeanUpdateProfile />} />
          </Route>

          <Route
            path="/dean/lecturer/list"
            element={<DeanLecturerList />}
          ></Route>
          <Route path="/dean/lecturer/detail/" element={<DeanLecturerDetail />}>
            <Route path=":id" element={<DeanLecturerDetail />} />
          </Route>

          <Route path="/dean/report" element={<DeanReport />}></Route>
          <Route path="/dean/report/detail/" element={<DeanReportDetail />}>
            <Route path=":id" element={<DeanReportDetail />} />
          </Route>

        </Routes>
      </SnackbarProvider>
    </Router>
  </PeriodProvider>
);
