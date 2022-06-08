import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PrivateElement({
  children,
  allowedRole,
  redirectedTo = "/",
  publicPage = "private",
  isRouteReplaced = true,
  extraData = null,
}) {
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isLogin, setisLogin] = useState(false);
  const [token, setToken] = useState(false);

  setisLogin(false);
  setToken(false);
  useEffect(() => {
    const checkLogin = async () => {
      try {
        setLoading(true);

        const refreshToken = JSON.parse(localStorage.getItem("refreshkey"));
        // cek token

        const result = await axios.get(
          `http://localhost:8080/auth/${refreshToken}`
        );
        console.log(result);
        if (result.data.data.token !== undefined) {
          localStorage.setItem(
            "tokenkey",
            JSON.stringify(result.data.data.token)
          );

          setisLogin(true);
          setToken(true);
          return;
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
        return Navigate(`${redirectedTo}`, {
          replace: { isRouteReplaced },
          state: { extraData },
        });
      }
    };

    checkLogin();
  }, [setToken(false)]);
  if (token === true && isLogin === true) {
    return children;
  }
  if (publicPage === "public") {
    return children;
  }
}

export default PrivateElement;
