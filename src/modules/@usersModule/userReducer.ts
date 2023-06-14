import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface User {
    errorMessage: string;
    isRegistrationInProgress: boolean;
    isUserRegistered: boolean;
    isUserLoggedIn: boolean;
    userName: string;
    cartId: string;
}

export interface UserRegisterObj {
    userName: string;
    email: string;
    password: string;
}

const userInitialState: User = {
    errorMessage: '',
    isRegistrationInProgress: false,
    isUserRegistered: false,
    isUserLoggedIn: false,
    userName: '',
    cartId: '' 
}

/**
 *  
 *  createAsyncThunk is used to create asyn actions.
 *  This will accept two paramters
 *    a. action name (slice name + action name)
 *    b. async function
 * 
 *   https statu code
 *    1 ---- informational
 *    2 ---- 200, 201 --- sucess 
 *    3 ---- 302, 301 --- session expire, session create
 *    4  --- 401, 403, 404 ---  Bad Request , Not found
 *    5 --- internal server errors 500, 503 server unavailable, 502 server unreachable
 * 
 *    post --- create
 *    put --- update
 *    get --- retreive
 *    delete -- delete 
 *
 */

export const registerUserAction: any =  createAsyncThunk(
    'user/registerUser',
     async (userData: UserRegisterObj, { rejectWithValue }) => {
      //const {userName, email, password} = userData;
      try {
        const API_URL = 'http://localhost:4000/api/v1/users/register';
        const response: any = await axios.post(API_URL, userData);
        //const data = await response.json();
        return response.data;
      } catch (err: any) {
        let errorMessage = 'Unable to register the user. Pleae try again.';
        /**
         *  {
         *     err:  {
         *        response:  {
         *             data:  {
         *                message: ''
         *              }
         *         }
         *     }
         *    
         *     
         *  }
         * 
         * if('')
         */
        if(err?.response?.data?.message) {
          errorMessage = err?.response?.data?.message;
        }
        return rejectWithValue({
          message: errorMessage
        })
      }
    }
  );

const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      .addCase(registerUserAction.pending, (state: any, action: any) => {
         state.isRegistrationInProgress = true;
      })
      .addCase(registerUserAction.fulfilled, (state: any, action: any) => {
         state.isRegistrationInProgress = false;
         state.isUserRegistered = true;
         state.errorMessage = '';
      })
     .addCase(registerUserAction.rejected, (state: any, action: any) => {
         state.isRegistrationInProgress = false;
         state.isUserRegistered = false;
         state.errorMessage = action?.payload?.message
      })
    }
});

/**
 *    {
 *        reducer: {},
 *        actions: {}
 *    }
 * 
 */
const { reducer, actions } = userSlice;

export default reducer;

