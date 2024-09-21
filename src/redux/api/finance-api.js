import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const financeApi = createApi({
  reducerPath: "financeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}/api/v1`,
    credentials: "include",
  }),
  tagTypes: ["wallet", "expense", "savings"],
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
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["wallet", "expense", "savings", "debt"],
    }),
    getAllExpense: builder.query({
      query: ({ ownerUserId, month }) => ({
        url: `finance/expenses/${ownerUserId}?month=${month}`, // Using a query parameter for month
      }),
      providesTags: ["wallet", "expense"],
    }),
    deleteSingleExpense: builder.mutation({
      query: ({ ownerUserId, expenseId, data }) => ({
        url: `finance/expenses/${ownerUserId}/${expenseId}`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["wallet", "expense"],
    }),
    getAllSavings: builder.query({
      query: (ownerUserId) => ({
        url: `finance/savings/${ownerUserId}`,
      }),
      providesTags: ["savings"],
    }),
    deleteSingleSavings: builder.mutation({
      query: ({ ownerUserId, savingsId, data }) => ({
        url: `finance/savings/${ownerUserId}/${savingsId}`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["wallet", "savings"],
    }),
    addNewDebt: builder.mutation({
      query: ({ ownerUserId, data }) => ({
        url: `finance/debts/${ownerUserId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["debt"],
    }),
    getAllDebt: builder.query({
      query: (ownerUserId) => ({
        url: `finance/debts/${ownerUserId}`,
      }),
      providesTags: ["debt"],
    }),
    updateDebtPaidStatus: builder.mutation({
      query: ({ ownerUserId, debtId, data }) => ({
        url: `finance/debts/${ownerUserId}/${debtId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["debt"],
    }),
    deleteSingleDebt: builder.mutation({
      query: ({ ownerUserId, debtId }) => ({
        url: `finance/debts/${ownerUserId}/${debtId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["debt"],
    }),
  }),
});

export const {
  useAddWalletMutation,
  useGetAllWalletQuery,
  useAddNewExpenseMutation,
  useGetAllExpenseQuery,
  useDeleteSingleExpenseMutation,
  useGetAllSavingsQuery,
  useDeleteSingleSavingsMutation,
  useAddNewDebtMutation,
  useGetAllDebtQuery,
  useUpdateDebtPaidStatusMutation,
  useDeleteSingleDebtMutation
} = financeApi;
