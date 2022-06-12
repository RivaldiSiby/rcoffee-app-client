import React, { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateElement({
  children,
  redirectedTo = "/",
  publicPage = "private",
  isRouteReplaced = true,
  extraData = null,
}) {
  const isLogin = useSelector((state) => state.login.status);
  const role = useSelector((state) => state.user.user.role);
  if (publicPage === "sign") {
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
