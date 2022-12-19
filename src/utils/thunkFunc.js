import {  createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "./axios";


// const auth = JSON.parse(localStorage.getItem('auth'));
// const token = auth ? auth.token : ''

export const login = createAsyncThunk('login',async (payload)=>{
    try {
       const request = await instance.post(payload.endpoint,payload.values)
       return request;
    } catch (error) {
        return console.log(error);
    }
})
export const register = createAsyncThunk('register',async (payload)=>{
    try {
       const request = await instance.post(payload.endpoint,payload.values)
       return request;
    } catch (error) {
        return console.log(error);
    }
})
export const schools = createAsyncThunk('schools',async (payload)=>{
    try {
       const request = await instance.post(payload.endpoint,payload.values)
       return request;
    } catch (error) {
        return console.log(error);
    }
})
export const subscription = createAsyncThunk('schools',async (payload)=>{
    try {
       const request = await instance.post(payload.endpoint,payload.values)
       return request;
    } catch (error) {
        return console.log(error);
    }
})
export const metrics = createAsyncThunk('metrics',async (payload)=>{
    try {
       const request = await instance.post(payload)
       return request;
    } catch (error) {
        return console.log(error);
    }
})

export const details = createAsyncThunk('details', async (payload) => {
    try {
        const request = await instance.post( payload.endpoint, payload.values);
        return request;
    } catch (error) {
        return console.log(error);
    }
})

export const updateDetails = createAsyncThunk('updateDetails', async (payload) => {
    try {
        const request = await instance.post(payload.endpoint, payload.values);
        return request;
    } catch (error) {
        return console.log(error);
    }
})