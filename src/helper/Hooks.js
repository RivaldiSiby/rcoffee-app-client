import React from "react";
import {
  useParams,
  useSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";

function Hooks(Component) {
  function Hooks(props) {
    let params = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    let navigate = useNavigate();
    return (
      <Component
        params={params}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        navigate={navigate}
        location={useLocation()}
      />
    );
  }
  return Hooks;
}

export default Hooks;
