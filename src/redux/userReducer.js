import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const allUserData = createAsyncThunk('userData',async()=>{
    const data = await fetch('http://localhost:3500/getUser')
   return data.json()
})
const userReducer = createSlice({
    name:'userReducer',
    initialState:{
        isLoading:false,
        allUser:[],
        isError:false
    },
    reducers:{
           
     },
     extraReducers(builder){
        builder
         .addCase(allUserData.pending,(state,action)=>{
            state.isLoading = true
         })
         .addCase(allUserData.fulfilled,(state,action)=>{
            state.isLoading = false    
            state.allUser = action.payload
         })
         .addCase(allUserData.rejected,(state,action)=>{
            state.isLoading = false
            state.allUser = []
            state.isError = true

         })
     }
})

export default userReducer.reducer