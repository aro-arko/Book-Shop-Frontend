import baseApi from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({
        category,
        page,
        limit,
      }: { category?: string; page?: number; limit?: number } = {}) => {
        const params = new URLSearchParams();
        if (category) params.append("category", category);
        if (page) params.append("page", page.toString());
        if (limit) params.append("limit", limit.toString());
        return {
          url: `/product?${params.toString()}`,
          method: "GET",
        };
      },
    }),
    getProductById: builder.query({
      query: (id: string) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ id, product }) => ({
        url: `/product/${id}`,
        method: "PUT",
        body: product,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id: string) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
    }),
    createProduct: builder.mutation({
      query: (product) => ({
        url: "/product",
        method: "POST",
        body: product,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useCreateProductMutation,
} = productApi;
export default productApi;
