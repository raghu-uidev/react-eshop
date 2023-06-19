import { createSlice } from "@reduxjs/toolkit";
import { getProductsAction } from "./products.actions";

export interface ProductsData {
   isProductsLoading: boolean,
   errorMessage: string,
   smartphones: Array<Object>,
   laptops: Array<Object>,
   fashion: Array<Object>,
   skincare: Array<Object>,
   kids: Array<Object>,
   footware: Array<Object>
}

const productsInitialState: ProductsData = {
   isProductsLoading: false,
   errorMessage: '',
   smartphones: [],
   laptops: [],
   fashion: [],
   skincare: [],
   kids: [],
   footware: []
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
    }
});

const { reducer, actions} = productsSlice;

export default reducer;