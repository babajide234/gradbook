import React, { useEffect, useState, useMemo } from 'react'
import { details, updateDetails,schools } from '../utils/thunkFunc';
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation  } from 'react-router-dom';
import { ALUMINI_DETAILS, PROVIDER_DETAILS, SCHOOLS_DETAILS } from '../utils/constants';
import { toast } from 'react-toastify';

const Profile = () => {
    const { token, user } = useSelector((state)=> state.auth);
    const [ userdetails, setUserDetails] = useState("")
    const [ data, setData] = useState(false)
    const [ endpoint, setEndpoint] = useState('')

    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        if(user.role == 'Admin'){
            setEndpoint(PROVIDER_DETAILS);
        }
        if(user.school_id && !user.alumni_ref){
            setEndpoint(SCHOOLS_DETAILS);
        }
        if( user.school_id && user.alumni_ref){
            setEndpoint( ALUMINI_DETAILS );
        }
        // setEndpoint( ALUMINI_DETAILS );
    }, [user]);
    
    useEffect(() => {
        console.log('====================================');
        console.log(userdetails);
        console.log('====================================');
    }, [userdetails]);

    useEffect(() => {
        console.log('====================================');
        console.log(endpoint);
        console.log('====================================');
    }, [endpoint]);
    

    const getDetails = () => {
            const payload = {
                endpoint:endpoint,
                values:{
                    token:token,
                }
            }
            dispatch(details(payload))
            .then((res)=>{
                const data= res.payload.data.data;
                console.log("details: ", data[0]);
                if(data.status == 'success'){
                    setUserDetails(data[0])
                    setData(true);
                    toast.success(data.message);
                }else{
                    setData(false);
                }
                console.log(userdetails)
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    useEffect(() => {
        getDetails();
    }, [])

    const initialValues = {
            lastname:  data ? userdetails.lastname : ""  ,
            firstname:  data ? userdetails.firstname :"" ,
            email:  data ? userdetails.email :"" ,
            phone:  data ? userdetails.phone :"" ,
        };

    const handleSubmit= (values)=>{
        const payload = {
                token: token, //required
                lastname: values.lastname,
                firstname: values.firstname,
                email: values.email,
                phone: values.phone,
            
                // password: "",
                // active: "", //enum: Yes or No
                // role: "", //enum:  Finance or Admin or Reprensative [This can't be change from ordinary account holder but from management with access_control of Full or Partial]
                // access_control: "", //enum: Full or Partial or None [This can't be change from ordinary account holder but from management with access_control of Full or Partial]
                // management: "" //enum: Yes or No [Passed if authenticated account is updating lesser account holders settings and can only change roles and access_control]
        }
        
        dispatch(updateDetails(payload))
        .then((res)=>{
            console.log("update",res);
        })
    }



  return (
    <>

        <div className="card shadow-lg mx-4 card-profile-bottom">
        <div className="card-body p-3">
            <div className="row gx-4">
            <div className="col-auto">
                <div className="avatar avatar-xl position-relative">
                <img src="../assets/img/team-1.jpg" alt="profile_image" className="w-100 border-radius-lg shadow-sm"/>
                </div>
            </div>
            <div className="col-auto my-auto">
                <div className="h-100">
                <h5 className="mb-1">
                    { userdetails.firstname} { userdetails.lastname}
                </h5>
                <p className="mb-0 font-weight-bold text-sm">
                    { userdetails.alumni_ref ? userdetails.alumni_ref : userdetails.school_id }
                </p>
                </div>
            </div>
            </div>
        </div>
        </div>
        <div className="container-fluid py-4">
        <div className="row">
            <div className="col-md-8">
            <div className="card">
                <div className="card-header pb-0">
                <div className="d-flex align-items-center">
                    <p className="mb-0">Edit Profile</p>
                    <button className="btn btn-primary btn-sm ms-auto">Settings</button>
                </div>
                </div>
                <div className="card-body">
                <p className="text-uppercase text-sm">User Information</p>

                <Formik initialValues={initialValues} enableReinitialize={true} onSubmit={handleSubmit}>
                    {({ values, handleChange, handleSubmit, isSubmitting }) => (
                            <form onSubmit={handleSubmit}>        
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="example-text-input" className="form-control-label">Email Address</label>
                                            <input 
                                                className="form-control" 
                                                type="text" 
                                                name='email'
                                                value={values.email}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="example-text-input" className="form-control-label">phone</label>
                                            <input 
                                                className="form-control" 
                                                type="phone" 
                                                name='phone'
                                                onChange={handleChange}
                                                value={values.phone}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="example-text-input" className="form-control-label">First name</label>
                                            <input 
                                                className="form-control" 
                                                type="text" 
                                                name='firstname'
                                                onChange={handleChange}
                                                value={values.firstname}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="example-text-input" className="form-control-label">Last name</label>
                                            <input 
                                                className="form-control" 
                                                type="text" 
                                                name='lastname'
                                                onChange={handleChange}
                                                value={values.lastname}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <button type="submit" className="btn btn-primary btn-sm ms-auto">Save</button>
                                    </div>
                                </div>
                            </form>
                    )}
                </Formik>
                
                </div>
            </div>
            </div>
            <div className="col-md-4">
                {/* <div className="card card-profile">
                    <img src="../assets/img/bg-profile.jpg" alt="Image placeholder" className="card-img-top"/>
                    <div className="row justify-content-center">
                    <div className="col-4 col-lg-4 order-lg-2">
                        <div className="mt-n4 mt-lg-n6 mb-4 mb-lg-0">
                        <a href="#">
                            <img src="../assets/img/team-2.jpg" className="rounded-circle img-fluid border border-2 border-white"/>
                        </a>
                        </div>
                    </div>
                    </div>
                    <div className="card-header text-center border-0 pt-0 pt-lg-2 pb-4 pb-lg-3">
                    <div className="d-flex justify-content-between">
                        <a href="#" className="btn btn-sm btn-info mb-0 d-none d-lg-block">Connect</a>
                        <a href="#" className="btn btn-sm btn-info mb-0 d-block d-lg-none"><i className="ni ni-collection"></i></a>
                        <a href="#" className="btn btn-sm btn-dark float-right mb-0 d-none d-lg-block">Message</a>
                        <a href="#" className="btn btn-sm btn-dark float-right mb-0 d-block d-lg-none"><i className="ni ni-email-83"></i></a>
                    </div>
                    </div>
                    <div className="card-body pt-0">
                
                    <div className="text-center mt-4">
                        <h5>
                        {data && userdetails?.firstname }<span className="font-weight-light">, 35</span>
                        </h5>
                    </div>
                    </div>
                </div> */}
            </div>
        </div>
        </div>
    </>
  )
}

export default Profile