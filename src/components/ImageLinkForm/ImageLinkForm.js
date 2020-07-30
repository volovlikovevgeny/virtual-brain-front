
import React from 'react'
import '../ImageLinkForm/ImageLinkForm.css'


const ImageLinkForm = ({ OnInputChange, OnButtonSubmit }) => {
    return (
        <div>
            <p className='f3  '>
                {"Этот магический мозг обнаружит лица на фотографии, попробуй) "}
            </p>
            <div className=' center'>
                <div className=' form  pa3 br2 shadow-5 center '>
                    <input className='f4 pa2 w-70 center' type='tex' onChange={OnInputChange} />
                    <button onClick={OnButtonSubmit} style={{ border: 'none' }} className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'>Detect</button>
                </div>
            </div>
        </div>
    )
}


export default ImageLinkForm