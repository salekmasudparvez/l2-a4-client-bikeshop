import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<object, { name: string; password: string }>({
      query: (userInfo) => ({
        url: "api/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    signup: builder.mutation<object, { name: string; email: string; password: string }>({
      query: (userInfo) => ({
        url: "api/auth/signup",
        method: "POST",
        body: userInfo,
      }),
    }),
    getAllUser:builder.query({
      query: () => ({
        url: "api/auth/all",
        method: "GET",
      }),
    }),
    updateStatus:builder.mutation<object, { id: string; action: string;  }>({
      query:(payload)=>({
        url:"api/auth/update",
        method:"PATCH",
        body:payload
      })
    })
  }),
});

export const { useLoginMutation,useSignupMutation ,useGetAllUserQuery, useUpdateStatusMutation} = authApi;
export default authApi;
