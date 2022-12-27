import { createSlice } from '@reduxjs/toolkit'
import { login } from '../../utils/thunkFunc';


const initialState = {
  isLoggedin: false,
  token:'',
  user:'',
  message:''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateToken: (state) => {
      if(localStorage.getItem('auth')){

        const ls = JSON.parse(localStorage.getItem('auth'));
        
        if(ls.isLoggedin){
          state.token = ls.user.token;
          state.isLoggedin = ls.isLoggedin;
          state.message = ls.logMessage;
          state.user = ls.user
        }
      }
    },
    logout: (state) => {
      state.isLoggedin = false;
      state.token = '';
      state.user = '';
      state.message = '';
      localStorage.removeItem('auth')
      localStorage.removeItem('playCount')
    }

  },
  extraReducers:{
    [login.fulfilled]:(state,action)=>{
      if(action.payload.data.status === 'success'){
        const data = {
          isLoggedin: action.payload.data.status == 'success' ? true : false,
          logMessage: action.payload.data.message,
          user: action.payload.data.data
        }
        localStorage.setItem("auth",JSON.stringify(data));
        state.token = data.user.token;
        state.isLoggedin = data.isLoggedin;
        state.message = data.logMessage;
        state.user = data.user;
  
        console.log('from authslice: ', action.payload.data)
      }

    }
  }
})

// Action creators are generated for each case reducer function
export const { updateToken, logout } = authSlice.actions;

export default authSlice.reducer;