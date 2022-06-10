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

  if (publicPage === "sign") {
    return children;
  }
  if (publicPage === "public") {
    return children;
  }
  if (publicPage === "private" && isLogin === true) {
    return children;
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
