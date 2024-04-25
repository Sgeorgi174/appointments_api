import { Footer } from "../footer/Footer";
import { Header } from "../header/Header";
import { Wrapper } from "../wrapper/Wrapper";
import { Outlet } from "react-router-dom";

export const UserLayout = () => {
  return (
    <Wrapper wrapperClass={"wrapperForMobile"}>
      <Header />
      <Outlet />
      <Footer />
    </Wrapper>
  );
};
