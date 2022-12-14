import React, { useState, useEffect } from 'react'
import { ALUMINI_METRICS, PROVIDER_METRICS, SCHOOL_METRICS } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { schools } from '../utils/thunkFunc';
import { toast } from 'react-toastify';
import sound from '../assets/anthem.mp3'
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
  // const [playCount, setplayCount] = useState(0);

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
        playSound();
      }else{
        toast.error(data.message);
      }
    })
  }
  const play = localStorage.getItem('playCount');
  useEffect(()=>{
    console.log('playCount', play);
  },[play])
  
  const playSound = ()=>{
    var audio = new Audio(sound);
    var playCount = localStorage.getItem('playCount');
    if(playCount == null){
      localStorage.setItem('playCount',1);
      audio.play();
    }else{
      console.log('pause');
    }

  }

  const getSound = ()=>{
    // request for sound with the endpoint



    // playSound();
  }
    

  return (
    <>
      <div className="row">
         {
            metrics && Object.keys(metrics).map((key)=>(
               <div key={key} className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                    { key.replace('_'," ") }</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{ metrics[key] == null ? 0 : metrics[key] }</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                </div>
                            </div>
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