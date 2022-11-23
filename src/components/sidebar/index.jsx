import React from 'react'
import Logo from '../../assets/img/logo-ct-dark.png'
import { Link } from 'react-router-dom'
import { ProviderMenu, SchoolMenu } from '../../utils/constants'
import { useSelector } from 'react-redux'
const Sidebar = () => {
    
  const { user } = useSelector((state)=> state.auth);

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
            <div className="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
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
                        user.school_id && (
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

                </ul>
            </div>
            
        </aside>
    </>
  )
}

export default Sidebar