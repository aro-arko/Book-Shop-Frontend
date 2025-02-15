import baseApi from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    updatePassword: builder.mutation({
      query: (password) => ({
        url: "/auth/change-password",
        method: "POST",
        body: password,
      }),
    }),
  }),
});

export const { useLoginMutation, useUpdatePasswordMutation } = authApi;
