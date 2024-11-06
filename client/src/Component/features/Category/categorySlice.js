import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {  getCategories ,getById,updateCategory,deleteCategory} from './categoryApi'

const initialState = {
    categories: [],
    currentCategory: null,
    status: null
}

export const fetchAllCategoriesFromServer = createAsyncThunk("category-getCategories", async (thunkAPI) => {
    const response = await getCategories()
    return response
})

export const fetchCategoryByIdFromServer = createAsyncThunk("category-getById", async (id) => {
    const response = await getById(id)
    return response
})

export const AddCategoryToServer = createAsyncThunk("category-addCategory", async (category) => {
    console.log(category)
    const response = await getCategories(category)
    console.log(response)
    return response
})

export const updateCategoryInServer = createAsyncThunk("category-updateCategory", async (thunkAPI, user, id) => {
    const response = await updateCategory(id, user)
    return response
})

export const deleteCategoryFromServer = createAsyncThunk("category-deleteCategory", async (thunkAPI, id) => {
    const response = await deleteCategory(id)
    return response
})

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: { 
        setCurrentCategory: (state, action) => {
            state.currentCategory = action.payload
        }
    },
    extraReducers: (builder) => {

        builder.addCase(fetchAllCategoriesFromServer.fulfilled, (state, action) => {
            state.categories = action.payload
            state.status = "success"
        }).addCase(fetchAllCategoriesFromServer.rejected, (state, action) => {
            state.status = "failed"
        }).addCase(fetchAllCategoriesFromServer.pending, (state, action) => {
            state.status = "pending"
        })

        builder.addCase(fetchCategoryByIdFromServer.fulfilled, (state, action) => {
            state.status = "success";
            // return action.payload
        }).addCase(fetchCategoryByIdFromServer.rejected, (state, action) => {
            state.status = "failed"
        }).addCase(fetchCategoryByIdFromServer.pending, (state, action) => {
            state.status = "pending"
        })

        builder.addCase(AddCategoryToServer.fulfilled, (state, action) => {
            state.categories = [...state.categories,action.payload]
            state.status = "success"
        }).addCase(AddCategoryToServer.rejected, (state, action) => {
            state.status = "failed"
        }).addCase(AddCategoryToServer.pending, (state, action) => {
            state.status = "pending"
        })
    }
})

export const { setCurrentCategory } = categorySlice.actions;
export default categorySlice.reducer;