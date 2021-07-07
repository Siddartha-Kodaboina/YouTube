import React from 'react';
import loader from '../images/loader.gif';
import './Loader.css';
const Loader = () => {
    return (
        <div className='loading'>
            <img src={loader} alt="Videos" />
        </div>
    )
}

export default Loader
