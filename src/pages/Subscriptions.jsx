import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
  SUBSCRIPTION_DETAILS_ENDPOINT,
  SUBSCRIPTION_INITIATE_ENDPOINT 
} from '../utils/constants';
import { subscription } from '../utils/thunkFunc';
import Modal from '../components/modal';

const Subscriptions = () => {
  const { token, user } = useSelector((state)=> state.auth);
  const dispatch = useDispatch();
  
  const [subscriptions, setSubscriptions] = useState([]);
  const [id, setId] = useState('');

  useEffect(()=>{
    getSubscriptions()
  },[])

  const getSubscriptions = ()=>{
    const payload = {
      endpoint: SUBSCRIPTION_DETAILS_ENDPOINT,
      values:{
          token:token,
      }
  }
  dispatch(subscription(payload))
  .then((result) => {
      setSubscriptions(result.payload.data.data);
      console.log(result);
  }).catch((err) => {
      console.log(err);
  });
  }

  const getDetail = (id)=>{
    console.log(id)
  }
  const subscribe = ()=>{

    const payload = {
      endpoint: SUBSCRIPTION_INITIATE_ENDPOINT,
      values:{
          token:token,
          id: id
      }
    }
    dispatch(subscription(payload))
    .then((result) => {
        setSubscriptions(result.payload.data.data);
        console.log(result);
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  return (
    <>
    {
    user.role == 'Admin' ? (
      <>
        <div className="row mb-4">
          <div className="col-4">
            <h2>Subscriptions</h2>
            {
              subscriptions.map( (item,index) =>(
                <div class="card" key={index}>
                  <div class="card-header text-center pt-4 pb-3">
                    <span class="badge rounded-pill bg-light text-dark">{item.name}</span>
                    <h1 class="font-weight-bold mt-2">
                      <small>₦ </small>{item.amount}
                    </h1>
                  </div>
                  <div class="card-body text-lg-left text-center pt-0">
                    <div class="d-flex justify-content-lg-start justify-content-center p-2">
                      <div class="icon icon-shape icon-xs rounded-circle bg-gradient-success shadow text-center">
                        <i class="fas fa-check opacity-10" aria-hidden="true"></i>
                      </div>
                      <div>
                        <span class="ps-3">{item.description}</span>
                      </div>
                    </div>

                    <a href="javascript:;" class="btn btn-icon bg-gradient-primary d-lg-block mt-3 mb-0" onClick={() => subscribe(index)}>
                      Subscribe
                      <i class="fas fa-arrow-right ms-1" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <div className="row">
          <Modal id={'details'} label={'details'}>
              
              <div className=' mb-4'>
                <h3 className="mb-0 text-sm">School Name</h3>
                <p className="text-xs text-secondary mb-0">dtails</p>
              </div>
              <div className=' mb-4'>
                <h3 className="mb-0 text-sm">Email</h3>
                <p className="text-xs text-secondary mb-0">dtails</p>
              </div>
              <div className=' mb-4'>
                <h3 className="mb-0 text-sm">Phone Number</h3>
                <p className="text-xs text-secondary mb-0">dtails</p>
              </div>
          </Modal>
        </div>
      </>
    ) : (
        <div className="row">
          <div className="col-12">
            <div className="card mb-4">
              <div className="card-header pb-0">
                <h6>Subscriptions table</h6>
              </div>
              <div className="card-body px-0 pt-0 pb-2">
                <div className="table-responsive p-0">
                  {
                    subscriptions.length <= 0 ? (
                      <div className=" w-100 h-25flex justify-content-center align-items-center">
                        <p className=" text-secondary text-center px-3">No Content</p>
                      </div>
                    ) :(
                        <table className="table align-items-center mb-0">
                          <thead>
                            <tr>
                              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name</th>
                              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Description</th>
                              <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Amount</th>
                              <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Subscribed On</th>
                              <th className="text-secondary opacity-7"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              subscriptions.map( (item) =>(
                                <tr className=" " >
                                  <td className="align-middle p-4">
                                      <h6 className="text-sm">{item.name}</h6>
                                  </td>
                                  <td className="align-middle">
                                      <p className="text-xs font-weight-bold mb-0">{item.description}</p>
                                  </td>
                                  <td className="align-middle text-center ">
                                      <p className="text-xs font-weight-bold mb-0">{item.amount}</p>
                                  </td>
                                  <td className="align-middle text-center">
                                    <span className="text-secondary text-xs font-weight-bold">{item.created_on}</span>
                                  </td>
                                  <td className="align-middle">
                                    <button type="button" className="text-secondary font-weight-bold text-xs btn" data-bs-toggle="modal" data-bs-target="#details" onClick={getDetail(item.school_id)}>
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
    )
  }
    </>
  )
}

export default Subscriptions