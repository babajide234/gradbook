import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { schools } from '../utils/thunkFunc'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { JOB_ADD, JOB_DETAILS } from '../utils/constants'
import { Formik } from 'formik';
import Modal from '../components/modal';

const Jobs = () => {
  useDispatch
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch();


  const [jobs, setJobs] = useState(null)



  useEffect(() => {
    getJobs();
  }, [])
   
  const getJobs = ()=>{

    const payload = {
      endpoint: JOB_DETAILS,
        values:{
            token:token,
        } 
    }
    dispatch(schools(payload))
    .then((res)=>{
      
      setJobs(res.payload.data.data);
      console.log(res);
    })
    .catch((err)=>{
      console.log(err);
    })

  }
  const addNewJob = ()=>{

  }
  return (
    <>
    <div className="container-fluid py-4">
    <div className="row">
        <div className="col-lg-12 col-md-6 col-sm-12">
            <div className="card">
                <div className="card-header pb-0">
                    <h6>Jobs</h6>
                    <div className="">
                        <button className="btn btn-sm bg-gradient-info mx-3 " data-bs-toggle="modal" data-bs-target="#new" onClick={ () => addNewJob() }>Add New Jobs</button>
                        {/* <button className="btn btn-sm bg-gradient-info" data-bs-toggle="modal" data-bs-target="#upload" >Upload CSV</button> */}
                    </div>
                </div>
                <div className="card-body px-0 pt-0 pb-2">
                    <div className="table-responsive p-0">
                    {
                    jobs == null ? (
                      <div className=" w-100 h-25flex justify-content-center align-items-center">
                        <p className=" text-secondary text-center px-3">No Content</p>
                      </div>
                    ) :(
                        <table className="table align-items-center mb-0">
                            <thead>
                                <tr>    
                                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name</th>
                                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Amount</th>
                                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Description</th>
                                    <th className="text-secondary opacity-7"></th>
                                </tr>
                            </thead>
                            <tbody>
                                    {
                                        jobs.map((item, index)=>{
                                            return(
                                                <tr key={index}>
                                                    <td className="align-middle text-center">
                                                        <img src={item.name
                                                        } className="avatar avatar-sm rounded-circle me-2" alt="user1" />
                                                    </td>
                                                    <td className="align-middle text-center">
                                                        <h6 className="mb-0 text-sm">{item.amount}</h6>
                                                    </td>
                                                    <td className="align-middle text-center">
                                                        <h6 className="mb-0 text-sm">{item.description}</h6>
                                                    </td>
                                                    <td className="align-middle text-center">
                                                        <button className="btn btn-sm bg-gradient-info" data-bs-toggle="modal" data-bs-target="#edit" onClick={()=> getSingledata(item.school_id,item.year,item.class,item.alumni_ref)}  >Edit</button>
                                                    </td>
                                                </tr>
                                            )
                                        })
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
    </div>
    <div className="row">
    <Modal id={"new"} title={"New Job Post"} >
                    <Formik
                        initialValues={{
                          token: "",
                          name: "",
                          amount: "",
                          description: "",
                          image: "image"
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            const payload = {
                                endpoint:JOB_ADD,
                                values:{
                                    token:token,
                                    name: "",
                                    amount: "",
                                    description: "",
                                    image: "",
                                }
                            }
                            dispatch(schools(payload))
                            .then((res)=>{
                                console.log(res);
                                if(res.payload.data.status == 'success'){
                                    setSubmitting(false);
                                    modalCLose.current.closeModal();
                                    getJobs();
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
                                <label>Name</label>
                                <div className="input-group mb-3">
                                  <input 
                                    type="text" 
                                    name='name' 
                                    className="form-control" 
                                    placeholder="Year" 
                                    aria-label="year" 
                                    aria-describedby="year"
                                    value={values.name}
                                    onChange={handleChange}
                                    />
                                </div>
                                <label>Amount</label>
                                <div className="input-group mb-3">
                                  <input
                                    type="text"
                                    name='amount'
                                    className="form-control"
                                    placeholder="Amount"
                                    aria-label="amount"
                                    aria-describedby="amount"
                                    value={values.amount}
                                    onChange={handleChange}
                                    />
                                </div>
                                <label>Description</label>
                                <div className="input-group mb-3">
                                  <textarea
                                    name='description'
                                    className="form-control"
                                    placeholder="Description"
                                    aria-label="description"
                                    aria-describedby="description"
                                    value={values.description}
                                    onChange={handleChange}
                                  ></textarea>
                                </div>
                                <label>Image</label>
                                <div className="input-group mb-3">
                                  <input
                                    type="file"
                                    name='image'
                                    className="form-control"
                                    placeholder="Image"
                                    aria-label="image"
                                    aria-describedby="image"
                                    // value={values.image}
                                    onChange={handleChange}
                                  />
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
    </>
  )
}

export default Jobs