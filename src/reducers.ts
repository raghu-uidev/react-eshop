import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./modules/@usersModule/userReducer";
import productsReducer from './modules/@productsModule/productsSlice';
import cartReducer from './modules/@cartModule/cart.slice';

const appReducers = combineReducers({
   userData: userReducer,
   productsData: productsReducer,
   cartData: cartReducer
});


export default appReducers;

/**
 *     
 *  {
 *     state: {
 *                 userData: {
 *                   isUserRegistered: false,
 *                   isUserLoggedIn: false,
 *                   userName: string,
 *                   cartId: string
 *                 }
 *                 productsData: {}
 *                 cartData: {
*                       cartCount: 0,
                      productsInCart: []
 *                 }
 *            }    
 *  }
 * 
 * 
 */