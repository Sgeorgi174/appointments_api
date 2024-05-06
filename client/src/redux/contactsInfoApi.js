import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../utils/getToken";

export const contactsInfoApi = createApi({
  reducerPath: "contactsInfoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/contact",
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
    addContact: builder.mutation({
      query: (body) => {
        return {
          url: "add",
          method: "post",
          body,
        };
      },
    }),
    getContact: builder.query({
      query: () => {
        return {
          url: "get",
          method: "get",
        };
      },
    }),
  }),
});

export const { useAddContactMutation, useGetContactQuery } = contactsInfoApi;
