import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./modules/@usersModule/userReducer";

const appReducers = combineReducers({
   userData: userReducer
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