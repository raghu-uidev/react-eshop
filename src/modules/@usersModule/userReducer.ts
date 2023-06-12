import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface User {
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

export const registerUserAction = createAsyncThunk(
    'user/registerUser',
    async (userData: UserRegisterObj, { rejectWithValue }) => {
      //const {userName, email, password} = userData;
      try {
        const API_URL = 'http://localhost:4000/api/v1/users/register';
        const response = await axios.post(API_URL, userData);
        //const data = await response.json();
        return response.data;
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

const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {},
    extraReducers: (build: any) => {

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

