import React, { useState, useEffect,useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Formik } from 'formik';
import {  schools } from '../utils/thunkFunc';
import { 
    SCHOOL_SESSION_DETAILS, 
    SCHOOL_SESSION_REGISTER,
    SCHOOL_SESSION_UPDATE,
    SCHOOLS_CLASS_LIST,
    SCHOOLS_YEAR_LIST,
    ALUMINI_DETAILS,
    UPLOAD_REGISTER

 } from '../utils/constants';
 import { useQuery } from 'react-query'

import Modal from '../components/modal';

const Session = () => {
    const { token } = useSelector((state)=> state.auth);
    const dispatch = useDispatch();

    const [yearList, setYearList] = useState([]);
    const [classList, setClassList] = useState([]);
    const [aluminiList, setAluminiList] = useState([]);
    const [sessionList, setSessionList] = useState([]);
    const [updateSession, setUpdateSession] = useState(false);
    const [singleSession, setSingleSession] = useState([]);

    const modalCLose = React.useRef(null)

    const getSession = () => {
            const payload = {
                endpoint:SCHOOL_SESSION_DETAILS,
                values:{
                    token:token
                }
            }
            dispatch(schools(payload))
            .then((res)=>{
                var data = res.payload.data;
                setSessionList(data.data)
                console.log(res);
            })
            .catch((err)=>{
                console.log(err);
            })
    }
    
    useEffect(()=>{
        getSession();
    },[])

    const getAlumini = ()=>{
        const payload = {
          endpoint: ALUMINI_DETAILS,
          values:{
              token:token,
          }
        }
        dispatch(schools(payload))
        .then((result) => {
  
          if(result.payload.data.status == 'success'){
            setAluminiList(result.payload.data.data );
            getClases();
          }else{
            setAluminiList([]);
          }
              console.log(result);
          }).catch((err) => {
              console.log(err);
          });
    }

    const getYear=  ()=>{
        const payload = {
        endpoint: SCHOOLS_YEAR_LIST,
        values:{
            token:token,
        }
        }
        dispatch(schools(payload))
        .then((result) => {
        if(result.payload.data.status == 'success'){
            setYearList(result.payload.data.data);
        }else{
            setYearList([]);

        }
            console.log(result);
        }).catch((err) => {
            console.log(err);
        });
    }

    const getClases = ()=>{
        const payload = {
            endpoint: SCHOOLS_CLASS_LIST,
            values:{
                token:token,
            }
        }
        dispatch(schools(payload))
        .then((result) => {
        if(result.payload.data.status == 'success'){
            setClassList(result.payload.data.data);
            getYear();
        }else{
            setClassList([]);

        }
            console.log(result);
        }).catch((err) => {
            console.log(err);
        });
    }

    const addNewSession = ()=>{
        
        
        getAlumini();
    }

    const getSingledata = (school_id,year_id,class_id,alum_ref)=>{
        
        !yearList && getYear();
        !classList && getClases();
        !aluminiList && getAlumini();   

        setUpdateSession(true);

        const payload = {
            endpoint:SCHOOL_SESSION_DETAILS,
            values:{
                token:token,
                year:year_id,
                class:class_id,
                school_id:school_id,
                alumni_ref:alum_ref,
            }
        }
        dispatch(schools(payload))
        .then((res)=>{
            console.log(res);

            var data = res.payload.data;
            if(data.status == 'success'){
                setSingleSession(data.data)
            }else{
                setSingleSession(data.data)
            }
        })
        .catch((err)=>{
            console.log(err);
        }
        )
    }

    const deleteSession = (id)=>{
        const payload = {
            endpoint:SCHOOL_SESSION_DETAILS,
            values:{
                token:token,
                alumni_session_id: id
            }
        }
        dispatch(schools(payload))
        .then((res)=>{

            var data = res.payload.data;
            if(data.status == 'success'){
                getSession();
            }else{
                getSession();
            }
        })
        .catch((err)=>{
            console.log(err);
        }
        )
    }

  return (
    <>
        <div className="container-fluid py-4">
            <div className="row">
                <div className="col-lg-12 col-md-6 col-sm-12">
                    <div className="card">
                        <div className="card-header pb-0">
                            <h6>Session</h6>
                            <div className="">
                                <button className="btn btn-sm bg-gradient-info mx-3 " data-bs-toggle="modal" data-bs-target="#new" onClick={ () => addNewSession() }>Add New Session</button>
                                <button className="btn btn-sm bg-gradient-info" data-bs-toggle="modal" data-bs-target="#upload" >Upload CSV</button>
                            </div>
                        </div>
                        <div className="card-body px-0 pt-0 pb-2">
                            <div className="table-responsive p-0">
                                <table className="table align-items-center mb-0">
                                    <thead>
                                        <tr>    
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">photo</th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name</th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Ref</th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Headline</th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Class</th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Year</th>
                                            <th className="text-secondary opacity-7"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            {
                                                sessionList.map((item, index)=>{
                                                    return(
                                                        <tr key={index}>
                                                            <td className="align-middle text-center">
                                                                <img src={item.photo
                                                                } className="avatar avatar-sm rounded-circle me-2" alt="user1" />
                                                            </td>
                                                            <td className="align-middle text-center">
                                                                <h6 className="mb-0 text-sm">{item.firstname} {item.lastname}</h6>
                                                            </td>
                                                            <td className="align-middle text-center">
                                                                <h6 className="mb-0 text-sm">{item.alumni_ref}</h6>
                                                            </td>
                                                            <td className="align-middle text-center">
                                                                <h6 className="mb-0 text-sm">{item.headline}</h6>
                                                            </td>
                                                            <td className="align-middle text-center">
                                                                <h6 className="mb-0 text-sm">{item.class}</h6>
                                                            </td>
                                                            <td className="align-middle text-center">
                                                                <h6 className="mb-0 text-sm">{item.year}</h6>
                                                            </td>
                                                            <td className="align-middle text-center">
                                                                <button className="btn btn-sm bg-gradient-info" data-bs-toggle="modal" data-bs-target="#edit" onClick={()=> getSingledata(item.school_id,item.year,item.class,item.alumni_ref)}  >Edit</button>
                                                                <button className="btn btn-sm bg-gradient-danger" onClick={()=> deleteSession(item.alumni_session_id)} >
                                                                    Delete
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <Modal id={"new"} title={"New Session"} >
                    <Formik
                        initialValues={{
                            alumni_ref: "",
                            school_class_id: "",
                            school_year_id: "",
                            headline: ""
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            const payload = {
                                endpoint:SCHOOL_SESSION_REGISTER,
                                values:{
                                    token:token,
                                    alumni_ref: values.alumni_ref,
                                    school_class_id: values.school_class_id,
                                    school_year_id: values.school_year_id,
                                    headline: values.headline
                                }
                            }
                            dispatch(schools(payload))
                            .then((res)=>{
                                const data = res.payload.data;
                                if(data.status == 'success'){
                                    setSubmitting(false);
                                    modalCLose.current.closeModal();
                                    getSession();
                                }else{
                                    modalCLose.current.closeModal();
                                    setSubmitting(false);
                                }
                            }).catch((err)=>{
                                console.log(err);
                            }
                            )
                        }}
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
                            <form onSubmit={handleSubmit}>

                                <div class="form-group">
                                    <label className="form-label">Alumni</label>
                                    <div class="input-group">
                                        <select className="form-control" name="alumni_ref" id="" onChange={handleChange}>
                                            <option value="">Select Alumni</option>
                                            {aluminiList.map((item, index) => (
                                                <option value={item.alumni_ref}>{item.alumni_ref}: {item.firstname+' '+item.lastname}</option>
                                            ))}
                                        </select>
                                        <span class="input-group-text" id="basic-addon1">
                                            {
                                                aluminiList ? <span className='ni ni-check-bold text-success'></span>  : <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            }
                                        </span>
                                    </div>
                                </div>
                                <div class="form-group">
                                <label className="form-label">Year</label>
                                    <div class="input-group">
                                    <select className="form-control" name="school_year_id" id="" onChange={handleChange}>
                                        <option value="">Select Year</option>
                                        {yearList.map((item, index) => (
                                            <option value={item.year_id}>{item.year}</option>
                                        ))}
                                    </select>
                                    <span class="input-group-text" id="basic-addon1">
                                        {
                                            yearList ? <span className='ni ni-check-bold text-success'></span>  : <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        }
                                    </span>
                                </div>
                                </div>

                                <div class="form-group">
                                <label className="form-label">Class</label>
                                    <div class="input-group">
                                    <select 
                                        name="school_class_id" 
                                        id=""
                                        onChange={handleChange} className="form-control"
                                    >
                                        <option value="">Select Class</option>
                                        {classList.map((item, index) => (
                                            <option value={item.class_id}>{item.class}</option>
                                        ))}
                                    </select>
                                    <span class="input-group-text" id="basic-addon1">
                                        {
                                            classList ? <span className='ni ni-check-bold text-success'></span>  : <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        }
                                    </span>
                                </div>
                                </div>
                                <div class="form-group">
                                    <label className="form-label">Headline</label>
                                    <div class="input-group">
                                        <input type="text" className="form-control" name="headline" onChange={handleChange} onBlur={handleBlur} value={values.headline} />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                                        {
                                            isSubmitting ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Submit'
                                        }
                                    </button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </Modal>
                <Modal id={"edit"} title={"Edit Session"} >
                    <Formik
                        initialValues={{
                            alumni_ref: singleSession ? singleSession.alumni_ref : "",
                            school_class_id: singleSession ? singleSession.school_class_id :"",
                            school_year_id: singleSession ? singleSession.school_year_id : "",
                            headline: singleSession ? singleSession.headline : ""
                        }}
                        enableReinitialize = {true}
                        onSubmit={(values, { setSubmitting }) => {
                            const payload = {
                                endpoint:SCHOOL_SESSION_UPDATE,
                                values:{
                                    token:token,
                                    alumni_session_id: values.alumni_session_id,
                                    alumni_ref: values.alumni_ref,
                                    school_class_id: values.school_class_id,
                                    school_year_id: values.school_year_id,
                                    headline: values.headline
                                }
                            }   
                            dispatch(schools(payload))
                            .then((res)=>{
                                console.log(res);
                                if(res.payload.data.status == 'success'){
                                    setSubmitting(false);

                                    modalCLose.current.closeModal();
                                    getSession();
                                }else{
                                    setSubmitting(false);
                                }
                                
                            }
                            )
                            .catch((err)=>{
                                console.log(err);
                            }
                            )
                        }}
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
                            <form onSubmit={handleSubmit}>
                                <div class="form-group">
                                    <label className="form-label">Alumni</label>
                                    <div class="input-group">
                                        <select className="form-control" name="alumni_ref" id="" onChange={handleChange}>
                                            <option value="">Select Alumni</option>
                                            {aluminiList.map((item, index) => (
                                                <option value={item.alumni_ref}>{item.alumni_ref}: {item.firstname+' '+item.lastname}</option>
                                            ))}
                                        </select>
                                        <span class="input-group-text" id="basic-addon1">
                                            {
                                                aluminiList ? <span className='ni ni-check-bold text-success'></span>  : <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            }
                                        </span>
                                    </div>
                                </div>
                                <div class="form-group">
                                <label className="form-label">Year</label>
                                    <div class="input-group">
                                    <select className="form-control" name="school_year_id" id="" onChange={handleChange}>
                                        <option value="">Select Year</option>
                                        {yearList.map((item, index) => (
                                            <option value={item.year_id}>{item.year}</option>
                                        ))}
                                    </select>
                                    <span class="input-group-text" id="basic-addon1">
                                        {
                                            yearList ? <span className='ni ni-check-bold text-success'></span>  : <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        }
                                    </span>
                                </div>
                                </div>

                                <div class="form-group">
                                <label className="form-label">Class</label>
                                    <div class="input-group">
                                    <select 
                                        name="school_class_id" 
                                        id=""
                                        onChange={handleChange} className="form-control"
                                    >
                                        <option value="">Select Class</option>
                                        {classList.map((item, index) => (
                                            <option value={item.class_id}>{item.class}</option>
                                        ))}
                                    </select>
                                    <span class="input-group-text" id="basic-addon1">
                                        {
                                            classList ? <span className='ni ni-check-bold text-success'></span>  : <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        }
                                    </span>
                                </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Headline</label>
                                    <input type="text" className="form-control" name="headline" onChange={handleChange} onBlur={handleBlur} value={values.headline} />

                                </div>
                                <div className="mb-3">
                                    <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                                        {
                                            isSubmitting ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Submit'
                                        }
                                    </button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </Modal>
                <Modal id={"upload"} title={"Upload Register"}>

                    <Formik
                        initialValues={{
                            file: null
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            console.log(values.file);
                            // const payload = {
                            //     endpoint:UPLOAD_REGISTER,
                            //     values:{
                            //         token:token,
                            //         file: values.file
                            //     }
                            // }
                            // dispatch(schools(payload))
                            // .then((res)=>{
                            //     console.log(res);
                            //     if(res.payload.data.status == 'success'){
                            //         setSubmitting(false);

                            //         modalCLose.current.closeModal();
                            //         getSession();
                            //     }else{
                            //         setSubmitting(false);
                            //     }

                            // })
                            // .catch((err)=>{
                            //     console.log(err);
                            // })
                        }}

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
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Upload Register</label>
                                    <input type="file" className="form-control" name="file" onChange={handleChange} onBlur={handleBlur} value={values.file} />

                                </div>
                                <div className="mb-3">
                                    <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                                        {
                                            isSubmitting ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Submit'
                                        }
                                    </button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </Modal>
            </div>
        </div>
    </>
  )
}

export default Session