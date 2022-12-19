import { Formik } from 'formik';
import React, { useState, useEffect } from 'react'
import Modal from '../components/modal';
import { useDispatch, useSelector } from 'react-redux'
import { register, schools } from '../utils/thunkFunc';
import { SCHOOLS_CLASS_ADD, SCHOOLS_CLASS_LIST, SCHOOLS_CLASS_UPDATE} from '../utils/constants';
import { toast } from 'react-toastify';

const Class = () => {
  const { token } = useSelector((state)=> state.auth);
  const dispatch = useDispatch();

  const [classlist, setClassList] = useState([]);
  const [class_, setClass] = useState('');
  const [class_id, setClassId] = useState('');
  const [updateClass, setUpdateClass] = useState(false);
  
  useEffect(()=>{
    getClases();
  },[])

  const initialValues = {
    class: class_ ? class_ : ''
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
      const data = result.payload.data;
      if(data.status == 'success'){
        toast.success(data.message);
        setClassList(result.payload.data.data);
      }else{
        setClassList([]);
        toast.error(data.message);
      }
          console.log(result);
      }).catch((err) => {
          console.log(err);
      });
  }


  const addClass =(values, { setSubmitting })=>{
    const payload = {
      endpoint: SCHOOLS_CLASS_ADD,
      values:{
          token:token,
          class:values.class
      }
    }
    dispatch(schools(payload))
    .then((result) => {
        const data = result.payload.data;
        if(data.status == 'success'){
          toast.success(data.message);
          setSubmitting(false);
          getClases();
        }else{
          toast.error(data.message);
          setSubmitting(false);
        }
        
      }).catch((err) => {
          console.log(err);
      });
  }


  const getSingleClass =(classId)=>{
    const payload = {
      endpoint: SCHOOLS_CLASS_LIST,
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
            setClass(data.data[0].class);
            setClassId(data.data[0].id);
            setUpdateClass(true);
          }else{
            toast.error(data.message);
          }
      }).catch((err) => {
          console.log(err);
      });
  }
  
  const editClass =(values,{ setSubmitting })=>{
    const payload = {
      endpoint: SCHOOLS_CLASS_UPDATE,
      values:{
          token:token,
          class_id: class_id,
          class:values.class
      }
    }
    dispatch(schools(payload))
    .then((result) => {
        var data = result.payload.data;

        if(data.status == 'success'){
          setSubmitting(false);
          toast.success(data.message);
          getClases();
        }else{
          setSubmitting(false);
          toast.error(data.message);
        }
      }).catch((err) => {
          console.log(err);
      });
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
                <h6>Class List table</h6>
                <button className="btn btn-sm bg-gradient-info w-35" data-bs-toggle="modal" data-bs-target="#new" >Add New Class</button>
              </div>
              <div className="card-body px-0 pt-0 pb-2">
                <div className="table-responsive p-0">
                  {
                    classlist.length <= 0 ? (
                      <div className=" w-100 h-25flex justify-content-center align-items-center">
                        <p className=" text-secondary text-center px-3">No Content</p>
                      </div>
                    ) :(
                      <table className="table align-items-center mb-0">
                        <thead>
                          <tr>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Class</th>
                            <th className="text-secondary opacity-7"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            classlist.map( (item) =>(
                              <tr className="" >
                                <td className="align-middle px-4">
                                  <span className="text-secondary text-xs font-weight-bold">{item.class}</span>
                                </td>
                                <td className="align-middle">
                                  <button type="button" className="text-secondary font-weight-bold text-xs btn" data-bs-toggle="modal" data-bs-target="#new" onClick={ ( ) => getSingleClass(item.class_id)}>
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
                enableReinitialize = {true}
                onSubmit={updateClass ? editClass : addClass}
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
                      <label>School Class</label>
                      <div className="input-group mb-3">
                        <input 
                          type="text" 
                          name='class' 
                          className="form-control" 
                          placeholder="Class" 
                          aria-label="class" 
                          aria-describedby="class"
                          value={ values.class }
                          onChange={ handleChange }
                        />
                      </div>
                      <div className="text-center">
                        <button 
                          type="submit" 
                          className="btn btn-sm bg-gradient-info w-50 mt-4 mb-0"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div> : updateClass ? 'Update' : 'Add New Class'}
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

export default Class