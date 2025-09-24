import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/auth",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
    credentials: "include",
  }),
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
    }),
    getUser: builder.query({
      query: () => ({
        url: "/check-auth",
        method: "GET",
        providesTags: ["User"],
      }),
    }),
    signOut: builder.mutation({
      query: () => ({
        url: "/sign-out",
        method: "POST",
      }),
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
        url: `/reset-password/${token}`, // include token in URL
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
