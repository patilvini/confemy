import React, { Fragment, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
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
import CreateConfLandingPage from "./pages/create-conference-pages/CreateConfLandingPage";
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

// import MyOrganizationDetails from "./components/organization/MyOrganizationDetails";
import SearchConferencePage from "./pages/search-conference-page/SearchConference";
import SearchConfSelectPage from "./pages/booking-page/SearchConfSelectPage";
import BookingStep1Page from "./pages/booking-page/BookingStep1Page";
import BookingStep2Page from "./pages/booking-page/BookingStep2Page";
import UserProfilePage from "./pages/user-profile-page/UserProfilePage";
import OrganizerConfDashPage from "./pages/organizer-conf-dashboard-page/OrganizerConfDashPage";
import OrganizerConfPreviewPage from "./pages/organizer-conf-dashboard-page/OrganizerConfPreviewPage";
import CreditRequestsPage from "./pages/organizer-conf-dashboard-page/CreditRequestsPage";
import RefundRequestsPage from "./pages/organizer-conf-dashboard-page/RefundRequestsPage";
import EarningsPage from "./pages/organizer-conf-dashboard-page/EarningsPage";
import UserViewProfilePage from "./pages/org-profile-userView-page/UserViewProfilepage";
import OrganizerConfPreviewFinishedPage from "./pages/organizer-conf-dashboard-page/OrganizerConfPreviewFinishedPage";
import EditorContainer from "./components/conference/EditorContainer";
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
            <Route path="/test" element={<EditorContainer />} />
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/signin" element={<SigninPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route
              path="/verify-email/:secret"
              element={<VerifyEmail />}
            ></Route>
            <Route
              path="search-conference"
              element={<SearchConferencePage />}
            ></Route>
            <Route
              path="search-conference/:confID"
              element={<SearchConfSelectPage />}
            ></Route>

            <Route
              path="booking-step1/:confID"
              element={<BookingStep1Page />}
            ></Route>
            <Route
              path="booking-step2/:bookingID"
              element={<BookingStep2Page />}
            ></Route>

            <Route path="user-profile" element={<UserProfilePage />}></Route>

            <Route path="user-view" element={<UserViewProfilePage />}></Route>

            <Route
              path="organizer-preview/finished/:id"
              element={<OrganizerConfPreviewFinishedPage />}
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
                element={<CreateConfLandingPage />}
              ></Route>

              <Route path="create-conf" element={<CreateConfLayoutPage />}>
                <Route
                  path=""
                  element={<Navigate to="step-1" replace />}
                ></Route>
                <Route path="step-1" element={<ConfBasicInfoPage />}></Route>
                <Route path="step-2" element={<ConfDetailsPage1 />}></Route>
                <Route path="step-3" element={<ConfDetailsPage2 />}></Route>
                <Route path="step-4" element={<LiveStreamPage />}></Route>
                <Route path="step-5" element={<TicketsPage />}></Route>
                <Route path="step-6" element={<PreviewPublishPage />}></Route>
              </Route>
              <Route
                path="create-organization"
                element={<CreateOrganizationPage />}
              ></Route>
              <Route path="refunds" element={<RefundRequestsPage />}></Route>
              <Route path="earnings" element={<EarningsPage />}></Route>
              <Route
                path="credit-requests"
                element={<CreditRequestsPage />}
              ></Route>
              <Route
                path="my-conferences"
                element={<OrganizerConfDashPage />}
              ></Route>
              <Route
                path="my-conferences/live/:id"
                element={<OrganizerConfPreviewPage />}
              ></Route>
              <Route
                path="my-conferences/finished/:id"
                element={<OrganizerConfPreviewFinishedPage />}
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
