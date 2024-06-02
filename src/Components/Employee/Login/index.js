import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { loginUser, checkUser } from '../../../services';

import './index.css'

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await checkUser(email)
            .then((res) => {
                if (res.data.status === 202) {
                    toast.success('No User Exists!!');
                    navigate('/signup')
                } else {
                    handleLogin();
                }
            })
            .catch(e => toast.error(e))
    }

    const handleLogin = async () => {
        await loginUser(email, password)
            .then((res) => {
                if (res.data.status === 200) {
                    const { firstName, lastName, email, dob, id, role } = res.data.data;
                    dispatch({
                        type: 'LOGGED_IN_USER',
                        payload: { id, firstName, lastName, email, dob, role }
                    });
                    localStorage.setItem('email', email);
                    toast.success(res.data.message);
                    navigate('/');
                } else {
                    toast.error('Login Failed!!');
                }
            })
            .catch(() => {
                toast.error('Login Failed!!');
                navigate('/login');
            })
    }

    return (
        <div className='container mt-5 pt-5'>
            <div className='row justify-content-center'>
                <div className='col-md-6 p-5 shadow'>
                    <h2 className='mb-4'>Login</h2>
                    <form onSubmit={handleSubmit} className='text-start'>
                        <div className='mb-3'>
                            <label htmlFor='email' className='form-label'>Email address</label>
                            <input
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
                                type='password'
                                className='form-control'
                                id='password'
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type='submit' className='btn btn-auth-hollow me-2'>Submit</button>
                        <button type='reset' className='btn btn-auth-filled ms-2'>Reset</button>
                    </form>
                    <div className='mt-3'>
                        Don't have an account? <Link to='/signup' className='text-decoration-none'>Sign up</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
