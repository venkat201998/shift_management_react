import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import SideNav from '../../Employee/SideNav';
import { getUsers } from '../../../services';

const ViewEmployees = () => {
    const options = [
        { 'name': 'Verify Employee', 'route': '/employer/manage-employees' },
        { 'name': 'Add Employee', 'route': '/employer/manage-employees/add-employee' },
        { 'name': 'View Employees', 'route': '/employer/manage-employees/view-employees' }
    ];

    const location = useLocation();
    const [employees, setEmployess] = useState('');

    useEffect(() => {
        getUsers()
            .then((res) => {
                if (res.status === 200) {
                    setEmployess(res.data);
                }
            })
    }, [location.pathname])

    return (
        <div className='container-fluid row mt-5 p-5 d-flex justify-content-center'>
            <SideNav options={options} title={'Manage Employees'} />
            <div className='col p-5 shadow'>
                <h2 className='mb-4 text-start'>View Employees</h2>
                <ul className='list-group'>
                    {
                        employees && employees?.map(employee => <li className='list-group-item rounded m-2 border bg-transparent d-flex justify-content-between align-items-center'>
                            <ul className='list-group text-start'>
                                <li className='list-group-item rounded-0 border-0 border bg-transparent p-1 fw-bold'>{employee?.firstName?.concat(' ', employee?.lastName)}</li>
                                <li className='list-group-item rounded-0 border-0 border bg-transparent p-1'>Email: {employee?.email}</li>
                                <li className='list-group-item rounded-0 border-0 border bg-transparent p-1'>Date of Birth: {employee?.dob}</li>
                            </ul>
                            <ul className='list-group text-start'>
                                <li className='list-group-item rounded-0 border-0 border bg-transparent p-1'>Status: {employee?.status}</li>
                            </ul>
                        </li>)
                    }
                </ul>
            </div>
        </div>
    )
}

export default ViewEmployees;
