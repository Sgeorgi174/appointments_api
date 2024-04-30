import {
  useConfirmAppointmentMutation,
  useDeleteAppointmentMutation,
  useGetAppointmentsQuery,
} from "../../redux/appointmentsApi";
import { Loader } from "../../components/loader/Loader";
import { useDispatch } from "react-redux";
import { decrementNewAppointments } from "../../redux/appointmentsSlice";

export const Appointments = () => {
  // const dispatch = useDispatch();
  // const {
  //   refetch,
  //   data: appointmentsList,
  //   isLoading: isAppointmentsListLoading,
  //   isError,
  // } = useGetAppointmentsQuery();
  // const [confirmAppointment, { isLoading: isConfirmAppointmentLoading }] =
  //   useConfirmAppointmentMutation();
  // const [deleteAppointment, { isLoading: isDeleteAppointmentLoading }] =
  //   useDeleteAppointmentMutation();

  // if (isAppointmentsListLoading) return <Loader />;

  // if (isError) return <div>У вас пока нет записей</div>;

  return <div>Мои Записи</div>;
};
