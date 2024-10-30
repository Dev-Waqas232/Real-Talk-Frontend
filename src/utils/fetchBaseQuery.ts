import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { RootState } from "../store";

export const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",
  prepareHeaders: (headers, { getState }) => {
    const token = getState() as RootState;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
