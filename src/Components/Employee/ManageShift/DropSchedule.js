import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import SideNav from '../SideNav';
import Modal from '../Common/Modal'
import { getShifts, updateShift } from '../../../services';

import './index.css';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const DropSchedule = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const location = useLocation();
    const [shifts, setShifts] = useState([]);

    const options = [
        { 'name': 'My Schedule', 'route': '/manage-shifts' },
        { 'name': 'Pick Schedule', 'route': '/manage-shifts/pick-schedule' },
        { 'name': 'Drop Schedule', 'route': '/manage-shifts/drop-schedule' },
        { 'name': 'Swap Schedule', 'route': '/manage-shifts/swap-schedule' }
    ];

    useEffect(() => {
        getShifts()
            .then(res => {
                if (res.status === 200) {
                    if (res.status === 200) {
                        setShifts(res.data.filter(d => d.assignedTo === user?.firstName));
                    }
                }
            })
    }, [location.pathname])

    const handleDrop = (shift) => {
        updateShift({ ...shift, assignedTo: '' })
            .then((res) => {
                if (res.status === 200) {
                    toast.success('Shift droped successfully!!');
                    setShifts(res.data.filter(d => d.assignedTo === user?.firstName));
                } else {
                    toast.error('Failed to drop the shift');
                }
            })
            .catch(e => console.log(e))
    }

    return (
        <div className='container-fluid d-flex justify-content-center row mt-5 p-5'>
            <SideNav options={options} />
            <div className='col p-5 shadow'>
                <h2 className='mb-4 text-start'>Drop Schedule</h2>
                <ul className='list-group'>
                    {
                        shifts && shifts?.map(shift => <li className='list-group-item rounded m-2 border bg-transparent d-flex justify-content-between align-items-center'>
                            <ul className='list-group text-start'>
                                <li className='list-group-item rounded-0 border-0 border bg-transparent p-1 fw-bold'>{shift.hallName}</li>
                                <li className='list-group-item rounded-0 border-0 border bg-transparent p-1'>Starts At: {shift.startDate} - {shift.startTime}</li>
                                <li className='list-group-item rounded-0 border-0 border bg-transparent p-1'>Ends At: {shift.endDate} - {shift.endTime}</li>
                            </ul>
                            <ul className='list-group text-start'>
                                <li className='list-group-item rounded-0 border-0 border bg-transparent p-1 fw-bold'>Assigned To: {shift.assignedTo}</li>
                                <li className='list-group-item rounded-0 border-0 border bg-transparent p-1'>Status: {'Active'}</li>
                            </ul>
                            <button className='btn btn-auth-hollow' data-bs-toggle='modal' data-bs-target={`#static-backdrop-${shift.id}`}>Drop</button>
                            <Modal
                                onClickEvent={handleDrop}
                                id={shift.id}
                                obj={shift}
                                title={`Do you want to drop ${shift.hallName} shift ?`}
                                btnTitle={'Drop'}
                            />
                        </li>)
                    }
                </ul>
            </div>
        </div>
    )
}

export default DropSchedule;
