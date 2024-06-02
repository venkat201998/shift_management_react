import React from 'react';

import { Link, useLocation } from 'react-router-dom';

import './index.css';

const SideNav = ({ options, title }) => {

    const location = useLocation();

    return (
        <div className='col-2 me-4 p-0 side-nav'>
            <div className='shadow p-4'>
                <h6 className='text-start border-bottom p-3 fw-semibold'>{title || 'Manage Shifts'}</h6>
                <ul className='list-group'>
                    {
                        options.map(option => <li key={option} className={`list-group-item bg-transparent border-0`}>
                            <button className={`btn btn-auth-filled w-100 text-start ${location.pathname === option.route ? 'btn-active' : 'btn-inactive'}`}>
                                <Link to={option.route} className={`text-decoration-none fw-semibold`}>
                                    {option.name}
                                </Link>
                            </button>
                        </li>)
                    }
                </ul>
            </div>
        </div>
    )
}

export default SideNav;
