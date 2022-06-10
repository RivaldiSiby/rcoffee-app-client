import { combineReducers } from "redux";
import login from "./login";
import chart from "./chart";

const reducers = combineReducers({
  login: login,
  chart: chart,
});

export default reducers;
