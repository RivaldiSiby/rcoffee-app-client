import { legacy_createStore as createStore } from "redux";

const initialState = {
  login: false,
};

const reducer = (prevState = initialState, action) => {
  // action
  switch (action.type) {
    case "SUCCESS_LOGIN":
      return { login: true };
    case "FAIL_LOGIN":
      return { login: false };
    default:
      return prevState;
  }
};

export const store = createStore(reducer);
