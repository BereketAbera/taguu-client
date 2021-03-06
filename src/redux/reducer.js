import { combineReducers } from "@reduxjs/toolkit";
import accountReducer from "./reducers/accountReducer";
import counterReducer from "./reducers/counter";
import videoReducer from "./reducers/videoReducer";

export default combineReducers({
  video: videoReducer,
  counter: counterReducer,
  account: accountReducer,
});
