import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const financeApi = createApi({
  reducerPath: "financeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}/api/v1`,
    credentials: "include",
  }),
  tagTypes: ["wallet", "expense"],
  endpoints: (builder) => ({
    addWallet: builder.mutation({
      query: (data) => ({
        url: "finance/wallets",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["wallet"],
    }),
    getAllWallet: builder.query({
      query: (walletOwnerId) => ({
        url: `finance/wallets/${walletOwnerId}`,
      }),
      providesTags: ["wallet", "expense"],
    }),
    addNewExpense: builder.mutation({
      query: ({ ownerUserId, data }) => ({
        url: `finance/expenses/${ownerUserId}`,
        method:"POST",
        body: data,
      }),
      invalidatesTags: ["wallet", "expense"],
    }),
  }),
});

export const { useAddWalletMutation, useGetAllWalletQuery,useAddNewExpenseMutation } = financeApi;
