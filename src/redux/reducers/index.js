import { combineReducers } from "redux";
import login from "./login";
import chart from "./chart";
import user from "./user";
import products from "./products";
import search from "./search";

const reducers = combineReducers({
  login: login,
  chart: chart,
  user: user,
  products: products,
  search: search,
});

export default reducers;
