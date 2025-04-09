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
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/order",
        method: "POST",
        body: orderData,
      }),
    }),
    ownOrders: builder.query({
      query: () => ({
        url: "/order",
        method: "GET",
      }),
    }),
    verifyPayment: builder.query({
      query: (order_id: string) => ({
        url: `/order/verify?order_id=${order_id}`,
        method: "GET",
      }),
    }),

    getAllOrdersStats: builder.query({
      query: () => ({
        url: "/order/all/stats",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  useOwnOrdersQuery,
  useVerifyPaymentQuery,
  useGetAllOrdersStatsQuery,
} = orderApi;
