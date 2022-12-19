import React, { useState, useEffect } from 'react'
import { ALUMINI_METRICS, PROVIDER_METRICS, SCHOOL_METRICS } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { schools } from '../utils/thunkFunc';

const Metrics = ({met}) => {
  if(met === null){ return null};

  const keys = met !== null && Object.keys(met);
  console.log(keys);
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
    // if(user === null) return;
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
      if( data.success == 'success'){
        data = data.data;
        setMetrics(data)
      }else{
        data = null;
        setMetrics(data)
      }

    })
  }
  return (
    <>
      <div className="row">
        <Metrics met={metrics}/>
      </div>
    </>
  )
}

export default Dashbaord