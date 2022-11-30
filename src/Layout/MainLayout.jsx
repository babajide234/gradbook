import React, { useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Mainfooter from '../components/mainfooter'
import Navbar from '../components/navbar'
import Sidebar from '../components/sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify';

const MainLayout = () => {
  const { isLoggedin } = useSelector((state)=> state.auth)
  
  // const dispatch = useDispatch();

  useEffect(() => {
    if(!isLoggedin){
      <Navigate to="/login" />
    }
  }, [isLoggedin])

  return (

    isLoggedin ?
    (
    <>
        <div className="min-height-300 bg-primary position-absolute w-100"></div>
        <Sidebar/>
        <main className="main-content position-relative border-radius-lg ">
            <Navbar/>
            <div className="container-fluid py-4" style={{ minHeight: '100vh' }}>
                <Outlet/>
                <Mainfooter/>
            </div>
        </main>
        <ToastContainer autoClose={2000} />
    </>
    )
    : <Navigate to={'/provider/login'}/>
  )
}

export default MainLayout