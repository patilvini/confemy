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
import ConfLiveStreamPage from "./pages/create-conference-pages/ConfLiveStreamPage";
import ConfTicketsPage from "./pages/create-conference-pages/ConfTicketsPage";
import ConfPreviewPage from "./pages/create-conference-pages/ConfPreviewPage";

import MyPrivateRoute from "./components/routing/MyPrivateRoute";
import PrivateAttendeeRoute from "./components/routing/PrivateAttendeeRoute";
import PrivateOrganizerRoute from "./components/routing/PrivateOrganizerRoute";
import CreateConfLayoutPage from "./pages/layout-pages/CreateConfLayoutPage";
import DashboardLayoutPage from "./pages/layout-pages/DashboardLayoutPage";
import { loadUserAction } from "./redux/auth/authAction";
import "./App.scss";
import CreateOrganizationPage from "./pages/organization-pages/CreateOrganizationPage";
import VerifyManagerPage from "./pages/verify-manager-page/VerifyManagerPage";
import MyOrganizationsPage from "./pages/organization-pages/MyOrganizationsPage";
import OrganizationDetailsPage from "./pages/organization-pages/OrganizationDetailsPage";

// import MyOrganizationDetails from "./components/organization/MyOrganizationDetails";
import SearchPage from "./pages/search-page/SearchPage";
import ConfDetailsPage from "./pages/conference-page/ConfDetailsPage";

import UserProfilePage from "./pages/user-profile-page/UserProfilePage";
import OrganizerConfDashPage from "./pages/organizer-conf-dashboard-page/OrganizerConfDashPage";
import OrganizerConfPreviewPage from "./pages/organizer-conf-dashboard-page/OrganizerConfPreviewPage";
import CreditRequestsPage from "./pages/organizer-conf-dashboard-page/CreditRequestsPage";
import RefundRequestsPage from "./pages/organizer-conf-dashboard-page/RefundRequestsPage";
import EarningsPage from "./pages/organizer-conf-dashboard-page/EarningsPage";
import UserViewProfilePage from "./pages/org-profile-userView-page/UserViewProfilepage";
import OrganizerConfPreviewFinishedPage from "./pages/organizer-conf-dashboard-page/OrganizerConfPreviewFinishedPage";
import TrackCreditPage from "./pages/track-credit-page/TrackCreditPage";
import ListConferencesPage from "./pages/track-credit-page/ListConferencesPage";
import MyConfsPage from "./pages/my-confs-page/MyConfsPage";

import PNavbar from "./components/navbar/PNavbar";
import EditorContainer from "./components/create-conference/EditorContainer";
import BookingPage from "./pages/booking-page/BookingPage";
import Tabs from "./components/tabs-demo/Tabs";
import TabsDemo2 from "./components/tabs-demo/TabsDemo2";
import TabsDemoPage1 from "./components/tabs-demo/TabsDemoPage1";
import TabsDemoPage2 from "./components/tabs-demo/TabsDemoPage2";
import Page1Subpage from "./components/tabs-demo/Page1Subpage";
import Passes from "./components/user-profile/Passes";
import SavedConfs from "./components/user-profile/SavedConfs";
import Credits from "./components/user-profile/Credits";
import AccountSettings from "./components/user-settings/AccountSettings";
import UserProfileLayoutPage from "./pages/layout-pages/UserProfileLayoutPage";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUserAction());
  }, []);

  return (
    <PersistGate persistor={persistor}>
      <Fragment>
        <BrowserRouter>
          <PNavbar />
          <Alert />
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/signin" element={<SigninPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route
              path="/verify-email/:secret"
              element={<VerifyEmail />}
            ></Route>
            <Route path="search-conference" element={<SearchPage />}></Route>
            <Route
              path="search-conference/:confId"
              element={<ConfDetailsPage />}
            ></Route>

            <Route
              path="user-profile"
              element={
                <MyPrivateRoute>
                  <UserProfileLayoutPage />
                </MyPrivateRoute>
              }
            >
              <Route path="tickets" element={<Passes />} />
              <Route path="saved-conference" element={<SavedConfs />} />
              <Route path="credits" element={<Credits />} />
              <Route path="account-settings" element={<AccountSettings />} />
              <Route
                index={true}
                element={<Navigate to="./tickets" replace />}
              ></Route>
            </Route>

            <Route path="track-credits" element={<TrackCreditPage />}></Route>
            <Route
              path="list-conferences"
              element={<ListConferencesPage />}
            ></Route>
            <Route path="user-view" element={<UserViewProfilePage />}></Route>
            <Route
              path="organizer-preview/finished/:id"
              element={<OrganizerConfPreviewFinishedPage />}
            ></Route>
            <Route path="/message" element={<MessagePage />}></Route>
            <Route
              path="book-conference/:confId"
              element={
                <MyPrivateRoute>
                  <BookingPage />
                </MyPrivateRoute>
              }
            ></Route>
            <Route
              path="dashboard"
              element={
                <MyPrivateRoute>
                  <DashboardLayoutPage />
                </MyPrivateRoute>
              }
            >
              <Route path="test/:active_tab" element={<Tabs />} />
              <Route path="test2" element={<TabsDemo2 />}>
                <Route path="page1" element={<TabsDemoPage1 />} />
                <Route path="page1/:pageId" element={<Page1Subpage />} />
                <Route path="page2" element={<TabsDemoPage2 />} />
                <Route
                  index={true}
                  element={<Navigate to="./page1" replace />}
                ></Route>
              </Route>
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
                <Route path="step-4" element={<ConfLiveStreamPage />}></Route>
                <Route path="step-5" element={<ConfTicketsPage />}></Route>
                <Route path="step-6" element={<ConfPreviewPage />}></Route>
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
              <Route path="my-conferences" element={<MyConfsPage />}></Route>
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
          </Routes>
          <Footer />
        </BrowserRouter>
      </Fragment>
    </PersistGate>
  );
};

export default App;
