import React, { useState, useEffect } from 'react'
import { DONATION_DETAILS } from '../utils/constants';
import { schools } from '../utils/thunkFunc';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Donations = () => {
    const [transactions, setTransactions] = useState(null);
    const { token } = useSelector((state)=> state.auth);

    const dispatch = useDispatch();
    useEffect(() => {
        getTransactions()
    }, [])

    const getTransactions =()=>{
        const payload = {
            endpoint: DONATION_DETAILS,
            values:{
                token:token,
            }
        }
        dispatch(schools(payload))
        .then((result) => {
            const data = result.payload.data;
            if(data.status == 'success'){
                toast.success(data.message);
                setTransactions(data.data);
            }else{
                toast.error(data.message);
            }
        })
        .catch((err)=>{
          console.log(err);
        })
    }
    const getDetail = (item) =>{
        console.log(item);
    }
  return (
    <>
        <div className="row">
            <div className="col-12">
            <div className="card mb-4">
              <div className="card-header pb-0">
                <h6>Donations</h6>
                {/* <button className="btn btn-sm bg-gradient-info w-35" data-bs-toggle="modal" data-bs-target="#new" >Add New Class</button> */}
              </div>
              <div className="card-body px-0 pt-0 pb-2">
                <div className="table-responsive p-0">
                  {
                    transactions == null ? (
                      <div className=" w-100 h-25flex justify-content-center align-items-center">
                        <p className=" text-secondary text-center px-3">No Content</p>
                      </div>
                    ) :(
                      <table className="table align-items-center mb-0">
                        <thead>
                          <tr>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name</th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Amount</th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Description</th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Registration Date</th>
                            <th className="text-secondary opacity-7"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            transactions.map( (item) =>(
                              <tr className="" >
                                <td className="d-flex px-2 py-1">
                                  <div className="d-flex px-2 py-1">
                                    <div>
                                      <img src="../assets/img/team-2.jpg" className="avatar avatar-sm me-3" alt="user1"/>
                                    </div>
                                    <div className="d-flex flex-column justify-content-center">
                                      <h6 className="mb-0 text-sm">{item.name}</h6>
                                    </div>
                                  </div>
                                </td>
                                <td className="">
                                    <p className="text-xs font-weight-bold mb-0">{item.amount}</p>
                                </td>
                                <td className="align-middle text-center text-sm">
                                    <p className="">{ item.description}</p>
                                </td>
                                <td className="align-middle text-center">
                                  <span className="text-secondary text-xs font-weight-bold">{item.created_on}</span>
                                </td>
                                <td className="align-middle">
                                  {/* <a href="javascript:;" className="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                                    Edit
                                  </a> */}
                                  <button type="button" className="text-secondary font-weight-bold text-xs btn" data-bs-toggle="modal" data-bs-target="#details" onClick={() => getDetail(item.school_id)}>
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
    </>
  )
}

export default Donations