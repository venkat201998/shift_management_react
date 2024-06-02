import React from 'react';

import SideNav from '../SideNav';

const SwapSchedule = () => {
    const options = [
        { 'name': 'My Schedule', 'route': '/manage-shifts' },
        { 'name': 'Pick Schedule', 'route': '/manage-shifts/pick-schedule' },
        { 'name': 'Drop Schedule', 'route': '/manage-shifts/drop-schedule' },
        { 'name': 'Swap Schedule', 'route': '/manage-shifts/swap-schedule' }
    ];
    return (
        <div className='container-fluid row mt-5 p-5'>
            <SideNav options={options} />
            <div className='col p-5 shadow'>
                <h2 className='mb-4 text-start'>Swap Schedule</h2>
            </div>
        </div>
    )
}

export default SwapSchedule;
