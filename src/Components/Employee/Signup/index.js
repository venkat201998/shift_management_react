import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { createOrUpdateUser, checkUser } from '../../../services';
// import { useSelector } from 'react-redux';

const Signup = () => {
    // const { user } = useSelector((state) => ({ ...state }));
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
                    navigate('/login')
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
                        navigate('/login');
                    } else {
                        toast.error('Failed to Signup');
                    }
                    setLoading(false);
                    navigate('/');
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
        <div className={`container mt-5 pt-5`}>
            <div className='row justify-content-center'>
                <div className={`col-md-6 p-5 shadow`}>
                    <h2 className='mb-4'>{'Sign Up'}</h2>
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
                    <div className='mt-3'>
                        Already have an account? <Link to='/login' className='text-decoration-none'>Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
