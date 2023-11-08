import {createApi ,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const userSlice = createApi({
  reducerPath:'userSlice',
  baseQuery:fetchBaseQuery({baseUrl:'http://localhost:3500/'}),
  endpoints:()=>({})  
})