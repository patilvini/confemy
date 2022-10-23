import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
import { persistStore } from "redux-persist";

const initialState = {};
const middleware = [thunk];

export const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export const persistor = persistStore(store);

const StoreAndPersistStore = { store, persistStore };

export default StoreAndPersistStore;

// import { createStore, applyMiddleware } from 're ,dux';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import thunk from 'redux-thunk';
// import rootReducer from './rootReducer';

// const initialState = {};
// const middleware = [thunk];

// const store = createStore(
//   rootReducer,
//   initialState,
//   composeWithDevTools(applyMiddleware(...middleware))
// );

// export default store;
