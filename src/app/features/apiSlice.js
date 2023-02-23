import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: `http://ec2-13-250-105-182.ap-southeast-1.compute.amazonaws.com/api/v1/`}),
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: (payload) => ({
                url: `signup`,
                method: `POST`,
                headers: {
                    "Accept": "application/json"
                },
                body: payload
            })
        }),
        login: builder.mutation({
            query: (payload) => ({
                url: `signin`,
                method: `POST`,
                headers: {
                    "Accept": "application/json"
                },
                body: payload
            })
        }),
        verifyCode: builder.mutation({
            query: (payload) => ({
                url: `2fa/verify`,
                method: `POST`,
                headers: {
                    "Accept": "application/json",
                    "Authorization" : "Bearer " + payload.token
                },
                body: {
                    "code": payload.code
                }
            })
        }),
        getReports: builder.query({
            query: (payload) => ({
                url: `reports`,
                method: `GET`,
                headers: {
                    "Accept": "application/json",
                    "Authorization" : payload.type +" "+ payload.access_token
                }
            }),
            providesTags: ["reports"]
        }),
        addReport: builder.mutation({
            query: (payload) => ({
                url: `reports`,
                method: `POST`,
                headers: {
                    "Accept": "application/json",
                    "Authorization" : payload.type + " " + payload.access_token
                },
                body: payload
            }),
            invalidatesTags: ['reports']
        }),
        deleteReport: builder.mutation({
            query: (payload) => ({
                url: `reports/${payload.uuid}`,
                method: `DELETE`,
                headers: {
                    "Accept": "application/json",
                    "Authorization" : payload.type + " " + payload.access_token
                }
            }),
            invalidatesTags: ['reports']
        }),
    })
})
export const { useSignUpMutation, useLoginMutation, useVerifyCodeMutation, useGetReportsQuery, useAddReportMutation, useDeleteReportMutation } = api
