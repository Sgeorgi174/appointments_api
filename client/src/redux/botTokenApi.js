import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const botTokenApi = createApi({
  reducerPath: "botTokenApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.telegram.org/",
  }),
  endpoints: (builder) => ({
    checkToken: builder.mutation({
      query: (token) => `/bot${token}/getMe`,
    }),
  }),
});

export const { useCheckTokenMutation } = botTokenApi;
