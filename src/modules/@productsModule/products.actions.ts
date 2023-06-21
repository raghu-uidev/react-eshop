import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductsAction = createAsyncThunk(
    'products/getProducts',
    async (category: string | undefined, { rejectWithValue }) => {
        try {
            const API_URL = `http://localhost:4000/api/v1/products/getProducts?search={"category": "${category}"}`;
            const response = await axios.get(API_URL);
            //return response.data;

            return {
                type: category,
                data: response.data
            }

        } catch (error: any) {
            let errorMessage = 'Unable to retrieve products';
            rejectWithValue({
                message: errorMessage
            })
        }

    }
);

export const getProductByIdAction = createAsyncThunk(
    'products/getProductById',
    async(prductId: string, { rejectWithValue }) => {
        try {
            const API_URL = `http://localhost:4000/api/v1/products/getProducts?search={"_id": "${prductId}"}`;
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error: any) {
            let errorMessage = 'Unable to retrieve product';
            rejectWithValue({
                message: errorMessage
            })
        }
    }
);