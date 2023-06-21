import { createSlice } from "@reduxjs/toolkit";
import { getProductByIdAction, getProductsAction } from "./products.actions";

export interface ProductsData {
   isProductsLoading: boolean,
   errorMessage: string,
   smartphones: Array<Object>,
   laptops: Array<Object>,
   fashion: Array<Object>,
   skincare: Array<Object>,
   kids: Array<Object>,
   footware: Array<Object>,
   productDetailData: any
}

const productsInitialState: ProductsData = {
   isProductsLoading: false,
   errorMessage: '',
   smartphones: [],
   laptops: [],
   fashion: [],
   skincare: [],
   kids: [],
   footware: [],
   productDetailData: {}
}

const productsSlice = createSlice({
    name: 'products',
    initialState: productsInitialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
        .addCase(getProductsAction.pending, (state, action) => {
           state.isProductsLoading = true;
        })
        .addCase(getProductsAction.fulfilled, (state: any, action: any) => {
           /**
            *   {  
            *     action: {
            *          payload : {
            *                        type: '',
            *                        data: [{}, {}, {}]
        *                        }
            *       }
            *   } 
            * 
            */
            const category: string = action.payload.type; // smartphones
            state.isProductsLoading = false;
            state[category] = action.payload.data;
        })
        .addCase(getProductsAction.rejected, (state: any, action: any) => {
            state.errorMessage = action.payload.message;
        })
        .addCase(getProductByIdAction.pending, (state, action) => {
            state.isProductsLoading = true;
        })
        .addCase(getProductByIdAction.fulfilled, (state: any, action: any) => {
            state.isProductsLoading = false;
            state.productDetailData = action.payload[0]
        })
        .addCase(getProductByIdAction.rejected, (state: any, action: any) => {
            state.isProductsLoading = false;
            state.errorMessage = action.paylaod.message;
        })
    }
});

const { reducer, actions} = productsSlice;

export default reducer;