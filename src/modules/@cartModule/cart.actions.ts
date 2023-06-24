import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export interface CartProductData {
    _id: string;
    title: string;
    price: number;
    thumbnail: string;
    userQuantity: number;
}

export const addProductToCartAction = createAsyncThunk(
    'cart/addProductToCart',
    async (productData:CartProductData, {rejectWithValue} ) => {
        try {
            const cartId = sessionStorage.getItem('cartId');
            const token = sessionStorage.getItem('token');
            const API_URL = `http://localhost:4000/api/v1/cart/addProductToCart/${cartId}`;
            const apiHeaders = {
                headers: {
                    'x-authorization': token
                }
            }
            const response = await axios.post(API_URL, productData, apiHeaders);
            return response.data;

        } catch(err: any) {
           let errorMessage =  'Unable to add products to cart';
           const navigate = useNavigate();
           if(err?.response?.data?.message) {
            errorMessage = err?.response?.data?.message;
            if(errorMessage === 'Unauthorized User') {
                sessionStorage.clear();
                navigate('/sign-in');
                window.location.reload();
            }
          }
          return rejectWithValue({
            message: errorMessage
          })

        }
    }
)