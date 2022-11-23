import React from 'react'
import ReactModal from 'react-modal';

const Modal = ({children ,id,label}) => {
  return (
    <>
        <div className="modal fade" id={id} tabindex="-1" role="dialog" aria-labelledby={label} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id={id}>Modal title</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                {children}
            </div>
            {/* <div className="modal-footer">
                <button type="button" className="btn bg-gradient-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn bg-gradient-primary">Save changes</button>
            </div> */}
            </div>
        </div>
        </div>
    </>
  )
}

export default Modal