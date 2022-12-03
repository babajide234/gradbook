import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Formik } from 'formik';
import {  schools } from '../utils/thunkFunc';


const Session = () => {
    const { token } = useSelector((state)=> state.auth);
    const dispatch = useDispatch();

    
  
  return (
    <>
        <div className="container-fluid py-4">
            <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="card">
                        <div className="card-header pb-0">
                            <h6>Session</h6>
                        </div>
                        <div className="card-body px-0 pt-0 pb-2">
                            <div className="table-responsive p-0">
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
                                        <tr className=" " >
                                            <td className="align-middle p-4">
                                                <h6 className="text-sm">Basic</h6>
                                            </td>
                                            <td className="align-middle">
                                                <p className="text-xs font-weight-bold mb-0">Basic Plan</p>
                                            </td>
                                            <td className="align-middle text-center ">
                                                <p className="text-xs font-weight-bold mb-0">N 5000</p>
                                            </td>
                                            <td className="align-middle text-center">
                                                <p className="text-xs font-weight-bold mb-0">12/12/2020</p>
                                            </td>
                                            <td className="align-middle text-center">
                                                <a href="#pablo" className="text-secondary font-weight-bold text-xs" onClick={(e) => e.preventDefault()}>
                                                    Details
                                                </a>    
                                            </td>
                                        </tr>
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Session