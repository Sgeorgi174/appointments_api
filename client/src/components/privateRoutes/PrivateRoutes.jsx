import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);
  return user.token ? true : false;
};

export const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" replace={true} />;
};
