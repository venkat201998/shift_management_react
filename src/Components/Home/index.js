import React from 'react';

import banner from '../../Assets/banner-01.webp';

import './index.css';

const Home = () => {
    return(
        <div className='delivery-home'>
            <img src={banner} alt='food-delivery-app' className='delivery-img' />
        </div>
    )
}

export default Home;
