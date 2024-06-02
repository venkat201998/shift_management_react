import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Modal from '../Common/Modal';
import { getShifts, updateShift } from '../../../services';
import SideNav from '../SideNav';

const PickSchedule = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const options = [
        { 'name': 'My Schedule', 'route': '/manage-shifts' },
        { 'name': 'Pick Schedule', 'route': '/manage-shifts/pick-schedule' },
        { 'name': 'Drop Schedule', 'route': '/manage-shifts/drop-schedule' },
        { 'name': 'Swap Schedule', 'route': '/manage-shifts/swap-schedule' }
    ];

    const location = useLocation();
    const dispatch = useDispatch();
    const [shifts, setShifts] = useState('');

    useEffect(() => {
        getShifts()
            .then(res => {
                if (res.status === 200) {
                    dispatch({
                        type: 'SHIFTS',
                        payload: res.data
                    })
                    setShifts(res.data.filter(d => d.assignedTo === ''));
                }
            })
            .catch(e => console.log(e))
    }, [location.pathname])

    const handlePick = (shift) => {
        updateShift({ ...shift, assignedTo: user?.firstName })
            .then((res) => {
                if (res.status === 200) {
                    toast.success('Shift picked successfully!!');
                    dispatch({
                        type: 'SHIFTS',
                        payload: res.data
                    })
                    setShifts(res.data.filter(d => d.assignedTo === ''));
                } else {
                    toast.error('Failed to pick the shift');
                }
            })
            .catch(e => console.log(e))
    }

    return (
        <div className='container-fluid row mt-5 p-5'>
            <SideNav options={options} />
            <div className='col p-5 shadow'>
                <h2 className='mb-4 text-start'>Pick Schedule</h2>
                <ul className='list-group'>
                    {
                        shifts && shifts?.map(shift => <li className='list-group-item rounded m-2 border bg-transparent d-flex justify-content-between align-items-center'>
                            <ul className='list-group text-start'>
                                <li className='list-group-item rounded-0 border-0 border bg-transparent p-1 fw-bold'>{shift.hallName}</li>
                                <li className='list-group-item rounded-0 border-0 border bg-transparent p-1'>Starts At: {shift.startDate} - {shift.startTime}</li>
                                <li className='list-group-item rounded-0 border-0 border bg-transparent p-1'>Ends At: {shift.endDate} - {shift.endTime}</li>
                            </ul>
                            <ul className='list-group text-start'>
                                <li className='list-group-item rounded-0 border-0 border bg-transparent p-1'>Status: {'Active'}</li>
                            </ul>
                            <button className='btn btn-auth-hollow' data-bs-toggle='modal' data-bs-target={`#static-backdrop-${shift.id}`}>Pick</button>
                            <Modal
                                onClickEvent={handlePick}
                                id={shift.id}
                                obj={shift}
                                title={`Do you want to pick ${shift.hallName} shift ?`}
                                btnTitle={'Pick'}
                            />
                        </li>)
                    }
                </ul>
            </div>
        </div>
    )
}

export default PickSchedule;
