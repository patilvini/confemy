import React, { Fragment, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import HomePage from "./pages/home-page/HomePage";
import SigninPage from "./pages/signin-page/SigninPage";
import RegisterPage from "./pages/register-page/RegisterPage";
import VerifyEmail from "./components/verify-email/VerifyEmail";
import Alert from "./components/alert/Alert";
import MessagePage from "./pages/message-page/MessagePage";
import AttendeeDashboardPage from "./pages/attendee-dashboard-page/AttendeeDashboardPage";
import AttendeeProfilePage from "./pages/attandee-profile-page/AttendeeProfilePage";
import CreateAttendeeProfilePage from "./pages/attandee-profile-page/CreateAttendeeProfilePage";
import EditAttendeeProfilePage from "./pages/attandee-profile-page/EditAttendeeProfilePage";
import OrganizerDashboardPage from "./pages/organizer-dashboard-page/OrganizerDashboardPage";
import OrganizerProfilePage from "./pages/organizer-profile-page/OrganizerProfilePage";
import CreateOrganizerProfilePage from "./pages/organizer-profile-page/CreateOrganizerProfilePage";
import EditOrganizerProfilePage from "./pages/organizer-profile-page/EditOrganizerProfilePage";
import ConfBasicInfoPage from "./pages/create-conference-pages/ConfBasicInfoPage";
import ConfDetailsPage1 from "./pages/create-conference-pages/ConfDetailsPage1";
import ConfDetailsPage2 from "./pages/create-conference-pages/ConfDetailsPage2";
import LiveStreamPage from "./pages/create-conference-pages/LiveStreamPage";
import TicketsPage from "./pages/create-conference-pages/TicketsPage";
import OCreateConference from "./components/conference/OCreateConference";
import PreviewPublishPage from "./pages/create-conference-pages/PreviewPublishPage";

import MyPrivateRoute from "./components/routing/MyPrivateRoute";
import PrivateAttendeeRoute from "./components/routing/PrivateAttendeeRoute";
import PrivateOrganizerRoute from "./components/routing/PrivateOrganizerRoute";
import CreateConfLayoutPage from "./pages/layout-pages/CreateConfLayoutPage";
import DashboardLayoutPage from "./pages/layout-pages/DashboardLayoutPage";
import { loadUserAction } from "./redux/auth/authAction";
import "./App.scss";
import CreateOrgs from "./pages/organizer-profile-page/CreateOrgs";
import CreateOrganizationPage from "./pages/organization-pages/CreateOrganizationPage";
import VerifyManagerPage from "./pages/verify-manager-page/VerifyManagerPage";
import MyOrganizationsPage from "./pages/organization-pages/MyOrganizationsPage";
import OrganizationDetailsPage from "./pages/organization-pages/OrganizationDetailsPage";
const App = () => {
  useEffect(() => {
    store.dispatch(loadUserAction());
  }, []);

  return (
    <PersistGate persistor={persistor}>
      <Fragment>
        <BrowserRouter>
          <Navbar />
          <Alert />
          <Routes>
            <Route path="/test" element={<OCreateConference />} />
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/signin" element={<SigninPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route
              path="/verify-email/:secret"
              element={<VerifyEmail />}
            ></Route>
            <Route path="/message" element={<MessagePage />}></Route>
            <Route
              path="dashboard"
              element={
                <MyPrivateRoute>
                  <DashboardLayoutPage />
                </MyPrivateRoute>
              }
            >
              <Route
                path="create-conference"
                element={<CreateConfLayoutPage />}
              >
                <Route path="" element={<ConfBasicInfoPage />}></Route>
                <Route path="details-1" element={<ConfDetailsPage1 />}></Route>
                <Route path="details-2" element={<ConfDetailsPage2 />}></Route>
                <Route path="live-stream" element={<LiveStreamPage />}></Route>
                <Route path="tickets" element={<TicketsPage />}></Route>
                <Route
                  path="preview-publish"
                  element={<PreviewPublishPage />}
                ></Route>
              </Route>
              <Route
                path="create-organization"
                element={<CreateOrganizationPage />}
              ></Route>
              <Route
                path="my-organizations"
                // element={<OrganizerDashboardPage />}
                element={<MyOrganizationsPage />}
              ></Route>
              <Route
                path="my-organizations/:organizationId"
                element={<OrganizationDetailsPage />}
              ></Route>
            </Route>
            <Route path="/verify/:token" element={<VerifyManagerPage />} />

            {/* <PrivateAttendeeRoute
              path="/attendee-dashboard"
              element={AttendeeDashboardPage}
            />
            <PrivateAttendeeRoute
              path="/attendee-dashboard/profile"
              element={AttendeeProfilePage}
            />
            <PrivateAttendeeRoute
              path="/attendee-dashboard/create-attendee-profile"
              element={CreateAttendeeProfilePage}
            />
            <PrivateAttendeeRoute
              path="/attendee-dashboard/edit-attendee-profile"
              element={EditAttendeeProfilePage}
            />
            <PrivateOrganizerRoute
              path="/organizer-dashboard"
              element={OrganizerDashboardPage}
            />
            <PrivateOrganizerRoute
              path="/organizer-dashboard/profile"
              element={OrganizerProfilePage}
            />
            <PrivateOrganizerRoute
              path="/organizer-dashboard/create-organizer-profile"
              element={CreateOrganizerProfilePage}
            />
            <PrivateOrganizerRoute
              path="/organizer-dashboard/edit-organizer-profile"
              element={EditOrganizerProfilePage}
            />*/}
          </Routes>
          <Footer />
        </BrowserRouter>
      </Fragment>
    </PersistGate>
  );
};

export default App;
