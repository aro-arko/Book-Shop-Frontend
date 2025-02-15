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
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: email,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ email, token, newPassword }) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: { email, newPassword },
        headers: {
          Authorization: token,
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useUpdatePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;

export default authApi;
