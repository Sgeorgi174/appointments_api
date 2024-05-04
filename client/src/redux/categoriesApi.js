import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../utils/getToken";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/category",
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
    addCategory: builder.mutation({
      query: (body) => {
        return {
          url: "add",
          method: "post",
          body,
        };
      },
    }),
    editCategory: builder.mutation({
      query: (body) => {
        return {
          url: "edit",
          method: "put",
          body,
        };
      },
    }),
    getCategories: builder.query({
      query: () => {
        return {
          url: "get",
          method: "get",
        };
      },
    }),
    deleteCategory: builder.mutation({
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
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useEditCategoryMutation,
  useGetCategoriesQuery,
} = categoriesApi;
