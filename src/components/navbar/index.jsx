import React,{ useEffect } from 'react'
import Card from '../../assets/img/card.svg';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../../store/reducers/AuthSlice";
import useBreadcrumbs from "use-react-router-breadcrumbs";

const Navbar = () => {
    
    const { isLoggedin } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = (e)=>{
        e.preventDefault();
        dispatch(logout());
    }
    const breadcrumbs = useBreadcrumbs();

    useEffect(() => {
        console.log(breadcrumbs);
    }, [])
    const iconNavbarSidenav = document.getElementById('iconNavbarSidenav');
    const iconSidenav = document.getElementById('iconSidenav');
    const sidenav = document.getElementById('sidenav-main');
    let body = document.getElementsByTagName('body')[0];
    let className = 'g-sidenav-pinned';

    const  hangdleClick = (e) => {
        // e.preventDefault();
        console.log('click');
        if (body.classList.contains(className)) {
            console.log('remove class');
            body.classList.remove(className);
            setTimeout(function() {
                sidenav.classList.remove('bg-white');
            }, 100);
            sidenav.classList.remove('bg-transparent');
            iconSidenav.classList.add('d-none');
        } else {
            body.classList.add(className);
            sidenav.classList.add('bg-white');
            sidenav.classList.remove('bg-transparent');
            iconSidenav.classList.remove('d-none');
        }
    }


  return (
    <>
        <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl " id="navbarBlur" data-scroll="false">
            <div className="container-fluid py-1 px-3">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                        {
                            breadcrumbs.map(({ match, breadcrumb }) => (
                                <li className="breadcrumb-item text-sm" key={match.url}>
                                    <a className="opacity-5 text-white" href={
                                        match.url === '/' ? '/' : match.url
                                    }>
                                        {breadcrumb}
                                    </a>
                                </li>
                            ))
                        }
                    </ol>
                    <h6 className="font-weight-bolder text-white mb-0">{ breadcrumbs[1].breadcrumb}</h6>
                </nav>
                <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
                    <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                    </div>
                    <ul className="navbar-nav  justify-content-end">
                        <li className="nav-item d-flex align-items-center">
                            <a href="" onClick={ handleLogout }  className="nav-link d-sm-inline d-none text-white font-weight-bold px-0">
                                {
                                    isLoggedin ? (
                                        <i className="fa fa-sign-out me-sm-1" aria-hidden="true"></i>
                                        ): (
                                        <i className="fa fa-user me-sm-1"></i>
                                        )
                                }
                                <span className="d-sm-inline d-none">{ isLoggedin ? 'Logout':'Sign In' }</span>
                            </a>
                        </li>
                        <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
                            <a href="#" className="nav-link text-white p-0" id="iconNavbarSidenav" onClick={()=>hangdleClick()}>
                                <div className="sidenav-toggler-inner">
                                <i className="sidenav-toggler-line bg-white"></i>
                                <i className="sidenav-toggler-line bg-white"></i>
                                <i className="sidenav-toggler-line bg-white"></i>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        
    </>
  )
}

export default Navbar