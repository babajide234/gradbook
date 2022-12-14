import React from 'react'
import './AuthStyle.css';
import { Outlet, useLocation, Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Front from '../assets/img/front.jpg'
const AuthLayout = () => {
  const location = useLocation();
  const style={
    height:'100vh'
  }
  return (
    <>
      <main className="main-content  mt-0">
        <section>
          <div className="page-header min-vh-100">
            <div className="container">
              <div className="row">
                <div className="col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0 mx-auto">
                  <div className="card card-plain">
                    <div className=" pb-0 text-start d-flex flex-column ">
                      <h4 className="font-weight-bolder">Sign In</h4>
                      <p className="mb-0">Enter your email and password to sign in</p>
                    </div>
                    <div className="card-body">
                      <Outlet/>
                    </div>
                    <div className="card-footer text-center pt-0 px-lg-2 px-1">
                      {
                        location.pathname === '/school/login' && (
                          <p className="mb-4 text-sm mx-auto">
                            Don't have an account?
                            <Link to="/school/register" className="text-primary text-gradient font-weight-bold">
                              Sign up
                            </Link>
                          </p>
                        ) 
                      }
                    </div>
                  </div>
                </div>
                <div className="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 end-0 text-center justify-content-center flex-column">
                  <div className="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden" style={{backgroundImage: "url('"+Front+"')",
                      backgroundSize: 'cover'}}>
                    <span className="mask bg-gradient-primary opacity-6"></span>
                    <h4 className="mt-5 text-white font-weight-bolder position-relative">Gradbook</h4>
                    <p className="text-white position-relative">Alumni Social Management Platform .</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ToastContainer autoClose={2000} />
    </>
  )
}

export default AuthLayout