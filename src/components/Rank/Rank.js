import React from 'react'


const Rank = ({ name, entries }) => {
    console.log(name, entries);
    return (
        <div>
            <div className='white f3'>
                {`${name}, Ваше текущее количество попыток:`}
            </div>
            <div className='white f1'>
                {entries}
            </div>
        </div>

    )
}


export default Rank