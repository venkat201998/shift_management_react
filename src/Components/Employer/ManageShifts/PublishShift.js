import React, { useState } from 'react';
import { toast } from 'react-toastify';

import SideNav from '../../Employee/SideNav';
import { createShift } from '../../../services';
import { useNavigate } from 'react-router-dom';

const PublishShift = () => {
    const options = [
        { 'name': 'Active Shifts', 'route': '/employer/manage-shifts' },
        { 'name': 'Publish Shift', 'route': '/employer/manage-shifts/publish-shift' },
        { 'name': 'Remove Shift', 'route': '/employer/manage-shifts/remove-shift' }
    ];

    const navigate = useNavigate();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [hallName, setHallName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        createShift({ hallName, startDate, startTime, endDate, endTime, status: 'active', assignedTo: '' })
            .then((res) => {
                if (res.status === 200) {
                    toast.success('Shift published successfully');
                    navigate('/employer/manage-shifts');
                } else if (res.status === 204) {
                    toast.error('Shift already exists');
                } else {
                    toast.error('Failed to publish the shift');
                }
            })
            .catch((e) => toast.error(e));
    }

    return (
        <div className='container-fluid row mt-5 p-5 d-flex justify-content-center'>
            <SideNav options={options} />
            <div className='col p-5 shadow'>
                <h2 className='mb-4 text-start'>Publish Shift</h2>
                <form onSubmit={handleSubmit} className='text-start'>
                    <div className='mb-3'>
                        <label htmlFor='startDate' className='form-label'>Start Date</label>
                        <input
                            type='date'
                            className='form-control'
                            id='startDate'
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='starttime' className='form-label'>Starts At</label>
                        <input
                            type='time'
                            className='form-control'
                            id='time'
                            placeholder='Enter Time'
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='endDate' className='form-label'>End Date</label>
                        <input
                            type='date'
                            className='form-control'
                            id='endDate'
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='endtime' className='form-label'>Ends At</label>
                        <input
                            type='time'
                            className='form-control'
                            id='time'
                            placeholder='Enter Time'
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='dorm-hall' className='form-label'>Hall Name</label>
                        <input
                            type='dorm-hall'
                            className='form-control'
                            id='dorm-hall'
                            placeholder='Enter Dorm Hall Name'
                            value={hallName}
                            onChange={(e) => setHallName(e.target.value)}
                        />
                    </div>
                    <button type='submit' className='btn btn-auth-hollow mt-2 me-2'>Publish</button>
                    <button type='reset' className='btn btn-auth-filled mt-2 ms-2'>Reset</button>
                </form>
            </div>
        </div>
    )
}

export default PublishShift;
