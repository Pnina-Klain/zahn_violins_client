
import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "../features/Category/categorySlice";
import productSlice from "../features/Product/productSlice";
import userSlice from "../features/User/userSlice";
import lendSlice from "../features/Lend/lendSlice";


export const store = configureStore({
    reducer: {
        category: categorySlice,
        product:productSlice,
        user:userSlice,
        lend:lendSlice
    }
})