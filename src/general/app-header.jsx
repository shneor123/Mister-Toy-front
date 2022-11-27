import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { LogOut } from '../login/logout'
import { onLogout } from '../store/actions/user.actions'
import { BodyColor } from '../cmps/bgc-preivew'

export const AppHeader = () => {
    const { toys } = useSelector((storeState) => storeState.toyModule)
    const { user } = useSelector((storeState) => storeState.userModule)
    const [isOpenModal, setIsOpenModal] = useState(false)
    const { pathname } = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onToggleModal = () => {
        setIsOpenModal(!isOpenModal)
    }

    const onUserLogout = () => {
        setIsOpenModal(false)
        dispatch(onLogout())
        navigate('/login')
    }
    const logOutBtnStyle = !user ? ({ opacity: 0, pointerEvents: 'none' }) : {}
    return (
        <header className='app-header'>
            <BodyColor />
            <div className='nav-line-container'>
                <div>
                    <button onClick={onToggleModal} className="logout-btn user-info" style={logOutBtnStyle}>
                        {user && user.imgUrl && <img src={user.imgUrl} />}
                    </button>
                    {isOpenModal && <div className='modal'>
                        <button onClick={onToggleModal} className="logout-btn" style={{ marginLeft: '40%', marginTop: '10%' }}>
                            {user && user?.username.charAt(0).toUpperCase()}
                        </button>
                        <hr />
                        <p>{user?.fullname}</p>
                        {user.isAdmin &&
                            <i className='user-settings' onClick={onToggleModal}>
                                <Link to="/toy/statistics">Dashboard</Link>
                                <Link to="/reviews">Reviews</Link>
                                <Link to="/users">Users</Link>
                            </i>}
                        <hr />
                        <div onClick={onUserLogout}>
                            <LogOut user={user} />
                        </div>
                    </div>}
                </div>
                <nav className='nav-links '>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/toy">Toys</NavLink>
                </nav>
            </div>
            {pathname !== '/' && pathname !== '/about' && pathname !== '/login' && pathname !== '/signup' &&
                <div className="header-titles-container">
                    <Link className="mister-toy-logo wobble-hor-bottom " to="/toy">
                        <h1>Mister Toy</h1></Link>
                    <div className="header-inf">{pathname === '/toy' && <h3>Toys: {toys.length}</h3>}</div></div>
            }
        </header>
    )
}