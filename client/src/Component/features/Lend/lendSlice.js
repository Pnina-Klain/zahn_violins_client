import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {  getLends ,getById,updateLend,deleteLend, addLend} from './lendApi'

const initialState = {
   lends: [],
   currentLend: null,
   status: null
}

export const fetchAllLendsFromServer = createAsyncThunk("lend-getLends", async (thunkAPI) => {
   const response = await getLends()
   return response
})

export const fetchLendByIdFromServer = createAsyncThunk("lend-getById", async (id) => {
   const response = await getById(id)
   return response
})

export const AddLendToServer = createAsyncThunk("lend-addLend", async (lend) => {
   console.log(lend)
   const response = await addLend(lend)
   console.log(response)
   return response
})

export const updateLendInServer = createAsyncThunk("lend-updateLends", async (thunkAPI, lend, id) => {
   const response = await updateLend(id, lend)
   return response
})

export const deleteLendFromServer = createAsyncThunk("lend-deleteLend", async (thunkAPI, id) => {
   const response = await deleteLend(id)
   return response
})

export const lendSlice = createSlice({
   name: 'lend',
   initialState,
   reducers: { 
       setCurrentLend: (state, action) => {
           state.currentLend = action.payload
       }
   },
   extraReducers: (builder) => {

       builder.addCase(fetchAllLendsFromServer.fulfilled, (state, action) => {
           state.lends = action.payload
           state.status = "success"
       }).addCase(fetchAllLendsFromServer.rejected, (state, action) => {
           state.status = "failed"
       }).addCase(fetchAllLendsFromServer.pending, (state, action) => {
           state.status = "pending"
       })

       builder.addCase(fetchLendByIdFromServer.fulfilled, (state, action) => {
           state.status = "success";
           // return action.payload
       }).addCase(fetchLendByIdFromServer.rejected, (state, action) => {
           state.status = "failed"
       }).addCase(fetchLendByIdFromServer.pending, (state, action) => {
           state.status = "pending"
       })

       builder.addCase(AddLendToServer.fulfilled, (state, action) => {
           state.lends = [...state.lends,action.payload]
           state.status = "success"
       }).addCase(AddLendToServer.rejected, (state, action) => {
           state.status = "failed"
       }).addCase(AddLendToServer.pending, (state, action) => {
           state.status = "pending"
       })
   }
})

export const { setCurrentLend } = lendSlice.actions;
export default lendSlice.reducer;