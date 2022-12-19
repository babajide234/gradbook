import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { useLocation } from 'react-router-dom'
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { register, schools } from '../utils/thunkFunc';
import { SCHOOLS_DETAILS, SCHOOL_REGISTER_ENDPOINT } from '../utils/constants';
import Modal from '../components/modal';
import { toast } from 'react-toastify';

const Schools = () => {
    const { token } = useSelector((state)=> state.auth);
    const dispatch = useDispatch();

    const [schools_, setSchools] = useState([]);
    const [details, setDetails] = useState([]);

    const initialValues = {
      school_id: "",
      email: "",
      phone: "",
      name: "",
      address: "",
      whatsapp: "",
      facebook: "",
      youtube: "",
      instagram: "",
      anthem: "",
      logo: "",
      headline: "",
      active: "", 
      subscription_on: "", 
      subscription_expire: "" 
  }

    useEffect(()=>{
        getSchools();
    },[])

    const getSchools = ()=>{
        const payload = {
            endpoint: SCHOOLS_DETAILS,
            values:{
                token:token,
            }
        }
        dispatch(schools(payload))
        .then((result) => {
            const data = result.payload.data;
            if(data.status == 'success'){
              toast.success(data.message);
              setSchools(result.payload.data.data);
            }else{
              toast.error(data.message);
              setSchools([]);

            }
            console.log(result);
        }).catch((err) => {
            console.log(err);
        });
    }
    const getDetail = (id)=>{
      setDetails([]);
        const payload = {
            endpoint: SCHOOLS_DETAILS,
            values:{
                token:token,
                school_id:id
            }
        }
        dispatch(schools(payload))
        .then((result) => {
            const data = result.payload.data;
            console.log('====================================');
            console.log(data.data[0]);
            console.log('====================================');
            if(data.status == 'success'){
              toast.success(data.message);
              setDetails(data.data[0]);
            }else{
              toast.error(data.message);
              setDetails([]);
            }
        }).catch((err) => {
            console.log(err);
        });
    }
    const handleEditSubmit = (values)=>{
      const payload = {
        endpoint: SCHOOL_REGISTER_ENDPOINT,
        values:{
            token:token,
            ...values
        }
      }
      dispatch(register(payload))
      .then((result) => {
          const data = result.payload.data;
          if(data.status == 'success'){
            toast.success(data.message);
            getSchools();
          }else{
            toast.error(data.message);
          }
          console
      }).catch((err) => {
          console.log(err);
      });
    }
  return (
    <>
        <div className="row">
          <div className="col-12">
            <div className="card mb-4">
              <div className="card-header pb-0">
                <h6>Authors table</h6>
              </div>
              <div className="card-body px-0 pt-0 pb-2">
                <div className="table-responsive p-0">
                  {
                    schools_.length <= 0 ? (
                      <div className=" w-100 h-25flex justify-content-center align-items-center">
                        <p className=" text-secondary text-center px-3">No Content</p>
                      </div>
                    ) :(
                      <table className="table align-items-center mb-0">
                        <thead>
                          <tr>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">School Name</th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Address</th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status</th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Registration Date</th>
                            <th className="text-secondary opacity-7"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            schools_.map( (item) =>(
                              <tr className="" >
                                <td className="d-flex px-2 py-1">
                                  <div className="d-flex px-2 py-1">
                                    <div>
                                      <img src="../assets/img/team-2.jpg" className="avatar avatar-sm me-3" alt="user1"/>
                                    </div>
                                    <div className="d-flex flex-column justify-content-center">
                                      <h6 className="mb-0 text-sm">{item.name}</h6>
                                      <p className="text-xs text-secondary mb-0">{item.email}</p>
                                    </div>
                                  </div>
                                </td>
                                <td className="">
                                    <p className="text-xs font-weight-bold mb-0">{item.address}</p>
                                    <p className="text-xs text-secondary mb-0">{`${item.city},${item.state}`}</p>
                                </td>
                                <td className="align-middle text-center text-sm">
                                    <span className={`badge badge-sm ${item.active == 'Yes' ? 'bg-gradient-success':'bg-gradient-danger'}`}>{ item.active == 'Yes'? 'Active':'InActive'}</span>
                                </td>
                                <td className="align-middle text-center">
                                  <span className="text-secondary text-xs font-weight-bold">{item.created_on}</span>
                                </td>
                                <td className="align-middle">
                                  {/* <a href="" className="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                                    Edit
                                  </a> */}
                                  <button type="button" className="text-secondary font-weight-bold text-xs btn" data-bs-toggle="modal" data-bs-target="#details" onClick={ () =>getDetail(item.school_id)}>
                                    Details
                                  </button>
                                </td>
                              </tr>
                            ))
                          }
                        </tbody>
                      </table>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <Modal id={'editModal'} label={'editmodal'}>
            <Formik
              initialValues= {initialValues}
              onSubmit={handleEditSubmit}
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
                <form role="form text-left" onSubmit={handleSubmit}>
                    <label>School Name</label>
                    <div className="input-group mb-3">
                      <input 
                      type="text" 
                      name='name' 
                      className="form-control" 
                      placeholder="School Name" 
                      aria-label="Name" 
                      aria-describedby="name"/>
                    </div>
                    <label>Email</label>
                    <div className="input-group mb-3">
                      <input 
                        type="email" 
                        name='email' 
                        className="form-control" 
                        placeholder="Email" 
                        aria-label="Email" 
                        aria-describedby="email-addon"/>
                    </div>
                    <label htmlFor="">Phone Number</label>
                    <div className="input-group mb-3">
                      <input 
                        type="tel" 
                        name='phone' 
                        placeholder='Phone' 
                        className="form-control" />
                    </div>
                    <label htmlFor="">Headline</label>
                    <div className="input-group mb-5">
                      <input 
                        type="tel" 
                        name='headline' 
                        placeholder='' 
                        className="form-control" />
                    </div>
                    <div className="input-group mb-3">
                      <input 
                        type="tel" 
                        name='whatsapp' 
                        placeholder='Whatsapp' 
                        className="form-control form-control-sm" />
                    </div>
                    <div className="input-group mb-3">
                      <input 
                        type="tel" 
                        name='facebook' 
                        placeholder='Facebook' 
                        className="form-control form-control-sm" />
                    </div>
                    <div className="input-group mb-3">
                      <input 
                        type="tel" 
                        name='youtube' 
                        placeholder='Youtube' 
                        className="form-control form-control-sm" />
                    </div>
                    <div className="input-group mb-3">
                      <input 
                        type="tel" 
                        name='instagram' 
                        placeholder='Instagram' 
                        className="form-control form-control-sm" />
                    </div>
                    <div className="form-check form-switch">
                      <input 
                        className="form-check-input" 
                        name='active' 
                        type="checkbox" 
                        id="active" 
                        checked=""/>
                      <label className="form-check-label" htmlFor="active">Active</label>
                    </div>                 
                    
                    <label htmlFor="">Anthem</label>
                    <div className="input-group mb-3">
                      <textarea 
                        name="anthem" 
                        className=' form-control' 
                        id="" 
                        cols="30" 
                        rows=""></textarea>
                    </div>
                    <label htmlFor="">Address</label>
                    <div className="input-group mb-3">
                      <textarea 
                        name="address" 
                        className=' form-control' 
                        id="" 
                        cols="30" 
                        rows=""></textarea>
                    </div>
                    <div className="text-center">
                      <button type="button" className="btn btn-sm bg-gradient-info w-50 mt-4 mb-0">Save</button>
                    </div>
                </form>
            )}
            </Formik>
          </Modal>
          <Modal id={'details'} label={'details'}>
            {
              details.lenght <= 0 ? (
            
                <div className="row">
                <div className="col-12 text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              </div>
              ):(
                <div className="row">
                        <div className=' mb-4'>
                          <h3 className="mb-0 text-sm">School Name</h3>
                          <p className="text-xs text-secondary mb-0">
                            { details.name ? details.name : 'No Name' }
                          </p>
                        </div>
                        <div className=' mb-4'>
                          <h3 className="mb-0 text-sm">Email</h3>
                          <p className="text-xs text-secondary mb-0">
                            { details?.email ? details?.email : 'No Email' }
                          </p>
                        </div>
                        <div className=' mb-4'>
                          <h3 className="mb-0 text-sm">Phone Number</h3>
                          <p className="text-xs text-secondary mb-0">
                            { details?.phone ? details?.phone : 'No Phone Number' }
                          </p>
                        </div>
                        <div className=' mb-4'>
                          <h3 className="mb-0 text-sm">Headline</h3>
                          <p className="text-xs text-secondary mb-0"> 
                            { details?.headline ? details?.headline : 'No Headline' }
                          </p>
                        </div>
                        <div className=' mb-4'>
                          <h3 className="mb-0 text-sm">Address</h3>
                          <p className="text-xs text-secondary mb-0">
                            { details?.address ? details?.address : 'No Address' }
                          </p>
                        </div>
                        <div className=' mb-4'>
                          <h3 className="mb-0 text-sm">Subscription</h3>
                          <p className="text-xs text-secondary mb-0">
                          <span className={`badge badge-sm ${details?.subscription_on == 'Yes' ? 'bg-gradient-success':'bg-gradient-danger'}`}>
                            { details?.subscription_on ? 'Active' : 'Inactive' }
                          </span>
                          </p>
                        </div>
                        <div className=' mb-4'>
                          <h3 className="mb-0 text-sm">Subscription Expire data</h3>
                          <p className="text-xs text-secondary mb-0">
                            { details?.subscription_expire ? details?.subscription_expire : 'No Subscription' }
                          </p>
                        </div>
                </div>
              )
            } 
          </Modal>
        </div>
    </>
  )
}

export default Schools