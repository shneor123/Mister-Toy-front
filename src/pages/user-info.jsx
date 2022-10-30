import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { utilService } from '../services/util.service'
import { loadUsers, removeUser } from "../store/actions/user.actions"

export const UsersInfo = () => {
    const { users } = useSelector((storeState) => storeState.userModule)
    const [selectedUser, setSelectedUser] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadUsers(null))
    }, [])

    console.log(selectedUser)
    console.log('users', users)
    if (!users) return <></>
    return (
        <section className="users-container">
            <div className="user-inf">users: {users.length}</div>
            <h2>Users:</h2>
            <div className="user-info">
                {users.map((user) =>
                    <div onClick={() => setSelectedUser(user)} key={user._id}
                        className={`user-preview ${selectedUser?._id === user._id ? 'selected' : ''}`}>

                        <div className="user-img-container">
                            <img src={user?.imgUrl} />
                        </div>
                        <span>{user.isAdmin ? 'isAdmin' : ""}</span>
                        <h2>{user.fullname}</h2>
                        <p><strong>Member Since: </strong>{utilService.backendTimeStamp(user.createdAt)}</p>
                        {!user.isAdmin &&
                            <button className='delete-btn' onClick={() => dispatch(removeUser(user._id))}>
                                Remove -{user.username}
                            </button>
                        }
                    </div>)}
            </div>
        </section >
    )
}
