import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./modules/@usersModule/userReducer";
import productsReducer from './modules/@productsModule/productsSlice'

const appReducers = combineReducers({
   userData: userReducer,
   productsData: productsReducer
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
 *                 cartData: {}
 *            }    
 *  }
 * 
 * 
 */