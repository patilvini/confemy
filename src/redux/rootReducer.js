import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import alertReducer from "./alert/alertReducer";
import authReducer from "./auth/authReducer";
import messageReducer from "./message/messageReducer";
import profileReducer from "./profile/profileReducer";

import myOrganizationsReducer from "./organization/myOrganizationsReducer";
import organizationReducer from "./organization/organizationReducer";
import conferenceReducer from "./conference/conferenceReducer";
import userReducer from "./user-profile/userProfileReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["profile"],
};

const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  message: messageReducer,
  profile: profileReducer,
  myOrganizations: myOrganizationsReducer,
  organization: organizationReducer,
  conference: conferenceReducer,
  userProfile: userReducer,
});

export default persistReducer(persistConfig, rootReducer);

// import { combineReducers } from 'redux';
// import alertReducer from './alert/alertReducer';
// import authReducer from './auth/authReducer';
// import messageReducer from './message/messageReducer';
// import profileReducer from './profile/profileReducer';

// export default combineReducers({
//   alert: alertReducer,
//   auth: authReducer,
//   message: messageReducer,
//   profile: profileReducer,
// });
