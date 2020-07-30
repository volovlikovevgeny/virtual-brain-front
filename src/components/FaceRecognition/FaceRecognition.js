import React from 'react'
import './FaceRecognition.css'


const FaceRecognition = ({ imageUrl, boxes }) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputimg' alt='' src={imageUrl} width='500px' height='500px'></img>
                {boxes.map(box => {
                    return < div key={box.topRow} className='bounding-box' style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomCol, left: box.leftCol }}></div>
                })
                }
            </div>
        </div >
    )

}


export default FaceRecognition

