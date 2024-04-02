import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return token ? true : false;
};

export const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" replace={true} />;
};
