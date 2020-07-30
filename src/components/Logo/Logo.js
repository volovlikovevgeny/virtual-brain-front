import React from 'react'
import Tilt from 'react-tilt'
import './Logo.css'
import Brain from './Brain.png'


const Logo = () => {
    return (
        <div className='ma4 mt0 flexing'>
            <Tilt
                className="Tilt br-3 shadow-3"
                options={{
                    reverse: true,  // reverse the tilt direction
                    max: 75,     // max tilt rotation (degrees)
                    perspective: 1000,   // Transform perspective, the lower the more extreme the tilt gets.
                    scale: 1,      // 2 = 200%, 1.5 = 150%, etc..
                    speed: 300,    // Speed of the enter/exit transition
                    transition: true,   // Set a transition on enter/exit.
                    axis: null,   // What axis should be disabled. Can be X or Y.
                    reset: true    // If the tilt effect has to be reset on exit.
                }}
                style={{ height: 150, width: 150, }} >
                < div className="Tilt-inner tc pa3">
                    <img style={{ paddingTop: '7px' }} alt='brain' src={Brain}></img>
                </div>
            </Tilt>
        </div >
    )
}


export default Logo

