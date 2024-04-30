import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../utils/getToken";

export const botSettingsApi = createApi({
  reducerPath: "botSettingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/bot/setting",
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
    createSetting: builder.mutation({
      query: (body) => {
        return {
          url: "add",
          method: "post",
          body,
        };
      },
    }),
    editSetting: builder.mutation({
      query: (body) => {
        return {
          url: "edit",
          method: "put",
          body,
        };
      },
    }),
    getSettings: builder.query({
      query: () => {
        return {
          url: "get",
          method: "get",
        };
      },
    }),
  }),
});

export const {
  useCreateSettingMutation,
  useEditSettingMutation,
  useGetSettingsQuery,
} = botSettingsApi;
