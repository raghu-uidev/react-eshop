import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface User {
    errorMessage: string;
    isLoginInProgress: boolean;
    isRegistrationInProgress: boolean;
    isUserRegistered: boolean;
    isUserLoggedIn: boolean;
}

export interface UserRegisterObj {
    userName: string;
    email: string;
    password: string;
}

export interface LoginData {
    email: string;
    password: string;
}

const userInitialState: User = {
    errorMessage: '',
    isLoginInProgress: false,
    isRegistrationInProgress: false,
    isUserRegistered: false,
    isUserLoggedIn: false,
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
        // {
               //"message": "User created successfully"
         //}
         
        return response.data; // ==>  action.payload
      } catch (err: any) {
        let errorMessage = 'Unable to register the user. Pleae try again.';
        if(err?.response?.data?.message) {
          errorMessage = err?.response?.data?.message;
        }
        return rejectWithValue({
          message: errorMessage
        })
      }
    }
);

 
  export const loginUserAction: any = createAsyncThunk(
    'user/loginUser',
    async(loginData: LoginData, { rejectWithValue }) => {
       try {
           const LOGIN_API_URL = 'http://localhost:4000/api/v1/users/login';
           const response: any = await axios.post(LOGIN_API_URL, loginData);
           return response.data;
       } catch(err: any) {
          let errorMessage = 'Unable to login. Pleae try again.';
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
      .addCase(loginUserAction.pending, (state: any, action: any) => {
        state.isLoginInProgress = true;
      })
      .addCase(loginUserAction.fulfilled, (state: any, action: any) => {
         const userId = action?.payload?.userId;
         const cartId = action?.payload?.cartId;
         const token = action?.payload?.token;
         const userName = action?.payload?.userName;
         sessionStorage.setItem('userId', userId);
         sessionStorage.setItem('cartId', cartId);
         sessionStorage.setItem('token', token);
         sessionStorage.setItem('userName', userName);
         state.isUserLoggedIn = true;
      })
      .addCase(loginUserAction.rejected, (state: any, action: any) => {
        state.errorMessage = action?.payload?.message;
        state.isUserLoggedIn = false;
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

