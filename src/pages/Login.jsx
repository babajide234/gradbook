import React, { useEffect,useState } from 'react'
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../utils/thunkFunc';
import { useNavigate, useLocation  } from 'react-router-dom';

import { 
  ALUMNI_LOGIN_ENDPOINT, 
  PROVIDER_LOGIN_ENDPOINT, 
  SCHOOL_LOGIN_ENDPOINT 
} from '../utils/constants';

const Login = () => {
  const { isLoggedin } = useSelector((state)=> state.auth)
  
  const [ endpoint, setEndpoint] = useState('')


  const dispatch = useDispatch()
  const navigate = useNavigate();
  const location = useLocation();

  // const params
  const initialValues = {
    email: 'babajide234@gmail.com', 
    password: '348212' 
  }

  useEffect(() => {
    if(isLoggedin){
      navigate("/dashboard");
    }
  }, [isLoggedin])
  
  useEffect(() => {
    if(location.pathname == "/provider/login"){
      setEndpoint(PROVIDER_LOGIN_ENDPOINT);
      // console.log("pathname", location.pathname);
      console.log("pathname", endpoint);
    }
    if(location.pathname == "/school/login"){
      setEndpoint(SCHOOL_LOGIN_ENDPOINT );
      // console.log("pathname", location.pathname);
      console.log("pathname", endpoint);  
    }
    if(location.pathname == "/alumini/login"){
      setEndpoint( ALUMNI_LOGIN_ENDPOINT );
      // console.log("pathname", location.pathname); 
      console.log("pathname", endpoint);
    }
  }, [location]);

  const handleSubmit = (values) =>{

    const request = dispatch(login({values,endpoint}));
    
    request.then((res)=>{
            console.log(res);
    })
  }

  return (
    <div className="card card-frame">
      <div className="card-body">

      <Formik
        initialValues= {initialValues}
        onSubmit={handleSubmit}
      >
        {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         /* and other goodies */
       }) => (
          <form onSubmit={handleSubmit} role="form">
              <div className="mb-3">
                <input 
                  type="email" 
                  name='email'
                  className="form-control form-control-lg" 
                  placeholder="Email" 
                  aria-label="Email"
                  value={values.email}
                  onChange={handleChange}
                  />
              </div>
              <div className="mb-3">
                <input 
                  type="password" 
                  name='password'
                  className="form-control form-control-lg" 
                  placeholder="Password" 
                  aria-label="Password"
                  value={values.password}
                  onChange={handleChange}
                />
              </div>
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="rememberMe"/>
                <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-lg btn-primary btn-lg w-100 mt-4 mb-0">Sign in</button>
              </div>
        </form>
       )}
      </Formik>
      </div>
    </div>
  )
}

export default Login