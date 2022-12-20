import React, { useState, useEffect } from 'react'
import { ALUMINI_METRICS, PROVIDER_METRICS, SCHOOL_METRICS } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { schools } from '../utils/thunkFunc';
import { toast } from 'react-toastify';

const Metrics = ({met}) => {

  console.log('metrics', met);
  if(met === null) return null;
  const keys = Object.keys(met);
  
  const data = keys.map((key)=>(
      <div className="col-md-4 mb-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title text-capitalize">{key.replace('_'," ")}</h5>
            <p className="card-text">{met[key]}</p>
          </div>
        </div>
      </div>
  ))
  
  return data;
}

const Dashbaord = () => {
  const { token,user } = useSelector((state)=> state.auth);
  const dispatch = useDispatch();
  const [metrics, setMetrics] = useState(null);
  const [endpoint, setMetricEndpoint] = useState(null);

  useEffect(() => {
      if(user.role == 'Admin' && !user.school_id && !user.alumni_ref){
          setMetricEndpoint(PROVIDER_METRICS);
      }else if(user.school_id && !user.alumni_ref){
        setMetricEndpoint(SCHOOL_METRICS);
      }else if( user.school_id && user.alumni_ref){
        setMetricEndpoint(ALUMINI_METRICS);
      }
      // setEndpoint( ALUMINI_DETAILS );
  }, []);

  useEffect(()=>{
    endpoint  && getMetrics();
  },[endpoint])


  
  const getMetrics = ()=>{

    const payload = {
      endpoint:endpoint,
      values:{
          token:token,
      }
    }
    dispatch(schools(payload))
    .then((res)=>{
      var data = res.payload.data;

      if( data.status == 'success'){
        toast.success(data.message);
        setMetrics(data.data)
      }else{
        toast.error(data.message);
      }
    })
  }
  return (
    <>
      <div className="row">
         {
            metrics && Object.keys(metrics).map((key)=>(
              <div className="col-md-4 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title text-capitalize">{ key.replace('_'," ") }</h5>
                    <p className="card-text">{ metrics[key] == null ? 0 : metrics[key] }</p>
                  </div>
                </div>
              </div>
            ))
         }
      </div>
    </>
  )
}

export default Dashbaord