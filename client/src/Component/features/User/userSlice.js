import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {  getUsers ,getById,updateUser,deleteUser,getByName, addUser} from './userApi'

const initialState = {
   users: [],
   currentUser: null,
   status: null
}

export const fetchAllUsersFromServer = createAsyncThunk("user-getUsers", async (thunkAPI) => {
   const response = await getUsers()
   return response
})

export const fetchUserByIdFromServer = createAsyncThunk("user-getById", async (id) => {
   const response = await getById(id)
   return response
})
export const fetchUserByNameFromServer = createAsyncThunk("user-getByName", async (name) => {
    const response = await getByName(name)
    return response
 })

export const AddUserToServer = createAsyncThunk("user-addUser", async (user) => {
   console.log(user)
   const response = await addUser(user)
   console.log(response)
   return response
})

export const updateUserInServer = createAsyncThunk("user-updateUser", async (thunkAPI, user, id) => {
   const response = await updateUser(id, user)
   return response
})

export const deleteUserFromServer = createAsyncThunk("user-deleteUser", async (thunkAPI, id) => {
   const response = await deleteUser(id)
   return response
})

export const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: { 
       setCurrentUser: (state, action) => {
           state.currentUser = action.payload
       }
   },
   extraReducers: (builder) => {

       builder.addCase(fetchAllUsersFromServer.fulfilled, (state, action) => {
           state.users = action.payload
           state.status = "success"
       }).addCase(fetchAllUsersFromServer.rejected, (state, action) => {
           state.status = "failed"
       }).addCase(fetchAllUsersFromServer.pending, (state, action) => {
           state.status = "pending"
       })

       builder.addCase(fetchUserByIdFromServer.fulfilled, (state, action) => {
           state.status = "success";
           // return action.payload
       }).addCase(fetchUserByIdFromServer.rejected, (state, action) => {
           state.status = "failed"
       }).addCase(fetchUserByIdFromServer.pending, (state, action) => {
           state.status = "pending"
       })

       builder.addCase(fetchUserByNameFromServer.fulfilled, (state, action) => {
        state.status = "success";
        // return action.payload
    }).addCase(fetchUserByNameFromServer.rejected, (state, action) => {
        state.status = "failed"
    }).addCase(fetchUserByNameFromServer.pending, (state, action) => {
        state.status = "pending"
    })

       builder.addCase(AddUserToServer.fulfilled, (state, action) => {
           state.users = [...state.users,action.payload]
           state.status = "success"
       }).addCase(AddUserToServer.rejected, (state, action) => {
           state.status = "failed"
       }).addCase(AddUserToServer.pending, (state, action) => {
           state.status = "pending"
       })
   }
})

export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;