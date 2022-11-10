import {  createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "./axios";
import { PROVIDER_LOGIN_ENDPOINT } from "./constants";


export const login = createAsyncThunk('login',async (payload)=>{
    try {
       const request = await instance.post(PROVIDER_LOGIN_ENDPOINT,payload)
       return request;
    } catch (error) {
        return console.log(error);
    }
})