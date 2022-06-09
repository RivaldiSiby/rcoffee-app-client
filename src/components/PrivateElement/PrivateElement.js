import React, { Navigate } from "react-router-dom";

function PrivateElement({
  children,
  isLogin = false,
  redirectedTo = "/",
  publicPage = "private",
  isRouteReplaced = true,
  extraData = null,
}) {
  console.log(publicPage);

  if (publicPage === "sign") {
    return children;
  }
  if (publicPage === "public") {
    return children;
  }
  if (publicPage === "private" && isLogin === true) {
    return children;
  }
}

export default PrivateElement;
