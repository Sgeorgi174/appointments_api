import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "../../redux/authSlice";
import { useGetAppointmentsQuery } from "../../redux/appointmentsApi";
import { Loader } from "../loader/Loader";
import { setAppoinments } from "../../redux/appointmentsSlice";
import { MobileNavigation } from "../bottomNav/BottomNav";

export const UserLayout = () => {
  const dispatch = useDispatch();
  const { data: appointmentsList, isLoading } = useGetAppointmentsQuery();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user && appointmentsList) {
      dispatch(setUser(JSON.parse(user)));
      dispatch(setAppoinments(appointmentsList));
    }
  }, [dispatch, appointmentsList]);

  return (
    <div className=" min-h-screen bg-black">
      {isLoading ? <Loader /> : <Outlet />}
      <MobileNavigation />
    </div>
  );
};
