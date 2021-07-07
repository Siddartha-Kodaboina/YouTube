import React from 'react';

const Error = ({error}) => {
    const errorStyle={
        position:'absolute',
        zIndex:12,
        top:'0',
        left:'0',
        width:'98.7vw',
        height:'100vh',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        // paddingLeft:'25%',
        textAlign:'center',
        backgroundColor:'black',
        color:'white'
    }
    return (
        <div style={errorStyle}>
            <h1 style={{marginBottom:'25px',color:'red'}}>{error.error.message}</h1>
            <h1 style={{marginBottom:'25px',color:'red'}}>{error.error.errors[0].reason}</h1>
            <h1 style={{marginBottom:'25px'}}>Visit Tommorrow at 12:30 PM IST </h1>
            <h2>❤ Steve</h2>
        </div>
    )
}

export default Error;
