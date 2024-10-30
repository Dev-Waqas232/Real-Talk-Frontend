import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../utils/fetchBaseQuery";
import { ApiResponse, AuthResponse } from "../../types/responseTypes";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    signup: builder.mutation<
      ApiResponse<AuthResponse>,
      { username: string; email: string; password: string }
    >({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
    login: builder.mutation<
      ApiResponse<AuthResponse>,
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useSignupMutation, useLoginMutation } = authApi;
