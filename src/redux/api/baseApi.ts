import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://book-shop-server-api.vercel.app/api",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.token;
      if (token) {
        headers.set("Authorization", token);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});

export default baseApi;
