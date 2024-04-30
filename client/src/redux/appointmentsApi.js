import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../utils/getToken";

export const appointmentsApi = createApi({
  reducerPath: "appointmentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/appointment",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token || getToken();

      // Если токен доступен, добавьте его в заголовки
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAppointments: builder.query({
      query: () => {
        return {
          url: "get",
          method: "get",
        };
      },
    }),
    confirmAppointment: builder.mutation({
      query: (body) => {
        return {
          url: "confirm",
          method: "put",
          body,
        };
      },
    }),
    deleteAppointment: builder.mutation({
      query: (body) => {
        return {
          url: "delete",
          method: "delete",
          body,
        };
      },
    }),
    addAppointment: builder.mutation({
      query: (body) => {
        return {
          url: "add",
          method: "put",
          body,
        };
      },
    }),
  }),
});

export const {
  useGetAppointmentsQuery,
  useAddAppointmentMutation,
  useDeleteAppointmentMutation,
  useConfirmAppointmentMutation,
} = appointmentsApi;
