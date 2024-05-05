import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../utils/getToken";

export const servicesApi = createApi({
  reducerPath: "servicesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/service",
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
    addService: builder.mutation({
      query: (body) => {
        return {
          url: "add",
          method: "post",
          body,
        };
      },
    }),
    editService: builder.mutation({
      query: (body) => {
        return {
          url: "edit",
          method: "put",
          body,
        };
      },
    }),
    deleteService: builder.mutation({
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
  useAddServiceMutation,
  useDeleteServiceMutation,
  useEditServiceMutation,
} = servicesApi;
