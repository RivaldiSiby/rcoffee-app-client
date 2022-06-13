import React, { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/actionCreator/user";
import { clearChart } from "../../redux/actionCreator/chart";

function PrivateElement({
  children,
  redirectedTo = "/",
  publicPage = "private",
  isRouteReplaced = true,
  extraData = null,
}) {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.login.status);
  const role = useSelector((state) => state.user.user.role);
  if (isLogin === false) {
    dispatch(clearUser());
    dispatch(clearChart());
  }

  if (publicPage === "sign" && isLogin === false) {
    return children;
  }
  if (publicPage === "public") {
    return children;
  }
  if (publicPage === "private" && isLogin === true) {
    return children;
  }
  if (publicPage === "admin" && isLogin === true && role === "admin") {
    return children;
  }
  if (publicPage === "admin" && isLogin === true) {
    return (
      <Navigate
        to={redirectedTo}
        replace={isRouteReplaced}
        extraData={extraData}
      />
    );
  }
  if (publicPage === "sign" && isLogin === true) {
    return (
      <Navigate
        to={redirectedTo}
        replace={isRouteReplaced}
        extraData={extraData}
      />
    );
  }
  if (isLogin === false) {
    return (
      <Navigate
        to={redirectedTo}
        replace={isRouteReplaced}
        extraData={extraData}
      />
    );
  }
}

export default PrivateElement;
