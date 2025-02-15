import baseApi from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => ({
        url: "/order/all",
        method: "GET",
      }),
    }),
    getOrderById: builder.query({
      query: (id) => ({
        url: `/order/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllOrdersQuery, useGetOrderByIdQuery } = orderApi;
