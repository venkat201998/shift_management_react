import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './index.css';

const Nav = () => {

    const { user } = useSelector((state) => ({ ...state }));
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignout = () => {
        dispatch({
            type: 'LOGOUT',
            payload: null
        })
        localStorage.removeItem('email');
        navigate('/');
    }

    return (
        <nav className='navbar navbar-top navbar-light fixed-top shadow-lg'>
            <div className='container-fluid justify-content mx-md-3'>
                <div>
                    <Link className='navbar-brand fw-bold fs-5' to={'/'}>{'RSA Shift Management'}</Link>
                </div>
                <div className='dropdown justify-content-end mx-3 d-flex'>
                    <button className='navbar-toggler mx-md-3 mx-2' type='button' data-bs-toggle='offcanvas' data-bs-target='#offcanvaslightNavbarOuter' aria-controls='offcanvaslightNavbarOuter'>
                        <span><i className='bi bi-person'></i></span>
                    </button>

                    <div className='offcanvas offcanvas-end text-bg-light' tabIndex='-1' id='offcanvaslightNavbarOuter' aria-labelledby='offcanvaslightNavbarOuterLabel'>
                        <div className='offcanvas-header'>
                            <h5 className='offcanvas-title' id='offcanvaslightNavbarOuterLabel'>
                                Welcome
                            </h5>
                            <button type='button' className='btn-close btn-close-black' data-bs-dismiss='offcanvas' aria-label='Close'></button>
                        </div>
                        <div className='offcanvas-body py-0'>
                            {
                                !user ? <ul className='navbar-nav text-start flex-grow-1'>
                                    <li className='nav-item'>
                                        <button className='btn btn-auth-filled w-50 m-2' data-bs-dismiss='offcanvas'>
                                            <Link className='fw-semibold text-decoration-none custom-text-color' to={'/login'}>{'Login'}</Link>
                                        </button>
                                    </li>
                                    <li className='nav-item'>
                                        <button className='btn btn-auth-filled w-50 m-2' data-bs-dismiss='offcanvas'>
                                            <Link className='fw-semibold text-decoration-none custom-text-color' to={'/signup'}>{'Create Account'}</Link>
                                        </button>
                                    </li>
                                </ul> : (user.role === 'employee' ? <ul className='navbar-nav text-start flex-grow-1'>
                                    <li className={`nav-item px-1 py-1 rounded btn-option`}>
                                        <button className={`btn border-0 text-start ${location.pathname.includes('/manage-shifts') ? 'btn-active' : 'btn-inactive'}`} data-bs-dismiss='offcanvas'>
                                            <Link className='fw-semibold text-decoration-none' to={'/manage-shifts'}>{'Manage Shifts'}</Link>
                                        </button>
                                    </li>
                                    <li className={`nav-item px-1 py-1 rounded btn-option`}>
                                        <button className={`btn border-0 text-start ${location.pathname.includes('/manage-profile') ? 'btn-active' : 'btn-inactive'}`} data-bs-dismiss='offcanvas'>
                                            <Link className='fw-semibold text-decoration-none' to={'/manage-profile'}>{'Manage Profile'}</Link>
                                        </button>
                                    </li>
                                    <li key={'li-signout'} className={`nav-item px-1 py-1 rounded btn-option`}>
                                        <button className='btn border-0 text-start custom-text-color' data-bs-dismiss='offcanvas' onClick={handleSignout}>
                                            <Link className='fw-semibold text-decoration-none custom-text-color'>{'Signout'}</Link>
                                        </button>
                                    </li>
                                </ul> :
                                    <ul className='navbar-nav text-start flex-grow-1'>
                                        <li key={'li-manage-emp'} className={`nav-item px-1 py-1 rounded btn-option`}>
                                            <button className={`btn border-0 text-start ${location.pathname.includes('/manage-employees') ? 'btn-active' : 'btn-inactive'}`} data-bs-dismiss='offcanvas'>
                                                <Link className='fw-semibold text-decoration-none' to={'/employer/manage-employees'}>{'Manage Employees'}</Link>
                                            </button>
                                        </li>
                                        <li key={'li-manage-shif'} className={`nav-item px-1 py-1 rounded btn-option`}>
                                            <button className={`btn border-0 text-start ${location.pathname.includes('/manage-shifts') ? 'btn-active' : 'btn-inactive'}`} data-bs-dismiss='offcanvas'>
                                                <Link className='fw-semibold text-decoration-none' to={'/employer/manage-shifts'}>{'Manage Shifts'}</Link>
                                            </button>
                                        </li>
                                        <li key={'li-manage-prof'} className={`nav-item px-1 py-1 rounded btn-option`}>
                                            <button className={`btn border-0 text-start ${location.pathname.includes('/manage-profile') ? 'btn-active' : 'btn-inactive'}`} data-bs-dismiss='offcanvas'>
                                                <Link className='fw-semibold text-decoration-none' to={'/employer/manage-profile'}>{'Manage Profile'}</Link>
                                            </button>
                                        </li>
                                        <li key={'li-signout'} className={`nav-item px-1 py-1 rounded btn-option`}>
                                            <button className={`btn border-0 text-start ${location.pathname.includes('/signout') ? 'btn-active' : 'btn-inactive'}`} data-bs-dismiss='offcanvas' onClick={handleSignout}>
                                                <Link className='fw-semibold text-decoration-none'>{'Signout'}</Link>
                                            </button>
                                        </li>
                                    </ul>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Nav;
