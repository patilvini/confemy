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
import ConfBasicInfo from "./components/conference/ConfBasicInfo";

import PrivateAttendeeRoute from "./components/routing/PrivateAttendeeRoute";
import PrivateOrganizerRoute from "./components/routing/PrivateOrganizerRoute";
import CreateConfLayoutPage from "./pages/layout-pages/CreateConfLayoutPage";
import { loadUserAction } from "./redux/auth/authAction";
import "./App.scss";

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
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/signin" element={<SigninPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route
              path="/verify-email/:secret"
              element={<VerifyEmail />}
            ></Route>
            <Route path="/message" element={<MessagePage />}></Route>
            <Route path="/create-conference" element={<CreateConfLayoutPage />}>
              <Route path="" element={<ConfBasicInfo />}></Route>
            </Route>
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
