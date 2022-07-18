import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const MyPrivateRoute = ({ children }) => {
  let location = useLocation();
  const auth = useSelector((state) => state.auth);
  const { isLoading, isAuthenticated } = auth;
  return isLoading ? (
    <div
      style={{
        width: "100vw",
        height: "78vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* show loading spinner */}
      <div style={{ fontSize: 20 }}>Loading ....</div>
    </div>
  ) : isAuthenticated ? (
    children
  ) : (
    <Navigate to="/signin" state={{ from: location }} />
  );
};

export default MyPrivateRoute;
