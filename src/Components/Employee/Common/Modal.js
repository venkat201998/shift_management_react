import React from 'react';

import './index.css';

const Modal = ({ btnTitle, id, obj, title, onClickEvent }) => {

    const handleClick = (o, status) => {
        onClickEvent(o, status);
    }

    return (
        <div className='modal fade' id={`static-backdrop-${id}`} data-bs-backdrop='static' data-bs-keyboard='false' tabIndex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true'>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h1 className='modal-title fs-5' id='staticBackdropLabel'></h1>
                        <button className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                    </div>
                    <div className='modal-body text-start'>{title}</div>
                    <div className='modal-footer jsutify-content-center'>
                        <button className='btn btn-auth-filled' data-bs-dismiss='modal' aria-label='Close'>Cancel</button>
                        <button className='btn btn-auth-hollow' data-bs-dismiss='modal' onClick={() => handleClick(obj, btnTitle)}>{btnTitle}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;
