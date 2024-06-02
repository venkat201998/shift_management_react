import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { checkUser, createOrUpdateUser } from '../../../services';
import SideNav from '../../Employee/SideNav';

const AddEmployee = () => {
    const options = [
        { 'name': 'Verify Employee', 'route': '/employer/manage-employees' },
        { 'name': 'Add Employee', 'route': '/employer/manage-employees/add-employee' },
        { 'name': 'View Employees', 'route': '/employer/manage-employees/view-employees' }
    ];

    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [id, setId] = useState('');
    const [loading, setLoading] = useState(false);
    const [dob, setDob] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await checkUser(email)
            .then((res) => {
                if (res.status === 200) {
                    toast.success('User Exists!!');
                    navigate('/employer/manage-employees');
                } else {
                    handleSignup();
                }
            })
    };

    const handleSignup = async () => {
        const userDetails = { firstName, lastName, email, password, dob, role: 'employee', status: 'waiting' };
        if (password === confirmPassword) {
            await createOrUpdateUser(userDetails)
                .then((res) => {
                    if (res.status === 200) {
                        toast.success('Signup Success!!');
                        navigate('/employer/manage-employees');
                    } else {
                        toast.error('Failed to Signup');
                    }
                    setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);
                    toast.error(error);
                });
        } else {
            toast.error('Passwords Mismatch');
        }
    }

    const handleClear = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setDob('');
    }

    return (
        <div className='container-fluid row mt-5 p-5 d-flex justify-content-center'>
            <SideNav options={options} title={'Manage Employees'} />
            <div className='col p-5 shadow'>
                <div className={`container m-0 p-0`}>
                    <div className='row justify-content-center'>
                        <div className={`col-12 p-5 shadow`}>
                            <h2 className='mb-4'>{'Add Employee'}</h2>
                            <form onSubmit={handleSubmit} onReset={handleClear} className='text-start'>
                                <div className='mb-3'>
                                    <label htmlFor='firstName' className='form-label'>First Name</label>
                                    <input
                                        required
                                        type='text'
                                        className='form-control'
                                        id='firstName'
                                        placeholder='Enter first name'
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='lastName' className='form-label'>Last Name</label>
                                    <input
                                        required
                                        type='text'
                                        className='form-control'
                                        id='lastName'
                                        placeholder='Enter last name'
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='email' className='form-label'>Email address</label>
                                    <input
                                        required
                                        type='email'
                                        className='form-control'
                                        id='email'
                                        placeholder='Enter email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='password' className='form-label'>Password</label>
                                    <input
                                        required
                                        type='password'
                                        className='form-control'
                                        id='password'
                                        placeholder='Password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='confirmPassword' className='form-label'>Confirm Password</label>
                                    <input
                                        required
                                        type='password'
                                        className='form-control'
                                        id='confirmPassword'
                                        placeholder='Confirm Password'
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='dob' className='form-label'>Date of Birth</label>
                                    <input
                                        required
                                        type='date'
                                        className='form-control'
                                        id='dob'
                                        value={dob}
                                        onChange={(e) => setDob(e.target.value)}
                                    />
                                </div>
                                <button
                                    type='submit'
                                    className='btn btn-auth-hollow me-2'
                                >
                                    {'Submit'}
                                </button>
                                <button type='reset' className='btn btn-auth-filled ms-2'>Reset</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddEmployee;
