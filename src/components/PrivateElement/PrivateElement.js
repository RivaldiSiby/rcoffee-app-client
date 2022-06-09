import { useNavigate } from "react-router-dom";

function PrivateElement({
  children,
  isLogin = false,
  redirectedTo = "/",
  publicPage = "private",
  isRouteReplaced = true,
  extraData = null,
}) {
  const Navigate = useNavigate();

  if (publicPage === "sign" && isLogin === true) {
    return Navigate("/", {
      replace: { isRouteReplaced },
      state: { extraData },
    });
  }
  console.log(isLogin);
  if (publicPage === "public") {
    return children;
  }
  if (isLogin === false) {
    return Navigate(`${redirectedTo}`, {
      replace: { isRouteReplaced },
      state: { extraData },
    });
  }
  return children;
}

export default PrivateElement;
