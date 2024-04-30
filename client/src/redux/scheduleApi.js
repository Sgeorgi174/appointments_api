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
    addDays: builder.mutation({
      query: (body) => {
        return {
          url: "add",
          method: "post",
          body,
        };
      },
    }),
    deleteDays: builder.mutation({
      query: (body) => {
        return {
          url: "delete",
          method: "delete",
          body,
        };
      },
    }),
  }),
});

export const {
  useGetScheduleQuery,
  useAddDaysMutation,
  useDeleteDaysMutation,
} = scheduleApi;
