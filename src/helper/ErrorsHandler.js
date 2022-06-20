// import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { failLogin } from "../redux/actionCreator/login";

export default function ErrorsHandler(status) {
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  //   auth error
  if (status === 401) {
    dispatch(failLogin());
    Navigate("/login", { replace: true });
  }
  //   forbiden error
  if (status === 403) {
    Navigate("/", { replace: true });
  }
  // notfound error
  if (status === 404) {
    Navigate("*", { replace: true });
  }
}
