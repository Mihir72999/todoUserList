import { userSlice } from "./userSlice";

export const userAddapter = userSlice.injectEndpoints({
    endpoints:(builder)=>({
     
      postUser:builder.mutation({
        query:(body )=>({
         url:'postUser',
         method:'POST',
         params:'ripal patel',
         body:{...body}   
        }),
        transformErrorResponse:response=>response.data
      }),
      deleteUser:builder.mutation({
        query:(body)=>({
      
          url:`deleteUser`,
          method:'DELETE',
          body:{...body}
        }),
        transformErrorResponse:response=>response.data
      })  
    })
})

export const { usePostUserMutation , useDeleteUserMutation} = userAddapter