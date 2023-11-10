import { userSlice } from "./userSlice";

export const userAddapter = userSlice.injectEndpoints({
    endpoints:(builder)=>({
     
      postUser:builder.mutation({
        query:(body )=>({
         url:'postUser',
         method:'POST',
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
      }),
      updateUser:builder.mutation({
        query:(body)=>({
          url:'updateUser',
          method:'PATCH',
          body:{...body}
        }),
        transformErrorResponse:response=>response.data
      })  
    })
})
          

export const { usePostUserMutation , useUpdateUserMutation , useDeleteUserMutation} = userAddapter
