import { useCallback, useEffect, useState } from "react";
import { AppointmentCard } from "../../components/appointmentCard/AppointmentCard";
import {
  confirmAppointment,
  deleteAppointment,
  getAppointments,
} from "../../modules/api_requests";
import { filterByOption } from "../../utils/sortAndFiltersForAppointments";
import styles from "./Appointments.module.css";

const tabsButtons = ["Сегодня", "Завтра", "Все", "В ожидании"];

export const Appointments = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  useEffect(() => {
    getAppointments().then((data) => {
      setAppointments(data);
    });
  }, []);

  useEffect(() => {
    setFilteredAppointments(filterByOption(activeTab, appointments));
  }, [activeTab, appointments]);

  const handleClickActiveTab = (index) => {
    setActiveTab(index);
  };

  const handleApprove = useCallback(async ({ appointment }) => {
    try {
      const data = await confirmAppointment({ id: appointment.id });
      setAppointments((prevAppointments) =>
        prevAppointments.map((item) =>
          item.id === appointment.id ? data : item
        )
      );
      setFilteredAppointments((prevFilteredAppointments) =>
        prevFilteredAppointments.map((item) =>
          item.id === appointment.id ? data : item
        )
      );
    } catch (error) {
      console.error(error);
      // Обработка ошибок
    }
  }, []);

  const handleDecline = useCallback(async ({ appointment }) => {
    try {
      await deleteAppointment({ id: appointment.id });
      setAppointments((prevAppointments) =>
        prevAppointments.filter((item) => item.id !== appointment.id)
      );
      setFilteredAppointments((prevFilteredAppointments) =>
        prevFilteredAppointments.filter((item) => item.id !== appointment.id)
      );
    } catch (error) {
      console.error(error);
      // Обработка ошибок
    }
  }, []);

  return (
    <>
      <h2 className={styles.title}>Мои записи</h2>
      <div className={styles.daysButtonsBox}>
        <div className={styles.settingsTabsBox}>
          {tabsButtons.map((el, index) => {
            return (
              <button
                key={index}
                onClick={() => handleClickActiveTab(index)}
                className={`${styles.settingTab} ${
                  activeTab === index ? styles.activeTab : ""
                }`}
              >
                {el}
              </button>
            );
          })}
        </div>
      </div>
      <div className={styles.appointmentsBox}>
        {filteredAppointments.map((appointment, index) => {
          return (
            <AppointmentCard
              appointmentInfo={appointment}
              key={appointment.id}
              name={appointment.client.name}
              relation={appointment.client.telNumber}
              message={appointment.service.name}
              date={`${appointment.day.split("-")[2]}.${
                appointment.day.split("-")[1]
              } - ${appointment.hour}:00`}
              onApprove={() => handleApprove({ appointment, index })}
              onDecline={() => handleDecline({ appointment, index })}
            />
          );
        })}
      </div>
    </>
  );
};
