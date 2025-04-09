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
    getUserById: builder.query({
      query: (id: string) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useUpdateUserMutation,
  useGetUserByIdQuery,
  useGetAllUsersQuery,
} = userApi;
export default userApi;
