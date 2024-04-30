import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../utils/getToken";

export const scheduleApi = createApi({
  reducerPath: "scheduleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/schedule",
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
    getSchedule: builder.query({
      query: () => {
        return {
          url: "get",
          method: "get",
        };
      },
    }),
    getCurrentSchedule: builder.query({
      query: (id) => {
        return {
          url: `get/${id}`,
          method: "get",
        };
      },
    }),
  }),
});

export const {
  useChangeAvailabilityDayMutation,
  useChangeAvailabilityHourMutation,
  useCreateScheduleMutation,
  useDeleteScheduleMutation,
  useGetCurrentScheduleQuery,
  useGetScheduleQuery,
} = scheduleApi;
