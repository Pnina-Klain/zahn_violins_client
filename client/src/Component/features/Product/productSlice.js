 import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
 import {  getProducts ,getById,updateProduct,deleteProduct, addProduct} from './productApi'

const initialState = {
    products: [],
    currentProduct: null,
    status: null
}

export const fetchAllProductsFromServer = createAsyncThunk("product-getProducts", async (thunkAPI) => {
    const response = await getProducts()
    return response
})

export const fetchProductByIdFromServer = createAsyncThunk("product-getById", async (id) => {
    const response = await getById(id)
    return response
})

export const AddProductToServer = createAsyncThunk("product-addProduct", async (product) => {
    console.log(product)
    const response = await addProduct(product)
    console.log(response)
    return response
})

export const updateProductInServer = createAsyncThunk("product-updateProduct", async (thunkAPI, pro, id) => {
    const response = await updateProduct(id, pro)
    return response
})

export const deleteProductFromServer = createAsyncThunk("product-deleteProduct", async (thunkAPI, id) => {
    const response = await deleteProduct(id)
    return response
})

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: { 
        setCurrentProduct: (state, action) => {
            state.currentProduct = action.payload
        }
    },
    extraReducers: (builder) => {

        builder.addCase(fetchAllProductsFromServer.fulfilled, (state, action) => {
            state.products = action.payload
            state.status = "success"
        }).addCase(fetchAllProductsFromServer.rejected, (state, action) => {
            state.status = "failed"
        }).addCase(fetchAllProductsFromServer.pending, (state, action) => {
            state.status = "pending"
        })

        builder.addCase(fetchProductByIdFromServer.fulfilled, (state, action) => {
            state.status = "success";
            // return action.payload
        }).addCase(fetchProductByIdFromServer.rejected, (state, action) => {
            state.status = "failed"
        }).addCase(fetchProductByIdFromServer.pending, (state, action) => {
            state.status = "pending"
        })

        builder.addCase(AddProductToServer.fulfilled, (state, action) => {
            state.products = [...state.products,action.payload]
            state.status = "success"
        }).addCase(AddProductToServer.rejected, (state, action) => {
            state.status = "failed"
        }).addCase(AddProductToServer.pending, (state, action) => {
            state.status = "pending"
        })
    }
})

export const { setCurrentProduct } = productSlice.actions;
export default productSlice.reducer;