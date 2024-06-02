import React, { useEffect, useState } from 'react';

import SideNav from '../SideNav';
import MyCalendar from '../Common/MyCalendar';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import { getShifts } from '../../../services';

const ManageShift = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const options = [
        { 'name': 'My Schedule', 'route': '/manage-shifts' },
        { 'name': 'Pick Schedule', 'route': '/manage-shifts/pick-schedule' },
        { 'name': 'Drop Schedule', 'route': '/manage-shifts/drop-schedule' },
        { 'name': 'Swap Schedule', 'route': '/manage-shifts/swap-schedule' }
    ];

    const location = useLocation();
    const dispatch = useDispatch();
    const [eventList, setEventList] = useState('');

    useEffect(() => {
        getShifts()
            .then(res => {
                if (res.status === 200) {
                    let arr = [];
                    if (res.status === 200) {
                        res.data.map(d => {
                            if (d.assignedTo === user?.firstName) {
                                arr.push({
                                    title: d.hallName,
                                    start: moment(d.startDate + ' ' + d.startTime).toDate(),
                                    end: moment(d.endDate + ' ' + d.endTime).toDate(),
                                })
                                dispatch({
                                    type: 'SHIFTS',
                                    payload: arr
                                })
                                setEventList(arr);
                            }
                        })
                    }
                }
            })
    }, [location.pathname])

    return (
        <div className='container-fluid row mt-5 p-5 d-flex justify-content-center'>
            <SideNav options={options} />
            <div className='col p-5 shadow'>
                <h2 className='mb-4 text-start'>My Schedule</h2>
                <MyCalendar eventList={eventList} />
            </div>
        </div>
    )
}

export default ManageShift;
