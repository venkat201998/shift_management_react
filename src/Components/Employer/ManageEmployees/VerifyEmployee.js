import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

import { updateUser } from '../../../services';
import SideNav from '../../Employee/SideNav';
import { getUsers } from '../../../services';
import Modal from '../../Employee/Common/Modal';

const VerifyEmployees = () => {
    const options = [
        { 'name': 'Verify Employee', 'route': '/employer/manage-employees' },
        { 'name': 'Add Employee', 'route': '/employer/manage-employees/add-employee' },
        { 'name': 'View Employees', 'route': '/employer/manage-employees/view-employees' }
    ];

    const location = useLocation();
    const [employees, setEmployess] = useState('');
    const [selection, setSelection] = useState('');

    useEffect(() => {
        getUsers()
            .then((res) => {
                if (res.status === 200) {
                    setEmployess(res.data.filter(user => user.status === 'waiting'));
                }
            })
    }, [location.pathname])

    const handleDrop = (employee, status) => {
        updateUser({ ...employee, status })
            .then((res) => {
                if (res.status === 200) {
                    setEmployess(res.data.filter(user => user.status === 'waiting'));
                    toast.success('Employee status updated successfully!!');
                } else {
                    toast.error('Failed to update employee status');
                }
            })
            .catch((e) => console.log(e))
    }

    return (
        <div className='container-fluid row mt-5 p-5 d-flex justify-content-center'>
            <SideNav options={options} title={'Manage Employees'} />
            <div className='col p-5 shadow'>
                <h2 className='mb-4 text-start'>Verify Employee</h2>
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
                            <ul className='list-group d-flex flex-row'>
                                <li key={'li-approve'} className='list-group-item rounded-0 border-0 border bg-transparent p-0'>
                                    <button className='btn btn-auth-hollow me-2' data-bs-toggle='modal' data-bs-target={`#static-backdrop-${employee?.id}`} onClick={() => setSelection('approve')}>Approve</button>
                                </li>
                                <li key={'li-decline'} className='list-group-item rounded-0 border-0 border bg-transparent p-0'>
                                    <button className='btn btn-auth-filled me-2' data-bs-toggle='modal' data-bs-target={`#static-backdrop-${employee?.id}`} onClick={() => setSelection('decline')}>Decline</button>
                                </li>
                            </ul>
                            <Modal
                                onClickEvent={handleDrop}
                                id={employee?.id}
                                obj={employee}
                                title={`Do you want to  ${selection + ' ' + employee?.firstName} account ?`}
                                btnTitle={selection}
                            />
                        </li>)
                    }
                </ul>
            </div>
        </div>
    )
}

export default VerifyEmployees;
