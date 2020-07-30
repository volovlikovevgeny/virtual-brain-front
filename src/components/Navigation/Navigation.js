import React from 'react'


const Navigation = ({ OnRouteChange, isSignedIn }) => {
    if (isSignedIn) {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p onClick={() => OnRouteChange('signout')} className='f3 link dim white underline pa3 pointer'>Выйти</p>
            </nav>
        )
    } else {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p onClick={() => OnRouteChange('SignIn')} className=' f3   link dim  b--black-10  pa3 pointer underline'>Войти</p>
                <p onClick={() => OnRouteChange('register')} className='f3  link dim  b--black-10 pa3 pointer underline'>Регистрация</p>
            </nav>
        )
    }
}

export default Navigation