import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseUrl from "../../utils/baseUrl";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/auth`,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
    credentials: "include",
  }),
  tagTypes: ["User"], // Add this
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (body) => ({
        url: "/sign-up",
        method: "POST",
        body,
      }),
    }),
    signIn: builder.mutation({
      query: (body) => ({
        url: "/sign-in",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"], // Add this to refetch user after login
    }),
    getUser: builder.query({
      query: () => ({
        url: "/check-auth",
        method: "GET",
      }),
      providesTags: ["User"],
      keepUnusedDataFor: 60, // Add this
    }),
    signOut: builder.mutation({
      query: () => ({
        url: "/sign-out",
        method: "POST",
      }),
      invalidatesTags: ["User"], // Add this to clear cache on logout
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/forgot-password",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, newPassword }) => ({
        url: `/reset-password/${token}`,
        method: "POST",
        body: { newPassword },
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useGetUserQuery,
  useSignOutMutation,
  useResetPasswordMutation,
  useForgotPasswordMutation,
} = authApi;
