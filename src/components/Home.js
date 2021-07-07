import React from 'react'
import './Home.css';
// import Sidebar from '../ui/Sidebar';
import Recommended from '../ui/Recommended';
const Home = () => {
    return (
        <div className="home__page">
            {/* <Sidebar /> */}
            <Recommended />
        </div>
    )
}

export default Home
