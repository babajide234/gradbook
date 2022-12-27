import React, { useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'

const LoginChoice = () => {
    const { isLoggedin } = useSelector((state)=> state.auth)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if(isLoggedin){
          navigate("/dashboard");
        }
      }, [isLoggedin])
  return (
    <>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="text-center">Login</h1>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <p className="text-center">Please select the type of login you would like to use.</p>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <p className="text-center">If you are a school, you will be able to manage your school's alumni. If you are an alumni, you will be able to manage your profile.</p>
                    </div>
                    </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="card mb-5">
                                    <div className="card-body">
                                        <h5 className="card-title">School Login</h5>
                                        <p className="card-text">Login as a school to manage your school's alumni.</p>
                                        <Link to="/school/login" className="btn btn-primary">Login</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Alumni Login</h5>
                                        <p className="card-text">Login as an alumni to manage your profile.</p>
                                        <Link to="/alumini/login" className="btn btn-primary">Login</Link>
                                    </div>
                                </div>
                            </div>
                    </div>
            </div>
        </div>

    </>
  )
}

export default LoginChoice