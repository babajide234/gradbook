import React, { useEffect, useState, useMemo } from 'react'
import { details, updateDetails,schools } from '../utils/thunkFunc';
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation  } from 'react-router-dom';
import { 
    ALUMINI_DETAILS, 
    PROVIDER_DETAILS, 
    SCHOOLS_DETAILS,
    PROVIDER_RESET_PASSWORD,
    PROVIDER_UPDATE_DETAILS,
    SCHOOLS_UPDATE_DETAILS,
    ALUMINI_DETAILS_UPDATE

 } from '../utils/constants';
import { toast } from 'react-toastify';
import Modal from '../components/modal';

const Profile = () => {
    const { token, user } = useSelector((state)=> state.auth);
    const [ userdetails, setUserDetails] = useState({})
    const [ data, setData] = useState(false)
    const [ endpoint, setEndpoint] = useState('')
    const [ updateEndpoint, setUpdateEndpoint] = useState('')
    const [ accType, setAccType] = useState('')
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        if(user.role == 'Admin' && !user.school_id){
            setEndpoint(PROVIDER_DETAILS);
            setUpdateEndpoint(PROVIDER_UPDATE_DETAILS);
            setAccType('Admin');
        }else if(user.school_id && !user.alumni_ref){
            setEndpoint(SCHOOLS_DETAILS);
            setUpdateEndpoint(SCHOOLS_UPDATE_DETAILS);
            setAccType('School');
        }else if( user.school_id && user.alumni_ref){
            setEndpoint( ALUMINI_DETAILS );
            setUpdateEndpoint( ALUMINI_DETAILS_UPDATE );
            setAccType('Alumni');
        }
        // setEndpoint( ALUMINI_DETAILS );
    }, []);
    useEffect(() => {
        console.log("endpoint", endpoint);
        if(endpoint){
            getDetails();
        }
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
                const data= res.payload.data;
                console.log("details: ", data.data[0]);
                if(data.status == 'success'){
                    setUserDetails(data.data[0])
                    setData(true);
                    toast.success(data.message);
                }else{
                    toast.error(data.message);
                    setData(false);
                }
            })
            .catch((err)=>{
                console.log(err)
            })
    }


    const initialValues = {
            lastname:  data ? userdetails.lastname : ""  ,
            firstname:  data ? userdetails.firstname :"" ,
            email:  data ? userdetails.email :"" ,
            phone:  data ? userdetails.phone :"" ,
        };

    const handleSubmit= (values, { setSubmitting })=>{

        const payload = {
                endpoint:updateEndpoint,
                values:{
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
        }
        
        dispatch(updateDetails(payload))
        .then((res)=>{
            const data= res.payload.data;
            if(data.status == 'success'){
                toast.success(data.message);
                setSubmitting(false);
            }else{
                setSubmitting(false);
                toast.error(data.message);
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }



  return (
    <>
        <div className="row">
            <div className="col-lg-12 col-12 mb-lg-0 mb-4">
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
                            <h5 className="mb-1 text-capitalize">
                                { userdetails.school_id ?  userdetails.name : userdetails.firstname + userdetails.lastname}
                            </h5>
                            <p className="mb-0 font-weight-bold text-sm text-capitalize">
                                { userdetails.alumni_ref ? userdetails.alumni_ref : userdetails.school_id ? userdetails.headline : userdetails.headline }
                            </p>
                            </div>
                        </div>
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
                    <p className="mb-0">Edit Profile</p>
                    <div className="">
                        <button className="btn btn-primary btn-sm ms-auto" data-bs-toggle="modal" data-bs-target="#reset">Reset Password</button>
                    </div>
                </div>
                <div className="card-body">
                    {
                        data && (
                            <>
                                <p className="text-uppercase text-sm">User Information</p>
                                { accType == 'Admin' && (
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
                                                            <button className='btn btn-primary btn-sm ms-auto'>
                                                                {
                                                                    isSubmitting ? (
                                                                        <div className="spinner-border text-primary" role="status">
                                                                            <span className="visually-hidden">Loading...</span>
                                                                        </div>
                                                                    ) : (
                                                                        'Update'
                                                                    )
                                                                }
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                        )}
                                    </Formik>
                                )}
                                { accType == 'Alumni' && (
                                    <Formik initialValues={
                                        {
                                            alumni_ref : "",
                                            country : "",
                                            email : "",
                                            facebook : "",
                                            firstname : "",
                                            headline : "",
                                            instagram : "",
                                            lastname : "",
                                            phone : "",
                                            school_id : "",
                                            twitter : "",
                                            whatsapp : "",
                                            youtube : "",
                                        }
                                    } enableReinitialize={true} onSubmit={handleSubmit}>
                                        {({ values, handleChange, handleSubmit, isSubmitting }) => (
                                                <form onSubmit={handleSubmit}>
                                               
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label htmlFor="example-text-input" className="form-control-label">School Name</label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name='name'
                                                                value={values.name}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label htmlFor="example-text-input" className="form-control-label">School Headline</label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name='headline'
                                                                value={values.headline}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
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
                                                                value={values.phone}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="example-text-input" className="form-control-label">Facebook</label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name='facebook'
                                                                value={values.facebook}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="example-text-input" className="form-control-label">Twitter</label>
                                                            <input

                                                                className="form-control"
                                                                type="text"
                                                                name='twitter'
                                                                value={values.twitter}
                                                                onChange={handleChange}
                                                                
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="example-text-input" className="form-control-label">Instagram</label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name='instagram'
                                                                value={values.instagram}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="example-text-input" className="form-control-label">Youtube</label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name='youtube'
                                                                value={values.youtube}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                                            {
                                                                isSubmitting ? (
                                                                    <div className="spinner-border text-light" role="status">
                                                                        <span className="visually-hidden">Loading...</span>
                                                                    </div>
                                                                ) : (
                                                                    'Submit'
                                                                )
                                                            }
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        )}
                                    </Formik>
                                )}

                                { accType == 'School' && (
                                    <Formik initialValues={{
                                        address : Object.keys(userdetails).length !== 0   ? userdetails.address : '',
                                        anthem : Object.keys(userdetails).length !== 0   ? userdetails.anthem : '',
                                        city : Object.keys(userdetails).length !== 0   ? userdetails.city : '',
                                        country : Object.keys(userdetails).length !== 0   ? userdetails.country : '',
                                        state : Object.keys(userdetails).length !== 0   ? userdetails.state : '',
                                        email : Object.keys(userdetails).length !== 0   ? userdetails.email : '',
                                        established : Object.keys(userdetails).length !== 0   ? userdetails.established : '',
                                        headline : Object.keys(userdetails).length !== 0   ? userdetails.headline : '',
                                        motto : Object.keys(userdetails).length !== 0   ? userdetails.motto : '',
                                        name : Object.keys(userdetails).length !== 0   ? userdetails.name : '',
                                        phone : Object.keys(userdetails).length !== 0   ? userdetails.phone : '',
                                        twitter : Object.keys(userdetails).length !== 0   ? userdetails.twitter : '',
                                        instagram : Object.keys(userdetails).length !== 0   ? userdetails.instagram : '',
                                        facebook : Object.keys(userdetails).length !== 0   ? userdetails.facebook : '',
                                        whatsapp : Object.keys(userdetails).length !== 0   ? userdetails.whatsapp : '',
                                        youtube : Object.keys(userdetails).length !== 0   ? userdetails .youtube : '',
                                    }} 
                                    enableReinitialize={true} 
                                    onSubmit={(values, { setSubmitting }) => {
                                        const payload = {

                                            endpoint: '/school/update-details',
                                            values:{

                                                token: token,
                                                
                                                address : values.address,
                                                anthem : values.anthem,
                                                city : values.city,
                                                country : values.country,
                                                state : values.state,
                                                email : values.email,
                                                established : values.established,
                                                headline : values.headline,
                                                motto : values.motto,
                                                name : values.name,
                                                phone : values.phone,
                                                twitter : values.twitter,
                                                instagram : values.instagram,
                                                facebook : values.facebook,
                                                whatsapp : values.whatsapp,
                                                youtube : values.youtube,
                                            }
                                        }

                                        dispatch(updateDetails(payload))
                                        .then((res)=>{
                                            const data = res.payload.data
                                            if(data.status == 'success'){
                                                toast.success(data.message)
                                                setSubmitting(false)
                                                getDetails();
                                            }else{
                                                toast.error(data.message)
                                                setSubmitting(false)
                                            }
                                        })
                                        .catch((err)=>{
                                            console.log(err)
                                            setSubmitting(false)
                                        })

                                    }}>
                                        {({ values, handleChange, handleSubmit, isSubmitting }) => (
                                                <form onSubmit={handleSubmit}>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label htmlFor="example-text-input" className="form-control-label">School Name</label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    name='name'
                                                                    value={values.name}
                                                                    onChange={handleChange}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label htmlFor="example-text-input" className="form-control-label">School Headline</label>
                                                                <input
                                                                    className="form-control"

                                                                    type="text"
                                                                    name='headline'
                                                                    value={values.headline}
                                                                    onChange={handleChange}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
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
                                                                    value={values.phone}
                                                                    onChange={handleChange}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label htmlFor="example-text-input" className="form-control-label">School Address</label>
                                                                
                                                                <textarea 
                                                                    name='address'
                                                                    className="form-control"
                                                                    value={values.address}
                                                                    onChange={handleChange}
                                                                ></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label htmlFor="example-text-input" className="form-control-label">City</label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    name='city'
                                                                    value={values.city}
                                                                    onChange={handleChange}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label htmlFor="example-text-input" className="form-control-label">State</label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    name='state'
                                                                    value={values.state}
                                                                    onChange={handleChange}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label htmlFor="example-text-input" className="form-control-label">Country</label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    name='country'
                                                                    value={values.country}
                                                                    onChange={handleChange}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label htmlFor="example-text-input" className="form-control-label">Facebook</label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    name='facebook'
                                                                    value={values.facebook}
                                                                    onChange={handleChange}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label htmlFor="example-text-input" className="form-control-label">Twitter</label>
                                                                <input

                                                                    className="form-control"
                                                                    type="text"
                                                                    name='twitter'
                                                                    value={values.twitter}
                                                                    onChange={handleChange}
                                                                    
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label htmlFor="example-text-input" className="form-control-label">Instagram</label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    name='instagram'
                                                                    value={values.instagram}
                                                                    onChange={handleChange}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label htmlFor="example-text-input" className="form-control-label">Linkedin</label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    name='linkedin'
                                                                    value={values.linkedin}
                                                                    onChange={handleChange}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label htmlFor="example-text-input" className="form-control-label">Youtube</label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    name='youtube'
                                                                    value={values.youtube}
                                                                    onChange={handleChange}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label htmlFor="example-text-input" className="form-control-label">Website</label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    name='website'
                                                                    value={values.website}
                                                                    onChange={handleChange}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label htmlFor="example-text-input" className="form-control-label">anthem</label>
                                                                <textarea
                                                                    className="form-control"
                                                                    type="text"
                                                                    name='anthem'
                                                                    value={values.anthem}
                                                                    onChange={handleChange}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label htmlFor="example-text-input" className="form-control-label">headline</label>
                                                                <textarea
                                                                    className="form-control"
                                                                    type="text"
                                                                    name='headline'
                                                                    value={values.headline}
                                                                    onChange={handleChange}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label htmlFor="example-text-input" className="form-control-label">motto</label>
                                                                <textarea
                                                                    className="form-control"
                                                                    type="text"
                                                                    name='motto'
                                                                    value={values.motto}
                                                                    onChange={handleChange}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label htmlFor="example-text-input" className="form-control-label">established</label>

                                                                 <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    name='established'
                                                                    value={values.established}
                                                                    onChange={handleChange}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                                                {
                                                                    isSubmitting ? (
                                                                        <div className="spinner-border text-light" role="status">
                                                                            <span className="visually-hidden">Loading...</span>
                                                                        </div>
                                                                    ) : (
                                                                        'Submit'
                                                                    )
                                                                }
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                        )}
                                    </Formik>
                                )}
                            </>
                        )
                    }
                    {
                        !data && (
                            <div className="text-center">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        )
                    }
                
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
                        {data && useruserdetails ? userdetails?.firstname }<span className="font-weight-light">, 35</span>
                        </h5>
                    </div>
                    </div>
                </div> */}
            </div>
        </div>
        <div className="row">
            <Modal id="reset" title="Reset Password" size="sm">
                <Formik 
                    initialValues = {{
                            email:''
                        }}
                    enableReinitialize={true} 
                    onSubmit={() =>{
                        const payload = {
                            endpoint: PROVIDER_RESET_PASSWORD,
                            values:{
                                email:values.email
                            },
                        }

                        dispatch(schools(payload))
                        .then((res) => {
                            const data = res.payload.data;
                            if (data.status === 'success') {
                                toast.success(data.message);
                            } else {
                                toast.error(data.message);
                            }
                        })
                        .catch((err) => {
                            toast.error(err.message);
                        });
                    }}
                >
                    {({ values, handleChange, handleSubmit, isSubmitting }) => (
                            <form onSubmit={handleSubmit}>
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
                                <div className="col-md-4">
                                    <button type="submit" className="btn btn-primary btn-sm ms-auto">Save</button>
                                </div>
                            </form>
                    )}
                </Formik>
            </Modal>
        </div>
        </div>
    </>
)}
export default Profile