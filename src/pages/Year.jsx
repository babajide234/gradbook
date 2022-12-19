import { Formik } from 'formik';
import React, { useState, useEffect } from 'react'
import Modal from '../components/modal';
import { useDispatch, useSelector } from 'react-redux'
import { register, schools } from '../utils/thunkFunc';
import { SCHOOLS_YEAR_ADD, SCHOOLS_YEAR_LIST, SCHOOLS_YEAR_UPDATE } from '../utils/constants';
import { toast } from 'react-toastify';

const Year = () => {
    const [yearlist, setYearList] = useState([]);
    const { token } = useSelector((state)=> state.auth);
    const dispatch = useDispatch();
  
    const [classlist, setClassList] = useState([]);
    const [class_, setClass] = useState('');
    const [class_id, setClassId] = useState('');
    const [updateClass, setUpdateClass] = useState(false);
    
    useEffect(()=>{
      getYear();
    },[])

  const initialValues ={
    year: '',
    details:''
  }

  const getYear= ()=>{
    const payload = {
      endpoint: SCHOOLS_YEAR_LIST,
      values:{
          token:token,
      }
    }
    dispatch(schools(payload))
    .then((result) => {
      const data = result.payload.data;

      if(data.status == 'success'){
        toast.success(data.message);
        setYearList(result.payload.data.data);
      }else{
        setYearList([]);
        toast.error(data.message);
      }
          console.log(result);
      }).catch((err) => {
          console.log(err);
      });
  }

  
  const addYear =(values, {setSubmitting})=>{
    const payload = {
      endpoint: SCHOOLS_YEAR_ADD,
      values:{
          token:token,
          year:values.year,
          details:values.details
      }
    }
    dispatch(schools(payload))
    .then((result) => {
        const data = result.payload.data;
        if(data.status == 'success'){
          toast.success(data.message);
          setSubmitting(false);
          getYear();
        }else{
          toast.error(data.message);
          setSubmitting(false);
        }
        
      }).catch((err) => {
          console.log(err);
      });
  }


  const getSingleYear=(classId)=>{
    const payload = {
      endpoint: SCHOOLS_YEAR_LIST,
      values:{
          token:token,
          class_id: classId,
      }
    }
    dispatch(schools(payload))
    .then((result) => {
          var data = result.payload.data;
          if(data.status == 'success'){
            toast.success(data.message);
            setUpdateClass(true)
            setClass(data.class)
            setClassId(classId);
          }else{
            toast.error(data.message);
          }
      }).catch((err) => {
          console.log(err);
      });
  }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
  const editYear =(values,{setSubmitting})=>{
    const payload = {
      endpoint: SCHOOLS_YEAR_UPDATE,
      values:{
          token:token,
          class_id: class_id,
          class:values.class
      }
    }
    dispatch(schools(payload))
    .then((result) => {
        const data = result.payload.data;
        if(data.status == 'success'){
          toast.success(data.message);
          setSubmitting(false);
          getYear();
        }else{
          toast.error(data.message);
          setSubmitting(false);
        }
      }).catch((err) => {
          console.log(err);
      });
  }
  const handleClassSubmit =(values)=>{

  }
  return (
    <>
        <div className="row">
            <div className="col-3">

            </div>
        </div>
        <div className="row">
            <div className="col-6">
            <div className="card mb-4">
              <div className="card-header pb-0">
                <h6>Year List table</h6>
                <button className="btn btn-sm bg-gradient-info w-35" data-bs-toggle="modal" data-bs-target="#new" >Add New Year</button>
              </div>
              <div className="card-body px-0 pt-0 pb-2">
                <div className="table-responsive p-0">
                  {
                    yearlist.length <= 0 ? (
                      <div className=" w-100 h-25flex justify-content-center align-items-center">
                        <p className=" text-secondary text-center px-3">No Content</p>
                      </div>
                    ) :(
                      <table className="table align-items-center mb-0">
                        <thead>
                          <tr>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Year</th>
                            <th className="text-secondary opacity-7"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            yearlist.map( (item) =>(
                              <tr className="" >
                                <td className="align-middle px-4">
                                  <span className="text-secondary text-xs font-weight-bold">{item.year}</span>
                                </td>
                                <td className="align-middle">
                                  {/* <a href="javascript:;" className="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                                    Edit
                                  </a> */}
                                  <button type="button" className="text-secondary font-weight-bold text-xs btn" data-bs-toggle="modal" data-bs-target="#details" onClick={() =>getSingleYear(item.year_id)}>
                                    Edit
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
            <Modal id={'new'} label={'new'}>
            <Formik
              initialValues= {initialValues}
              enableReinitialize={true}
              onSubmit={addYear}
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
                    <label>School Year</label>
                    <div className="input-group mb-3">
                      <input 
                        type="text" 
                        name='year' 
                        className="form-control" 
                        placeholder="Year" 
                        aria-label="year" 
                        aria-describedby="year"
                        value={values.year}
                        onChange={handleChange}
                        />
                    </div>
                    <label>Details</label>
                    <div className="input-group mb-3">
                      <textarea 
                        name="details" 
                        id="" 
                        cols="30" 
                        rows="" 
                        className="form-control" 
                        onChange={handleChange}
                        value={values.details}
                        ></textarea>
                    </div>
                    <div className="text-center">
                      <button type="submit" className="btn btn-sm bg-gradient-info w-50 mt-4 mb-0" disabled={isSubmitting}>
                        {isSubmitting ? <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div> : 'Add New Year'}

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

export default Year