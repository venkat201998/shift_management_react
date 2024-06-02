import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { deleteShift, getShifts } from '../../../services';
import Modal from '../../Employee/Common/Modal';
import SideNav from '../../Employee/SideNav';

const RemoveShift = () => {
    const options = [
        { 'name': 'Active Shifts', 'route': '/employer/manage-shifts' },
        { 'name': 'Publish Shift', 'route': '/employer/manage-shifts/publish-shift' },
        { 'name': 'Remove Shift', 'route': '/employer/manage-shifts/remove-shift' }
    ];

    const dispatch = useDispatch();
    const location = useLocation();
    const [shifts, setShifts] = useState('');

    useEffect(() => {
        getShifts()
            .then(res => {
                if (res.status === 200) {
                    dispatch({
                        type: 'SHIFTS',
                        payload: res.data
                    })
                    setShifts(res.data);
                }
            })
            .catch(e => console.log(e))
    }, [location.pathname])

    const handleDrop = (obj) => {
        const { id } = obj;
        deleteShift(id)
            .then((res) => {
                if(res) {
                    dispatch({
                        type: 'SHIFTS',
                        payload: res.data
                    })
                    setShifts(res.data);
                }
            })
            .catch(e => console.log(e))
    }

    return (
        <div className='container-fluid row mt-5 p-5 d-flex justify-content-center'>
            <SideNav options={options} />
            <div className='col p-5 shadow'>
                <h2 className='mb-4 text-start'>Remove Shift</h2>
                <ul className='list-group'>
                    {
                        shifts && shifts?.map(shift => <li className='list-group-item rounded m-2 border bg-transparent d-flex justify-content-between align-items-center'>
                            <ul className='list-group text-start'>
                                <li className='list-group-item rounded-0 border-0 border bg-transparent p-1 fw-bold'>{shift.hallName}</li>
                                <li className='list-group-item rounded-0 border-0 border bg-transparent p-1'>Starts At: {shift.startDate} - {shift.startTime}</li>
                                <li className='list-group-item rounded-0 border-0 border bg-transparent p-1'>Ends At: {shift.endDate} - {shift.endTime}</li>
                            </ul>
                            <ul className='list-group text-start'>
                                <li className='list-group-item rounded-0 border-0 border bg-transparent p-1 fw-bold'>Assigned To: {''}</li>
                                <li className='list-group-item rounded-0 border-0 border bg-transparent p-1'>Status: {'Active'}</li>
                            </ul>
                            <button className='btn btn-auth-hollow' data-bs-toggle='modal' data-bs-target={`#static-backdrop-${shift.id}`}>Drop</button>
                            <Modal
                                onClickEvent={handleDrop}
                                id={shift.id}
                                obj={shift}
                                title={`Do you want to delete ${shift.hallName} shift ?`}
                                btnTitle={'Delete'}
                            />
                        </li>)
                    }
                </ul>
            </div>
        </div>
    )
}

export default RemoveShift;
