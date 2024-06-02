import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { updateUser } from '../../../services';

const ManageProfile = () => {
    const { user } = useSelector((state) => ({...state}));
    const options = [
        { 'name': 'Verify Employee', 'route': '/employer/manage-employees' },
        { 'name': 'Add Employee', 'route': '/employer/manage-employees/add-employee' },
        { 'name': 'View Employees', 'route': '/employer/manage-employees/view-employees' }
    ];

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [id, setId] = useState('');
    const [loading, setLoading] = useState(false);
    const [dob, setDob] = useState('');

    useEffect(() => {
        if (user) {
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setEmail(user.email);
            setDob(user.dob);
            setId(user.id);
        }
    }, [user])

    const handleSubmit = async () => {
        if (password === confirmPassword) {
            await updateUser({ firstName, lastName, password, dob, id, status: 'approve' })
                .then((res) => {
                    if (res.status === 200) {
                        const { firstName, lastName, dob } = res.data;
                        setFirstName(firstName);
                        setLastName(lastName);
                        setPassword('');
                        setConfirmPassword('');
                        setDob(dob);
                        toast.success('Profile updated successfully!!');
                    } else {
                        toast.error('Failed to update profile');
                    }
                })
                .catch(e => console.log(e))
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
            <div className='col p-5'>
                <div className={`container m-0 p-0`}>
                    <div className='row justify-content-center'>
                        <div className={`col-md-6 p-5 shadow`}>
                            <h2 className='mb-4'>{'Manage Profile'}</h2>
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
                                        disabled
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

export default ManageProfile;
