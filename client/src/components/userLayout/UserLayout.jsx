import { Header } from "../header/Header";
import { Wrapper } from "../wrapper/Wrapper";
import { Outlet, useNavigate } from "react-router-dom";
import { Loader } from "../loader/Loader";
import { UserProvider } from "../../contexts/userContext";
import { LoadingProvider } from "../../contexts/loadingContext";
import { useEffect, useState } from "react";
import { getUser } from "../../modules/api_requests";

export const UserLayout = () => {
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getUser()
      .then((user) => {
        setUser(user);
        setLoading(false);
      })
      .catch(() => {
        navigate("/login", { replace: true });
      });
  }, []);

  return (
    <LoadingProvider isLoading={isLoading} setLoading={setLoading}>
      <UserProvider user={user}>
        <Wrapper wrapperClass={"wrapperForMobile"}>
          <Header firstLetter={!isLoading && user ? user.firstName : ""} />
          {isLoading ? <Loader /> : <Outlet />}
        </Wrapper>
      </UserProvider>
    </LoadingProvider>
  );
};
