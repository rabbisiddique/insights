import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseUrl from "../../utils/baseUrl";

export const verifyApi = createApi({
  reducerPath: "verify",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
    credentials: "include",
  }),
  endpoints: (builder) => ({
    verifySendEmail: builder.mutation({
      query: () => ({
        url: "/send-magic-link",
        method: "POST",
      }),
    }),
    verifyEmail: builder.mutation({
      query: (token) => ({
        url: `/verify-email/${token}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useVerifySendEmailMutation, useVerifyEmailMutation } = verifyApi;
