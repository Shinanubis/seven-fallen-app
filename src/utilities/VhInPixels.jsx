import React from 'react'

const VhInPixels = () => {
    let vh = window.innerHeight * 0.01;
    return (
        <>
        {
            window.addEventListener("load",(e) => {
                document.documentElement.style.setProperty('--vh', `${vh}px`);
            })
        }
        </>
    )
}

export default VhInPixels
