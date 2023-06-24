import { createSlice } from "@reduxjs/toolkit";
import { addProductToCartAction } from "./cart.actions";
export interface CartInterface {
    cartCount: number;
    productsInCart: Array<Object>,
    errorMessage: string;
}


const cartInitialState: CartInterface = {
    cartCount: 0,
    productsInCart: [],
    errorMessage: ''
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: cartInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(addProductToCartAction.pending, (state, action) => {
            
        })
        .addCase(addProductToCartAction.fulfilled, (state: any, action:any) => {
            state.cartCount += 1;
        })
        .addCase(addProductToCartAction.rejected, (state: any, action: any) => {
            state.errorMessage = action.payload.message
        })
    }
});

const {reducer, actions} = cartSlice;

export default reducer;

