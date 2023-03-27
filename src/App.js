import React, { Fragment, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

import Footer from "./components/footer/Footer";
import HomePage from "./pages/home-page/HomePage";
import SigninPage from "./pages/signin-page/SigninPage";
import RegisterPage from "./pages/register-page/RegisterPage";
import VerifyEmail from "./components/verify-email/VerifyEmail";
import Alert from "./components/alert/Alert";
import MessagePage from "./pages/message-page/MessagePage";
import CreateConfLandingPage from "./pages/create-conference-pages/CreateConfLandingPage";
import ConfBasicInfoPage from "./pages/create-conference-pages/ConfBasicInfoPage";
import ConfDetailsPage1 from "./pages/create-conference-pages/ConfDetailsPage1";
import ConfDetailsPage2 from "./pages/create-conference-pages/ConfDetailsPage2";
import ConfLiveStreamPage from "./pages/create-conference-pages/ConfLiveStreamPage";
import ConfTicketsPage from "./pages/create-conference-pages/ConfTicketsPage";
import ConfPreviewPage from "./pages/create-conference-pages/ConfPreviewPage";

import MyPrivateRoute from "./components/routing/MyPrivateRoute";
import CreateConfLayoutPage from "./pages/layout-pages/CreateConfLayoutPage";
import DashboardLayoutPage from "./pages/layout-pages/DashboardLayoutPage";
import { loadUserAction } from "./redux/auth/authAction";
import "./App.scss";
import CreateOrganizationPage from "./pages/organization-pages/CreateOrganizationPage";
import VerifyManagerPage from "./pages/verify-manager-page/VerifyManagerPage";
import MyOrganizationsPage from "./pages/organization-pages/MyOrganizationsPage";
import OrganizationDetailsPage from "./pages/organization-pages/OrganizationDetailsPage";

import SearchPage from "./pages/search-page/SearchPage";
import ConfDetailsPage from "./pages/conference-page/ConfDetailsPage";

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
import BookingPage from "./pages/booking-page/BookingPage";
import SavedConfs from "./components/user-profile/SavedConfs";
import Credits from "./components/user-profile/Credits";
import UserCredits from "./components/user-credits/UserCredits";
import AccountSettings from "./components/user-settings/AccountSettings";
import UserProfileLayoutPage from "./pages/layout-pages/UserProfileLayoutPage";
import UserTickets from "./components/tickets/UserTickets";
import ForgotPasswordPage from "./pages/forgot-password-page/ForgotPasswordPage";
import ResetPasswordPage from "./pages/reset-password-page/ResetPasswordPage";
import PrintTicket from "./components/tickets/PrintTicket";
import Receipt from "./components/tickets/Receipt";

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
            <Route path="/print-ticket" element={<PrintTicket />} />
            <Route path="/print-receipt" element={<Receipt />} />

            <Route path="/" element={<HomePage />}></Route>
            <Route path="/signin" element={<SigninPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route
              path="/forgot-password"
              element={<ForgotPasswordPage />}
            ></Route>
            <Route path="/reset/:secret" element={<ResetPasswordPage />} />

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
              <Route path="tickets" element={<UserTickets />} />
              <Route path="saved-conference" element={<SavedConfs />} />
              <Route path="credits" element={<UserCredits />} />
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
