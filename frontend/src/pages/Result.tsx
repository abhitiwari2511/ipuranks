import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
    const navigate = useNavigate();
  const location = useLocation();
  const resultData = location.state?.resultData;

  if (!resultData) {
    alert("No result data found. Redirecting to login.");
    navigate("/login");
  }
  return <div>{resultData}</div>;
};

export default Result;
