import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { schools } from '../utils/thunkFunc'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { WALLET_DETAILS, WALLET_TRANSACTION } from '../utils/constants'

const Wallet = () => {
  const { isLoggedin, token } = useSelector((state) => state.auth)
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()


  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [pendingBalance, setPendingBalance] = useState(0);

  useEffect(() => {
    getWallet()
  }, [])

  const getWallet = ()=>{
    const payload=
      {
        endpoint: WALLET_DETAILS,
        values:{
            token:token,
        }
      }
    dispatch(schools(payload))
    .then((res)=>{
      const data = res.payload.data;
      if(data.status == 'success'){
        toast.success(data.message);
        setBalance(data.data.available_balance);
        setPendingBalance(data.data.available_balance);
        getTransactions();
      }else{
        toast.error(data.message);
      }
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const getTransactions = ()=>{
    const payload=
      {
        endpoint: WALLET_TRANSACTION,
        values:{
            token:token,
            orderBy: "", 
            filterFrom: "", 
            filterTo: "", 
            status: "", 
            type: "", 
            reference_code: ""
        }
      }
    dispatch(schools(payload))
    .then((res)=>{
      const data = res.payload.data;
      if(data.status == 'success'){
        toast.success(data.message);
        setTransactions(data.data.transactions);
      }else{
        toast.error(data.message);
      }
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  return (
    <>
        <div className="row">
            <div className="col-3">
                <div className="card mb-4">
                    <div className="card-header mx-4 p-3 text-center"></div>
                    <div className="card-body pt-0 p-3 text-center">
                      <h6 className="text-center mb-0">Balance</h6>
                      <span className="text-xs">Available Balance</span>
                      <hr className="horizontal dark my-3"/>
                      <h5 className="mb-0">{balance}</h5>
                    </div>
                </div>
            </div>
            <div className="col-3">
                <div className="card mb-4">
                    <div className="card-header mx-4 p-3 text-center"></div>
                    <div className="card-body pt-0 p-3 text-center">
                      <h6 className="text-center mb-0">Balance</h6>
                      <span className="text-xs">Pending Balance</span>
                      <hr className="horizontal dark my-3"/>
                      <h5 className="mb-0">{pendingBalance}</h5>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-12">
            <div className="card mb-4">
              <div className="card-header pb-0">
                <h6>Transactions table</h6>
                {/* <button className="btn btn-sm bg-gradient-info w-35" data-bs-toggle="modal" data-bs-target="#new" >Add New Class</button> */}
              </div>
              <div className="card-body px-0 pt-0 pb-2">
                <div className="table-responsive p-0">
                  {
                    transactions.length <= 0 ? (
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
                            // schools_.map( (item) =>(
                            //   <tr className="" >
                            //     <td className="d-flex px-2 py-1">
                            //       <div className="d-flex px-2 py-1">
                            //         <div>
                            //           <img src="../assets/img/team-2.jpg" className="avatar avatar-sm me-3" alt="user1"/>
                            //         </div>
                            //         <div className="d-flex flex-column justify-content-center">
                            //           <h6 className="mb-0 text-sm">{item.name}</h6>
                            //           <p className="text-xs text-secondary mb-0">{item.email}</p>
                            //         </div>
                            //       </div>
                            //     </td>
                            //     <td className="">
                            //         <p className="text-xs font-weight-bold mb-0">{item.address}</p>
                            //         <p className="text-xs text-secondary mb-0">{`${item.city},${item.state}`}</p>
                            //     </td>
                            //     <td className="align-middle text-center text-sm">
                            //         <span className={`badge badge-sm ${item.active == 'Yes' ? 'bg-gradient-success':'bg-gradient-danger'}`}>{ item.active == 'Yes'? 'Active':'InActive'}</span>
                            //     </td>
                            //     <td className="align-middle text-center">
                            //       <span className="text-secondary text-xs font-weight-bold">{item.created_on}</span>
                            //     </td>
                            //     <td className="align-middle">
                            //       {/* <a href="javascript:;" className="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                            //         Edit
                            //       </a> */}
                            //       <button type="button" className="text-secondary font-weight-bold text-xs btn" data-bs-toggle="modal" data-bs-target="#details" onClick={getDetail(item.school_id)}>
                            //         Details
                            //       </button>
                            //     </td>
                            //   </tr>
                            // ))
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
    </>
  )
}

export default Wallet