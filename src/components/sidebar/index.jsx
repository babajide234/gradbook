import React from 'react'
import Logo from '../../assets/img/logo.png'
import { Link } from 'react-router-dom'
import { ProviderMenu, SchoolMenu, AluminiMenu } from '../../utils/constants'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from "../../store/reducers/AuthSlice";

const Sidebar = () => {
    
  const { user } = useSelector((state)=> state.auth);
  const dispatch = useDispatch();
    
  const handleLogout = (e)=>{
    e.preventDefault();
    dispatch(logout());
}
  return (
    <>
        <aside className="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4 " id="sidenav-main">
            <div className="sidenav-header">
                <i className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
                <Link className="navbar-brand m-0" to="/" target="_blank">
                    <img src={Logo} className="navbar-brand-img h-100" alt="main_logo"/>
                    <span className="ms-1 font-weight-bold">GradBook</span>
                </Link>
            </div>
            <hr className="horizontal dark mt-0"/>
            <div className="collapse navbar-collapse  w-auto min-vh-80 " id="sidenav-collapse-main">
                <ul className="navbar-nav">
                    {
                        user.role == 'Admin' && !user.school_id &&
                        (
                            ProviderMenu.map((item)=>(

                                <li className="nav-item" key={item.name}>
                                    <Link className="nav-link"  to={item.path}>
                                        <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                            <i className={item.icon}></i>
                                        </div>
                                        <span className="nav-link-text ms-1">{ item.name}</span>
                                    </Link>
                                </li>
                            ))
                        )
                    }
                    {
                        user.school_id && !user.alumni_ref && (
                            SchoolMenu.map((item)=>(

                                <li className="nav-item" key={item.name}>
                                    <Link className="nav-link"  to={item.path}>
                                        <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                            <i className={item.icon}></i>
                                        </div>
                                        <span className="nav-link-text ms-1">{ item.name}</span>
                                    </Link>
                                </li>
                            ))
                        )
                    }
                    {
                        user.school_id && user.alumni_ref && (
                            AluminiMenu.map((item)=>(
                                <li className="nav-item" key={item.name}>
                                    <Link className="nav-link"  to={item.path}>
                                        <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                            <i className={item.icon}></i>
                                        </div>
                                        <span className="nav-link-text ms-1">{ item.name}</span>
                                    </Link>
                                </li>
                            ))
                        )
                    }
                    <li className="nav-item d-sm-none d-flex" >
                        <a className="nav-link"  href='' onClick={handleLogout}>
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="fa fa-sign-out me-sm-1"></i>
                            </div>
                            <span className="nav-link-text ms-1">Logout</span>
                        </a>
                    </li>
                </ul>
            </div>
            
        </aside>
    </>
  )
}

export default Sidebar