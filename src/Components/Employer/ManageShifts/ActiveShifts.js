import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import moment from 'moment';

import { getShifts } from '../../../services';
import SideNav from '../../Employee/SideNav';
import MyCalendar from '../../Employee/Common/MyCalendar';

const ActiveShifts = () => {
    const options = [
        { 'name': 'Active Shifts', 'route': '/employer/manage-shifts' },
        { 'name': 'Publish Shift', 'route': '/employer/manage-shifts/publish-shift' },
        { 'name': 'Remove Shift', 'route': '/employer/manage-shifts/remove-shift' }
    ];

    const location = useLocation();
    const dispatch = useDispatch();
    const [eventList, setEventList] = useState([]);

    useEffect(() => {
        getShifts()
            .then(res => {
                if (res.status === 200) {
                    let arr = [];
                    if (res.status === 200) {
                        dispatch({
                            type: 'SHIFTS',
                            payload: res.data
                        })
                    }
                    res.data.map(d => {
                        arr.push({
                            title: d.hallName,
                            start: moment(d.startDate + ' ' + d.startTime).toDate(),
                            end: moment(d.endDate + ' ' + d.endTime).toDate(),
                        })
                        setEventList(arr);
                    })
                }
            })
    }, [location.pathname])

    return (
        <div className='container-fluid row mt-5 p-5 d-flex justify-content-center'>
            <SideNav options={options} />
            <div className='col p-5 shadow'>
                <h2 className='mb-4 text-start'>Active Shifts</h2>
                <MyCalendar eventList={eventList} />
            </div>
        </div>
    )
}

export default ActiveShifts;
