import baseApi from "../../api/baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => ({
        url: "/cart",
        method: "GET",
      }),
    }),
    addToCart: builder.mutation({
      query: ({
        productId,
        quantity,
      }: {
        productId: string;
        quantity: number;
      }) => ({
        url: "/cart/add",
        method: "POST",
        body: { productId, quantity },
      }),
    }),
    updateCart: builder.mutation({
      query: ({ productId, quantity }) => ({
        url: `/cart/update/${productId}`,
        method: "PUT",
        body: { quantity },
      }),
    }),
    removeFromCart: builder.mutation({
      query: (productId: string) => ({
        url: `/cart/remove/${productId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartMutation,
  useRemoveFromCartMutation,
} = cartApi;
