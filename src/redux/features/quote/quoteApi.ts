import baseApi from "../../api/baseApi";

const quoteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getQuote: builder.query({
      query: () => ({
        url: "/quotes",
        method: "GET",
      }),
    }),
    addQuote: builder.mutation({
      query: (quoteData) => ({
        url: "/quotes/create-quote",
        method: "POST",
        body: quoteData,
      }),
    }),
  }),
});

export const { useGetQuoteQuery, useAddQuoteMutation } = quoteApi;
