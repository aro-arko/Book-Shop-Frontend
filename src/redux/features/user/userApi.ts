import { TUpdateUser } from "../../../types/authUser.type";
import baseApi from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
    }),
    updateUser: builder.mutation({
      query: ({
        email,
        userData,
      }: {
        email: string;
        userData: TUpdateUser;
      }) => ({
        url: `/user/${email}`,
        method: "PATCH",
        body: userData,
      }),
    }),
  }),
});

export const { useGetUserQuery, useUpdateUserMutation } = userApi;
export default userApi;
