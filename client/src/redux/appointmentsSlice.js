import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appointments: [],
  newAppointments: 0,
};

export const appointmentsSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    setAppoinments: (state, action) => {
      state.appointments = action.payload;

      state.newAppointments = action.payload.filter(
        (obj) => obj.status === "pending"
      ).length;
    },
    decrementNewAppointments: (state) => {
      if (state.newAppointments > 0) {
        // Проверяет, что newAppointments больше 0
        state.newAppointments -= 1; // Уменьшает newAppointments на 1
      }
    },
  },
});

export const { setAppoinments, decrementNewAppointments } =
  appointmentsSlice.actions;
export const appointmentsList = (state) => state.appointments.appointments;
export const countNewAppointments = (state) =>
  state.appointments.newAppointments;
export default appointmentsSlice.reducer;
