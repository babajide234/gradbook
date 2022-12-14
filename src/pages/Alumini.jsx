import { Formik } from 'formik';
import React, { useState, useEffect } from 'react'
import Modal from '../components/modal';
import { useDispatch, useSelector } from 'react-redux'
import { register, schools } from '../utils/thunkFunc';
import { 
    ALUMINI_REGISTER, 
    ALUMINI_DETAILS,
    ALUMINI_DETAILS_UPDATE
   } from '../utils/constants';
import {
    useQuery,
    useMutation,
    useQueryClient} from 'react-query';
import { toast } from 'react-toastify';
// import { getAlumini } from '../utils/requests';

const Alumini = () => {
    const { token } = useSelector((state)=> state.auth);
    const dispatch = useDispatch();
  
    const [aluminiList, setAluminiList] = useState([]);
    const [class_, setClass] = useState('');
    const [class_id, setClassId] = useState('');
    const [updateClass, setUpdateClass] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const queryClient = useQueryClient()
    const modalCLose = React.useRef(null)


    useEffect(()=>{
       // 👇️ only runs once
      console.log('useEffect ran');
      getAlumini();
    },[])
        
    const initialValues = {
        alumni_ref: "", 
        email: "", 
        password: "",
        lastname: "",
        firstname: "",
        active:false
    }
        
    const getAlumini = ()=>{
          const payload = {
            endpoint: ALUMINI_DETAILS,
            values:{
                token:token,
            }
          }
          dispatch(schools(payload))
          .then((result) => {
            const data = result.payload.data;
            if(data.status == 'success'){
              toast.success(data.message);
              setAluminiList(data.data );
            }else{
              setAluminiList([]);
              toast.error(data.message);
            }
                console.log(result);
            }).catch((err) => {
                console.log(err);
            });
    }
    
    function handleCloseModal(){
      document.getElementById("new").classList.remove("show", "d-block", "modal-open");  
      document.getElementsByClassName("modal-backdrop")[0].classList.remove("modal-backdrop");

    }

    const addAlumini =(values)=>{
      setIsLoading(true);
      const payload = {
        endpoint: ALUMINI_REGISTER,
        values:{
            token:token,
            alumni_ref: values.alumni_ref, 
            email: values.email, 
            password: values.password,
            lastname: values.lastname,
            firstname: values.firstname
        }
      }
      dispatch(schools(payload))
      .then((result) => {
            console.log(result);
            let data = result.payload.data
            if(data.status == 'success'){
              toast.success(data.message);
              getAlumini();
              setIsLoading(false);
              handleCloseModal();
            }else{
              toast.error(data.message);
              setIsLoading(false);
            }
          }).catch((err) => {
            modalCLose.current.modal('hide');
            console.log(err);
        });
    }
  
    const getSingleClass =(classId, email)=>{
      setUpdateClass(true)
      const payload = {
        endpoint: ALUMINI_DETAILS,
        values:{
            token:token,
            alumni_ref: classId,
        }
      }
      dispatch(schools(payload))
      .then((result) => {
            var data = result.payload.data;
            if(data.status == 'success'){
              toast.success(data.message);
              setClass(data.class)
              setClassId(classId);
            }else{
              toast.error(data.message);
            }
        }).catch((err) => {
            console.log(err);
        });
    }
    
    const editAlumini =(values)=>{
      const payload = {
        endpoint: ALUMINI_DETAILS_UPDATE,
        values:{
            token:token,
            alumni_ref: values.alumni_ref,
            email:values.email,
            active: values.active
        }
      }
      dispatch(schools(payload))
      .then((result) => {
            console.log(result);
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
            <div className="col-10">
            <div className="card mb-4">
              <div className="card-header pb-0">
                <h6>Alumini List table</h6>
                <button className="btn btn-sm bg-gradient-info w-35" data-bs-toggle="modal" data-bs-target="#new" onClick={ () => setUpdateClass(false) }>Add New Alumini</button>
              </div>
              <div className="card-body px-0 pt-0 pb-2">
                <div className="table-responsive p-0">
                  {
                    aluminiList.length <= 0 ? (
                      <div className=" w-100 h-25flex justify-content-center align-items-center">
                        <p className=" text-secondary text-center px-3">No Content</p>
                      </div>
                    ) :(
                      <table className="table align-items-center mb-0">
                        <thead>
                          <tr>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name</th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Alumni Ref</th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Email</th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">phone</th>
                            <th className="text-secondary opacity-7"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            aluminiList.map( (item,index) =>(
                              <tr key={item.alumni_ref+"_"+index} className="" >
                                <td className="align-middle px-4">
                                  <span className="text-secondary text-xs font-weight-bold">{item.firstname +' '+ item.lastname}</span>
                                </td>
                                <td className="align-middle px-4">
                                  <span className="text-secondary text-xs font-weight-bold">{item.alumni_ref}</span>
                                </td>
                                <td className="align-middle px-4">
                                  <span className="text-secondary text-xs font-weight-bold">{item.email}</span>
                                </td>
                                <td className="align-middle px-4">
                                  <span className="text-secondary text-xs font-weight-bold">{item.phone}</span>
                                </td>
                                <td className="align-middle">
                                  <button type="button" className="text-secondary font-weight-bold text-xs btn" data-bs-toggle="modal" data-bs-target="#new" onClick={ ( ) => getSingleClass(item.alumni_ref, item.email)}>
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
            <Modal id={'new'} label={'new'} ref={modalCLose}>
              <Formik
                initialValues= {initialValues}
                enableReinitialize = {true}
                onSubmit={updateClass ? editAlumini : addAlumini}
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
                      <label>Alumni Ref</label>
                      <div className="input-group mb-3">
                        <input 
                          type="text" 
                          name='alumni_ref' 
                          className="form-control" 
                          placeholder="alumni ref ( eg Registration Number )" 
                          aria-label="class" 
                          aria-describedby="class"
                          value={ values.alumni_ref }
                          onChange={ handleChange }
                        />
                      </div>
                      <label>Email</label>
                      <div className="input-group mb-3">
                        <input 
                          type="text" 
                          name='email' 
                          className="form-control" 
                          placeholder="Email" 
                          aria-label="class" 
                          aria-describedby="class"
                          value={ values.email }
                          onChange={ handleChange }
                        />
                      </div>
                      <div class="form-check form-switch">
                        <input 
                          class="form-check-input" 
                          type="checkbox" 
                          id="flexSwitchCheckDefault" 
                          checked={ values.active }
                          name='active'
                          onChange= { handleChange } 
                        />
                        {
                          values.active ? (
                            <label class="form-check-label" for="flexSwitchCheckDefault">
                              <span class="badge bg-gradient-success">Active</span>
                              
                            </label>
                          ) : (
                            <label class="form-check-label" for="flexSwitchCheckDefault">
                              <span class="badge bg-gradient-danger">Inactive</span>
                              
                            </label>
                          )
                        }
                      </div>
                      {
                        updateClass ? null : (
                          <>
                            <label>Password</label>
                            <div className="input-group mb-3">
                              <input 
                                type="password" 
                                name='password' 
                                className="form-control" 
                                placeholder="Password" 
                                aria-label="class" 
                                aria-describedby="class"
                                value={ values.password }
                                onChange={ handleChange }
                                />
                            </div>
                            <label>Lastname</label>
                            <div className="input-group mb-3">
                              <input 
                                type="text" 
                                name='lastname' 
                                className="form-control" 
                                placeholder="Lastname" 
                                aria-label="class" 
                                aria-describedby="class"
                                value={ values.lastname }
                                onChange={ handleChange }
                              />
                            </div>
                            <label>Firstname</label>
                            <div className="input-group mb-3">
                              <input 
                                type="text" 
                                name='firstname' 
                                className="form-control" 
                                placeholder="Firstname" 
                                aria-label="firstname" 
                                aria-describedby="firstname"
                                value={ values.firstname }
                                onChange={ handleChange }
                                />
                            </div>
                          </>
                        )
                      }
                      <div className="text-center">
                      {
                        updateClass ? (
                            <button type="submit" className="btn bg-gradient-info w-100 my-4 mb-2" disabled={isLoading}>{ isLoading ? "Loading...":"Update" }</button>
                          ) : (
                            <button type="submit" className="btn bg-gradient-info w-100 my-4 mb-2" disabled={isLoading}>{ isLoading ? "Loading...":"Add New" }</button>
                          )
                      }
                      </div>
                  </form>
              )}
              </Formik>
            </Modal>
        </div>
    </>
  )
}

export default Alumini