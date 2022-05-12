import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import alertReducer from './alert/alertReducer';
import authReducer from './auth/authReducer';
import messageReducer from './message/messageReducer';
import profileReducer from './profile/profileReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['profile'],
};

const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  message: messageReducer,
  profile: profileReducer,
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
