import React, { useState } from 'react'

import trash from "../assets/img/trash.png"
import edit from "../assets/img/edit.png"
import details from "../assets/img/details.png"
import imgDef from '../assets/img/default.jpg'

import { Link } from 'react-router-dom'
import { userService } from '../services/user.service'
import { Draggable } from 'react-beautiful-dnd'

export const ToyPreview = ({ toy, onRemoveToy, index }) => {
    const [isOpenModal, setIsOpenModal] = useState(false)

    const onToggleModal = () => {
        setIsOpenModal(!isOpenModal)
    }

    const loggedInUser = userService.getLoggedinUser()
    return (
        <Draggable key={toy._id} draggableId={toy._id} index={index}>
            {(provided) => (
                <Link className='links' to={`/toy/details/${toy._id}`}>
                    <article className="toy-container"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <h2>{toy.name}</h2>
                        <h3>${toy.price}</h3>
                        <div className="img-container">
                            <img src={toy.src || imgDef} />
                        </div>

                        <div className="btns-container">
                            {(loggedInUser?.isAdmin) &&
                                <>
                                    <button className="delete-btn" onClick={() => onRemoveToy(toy._id)}>
                                        <img src={trash}></img>
                                    </button>

                                    <Link to={`/toy/edit/${toy._id}`}>
                                        <button className="update-btn"><img src={edit}></img></button>
                                    </Link>

                                    <Link to={`/toy/details/${toy._id}`}>
                                        <button><img src={details}></img></button>
                                    </Link>
                                </>
                            }
                            <div>{(!loggedInUser?.isAdmin) && <Link to={`/toy/details/${toy._id}`}>
                                <button><img src={details} /></button></Link>}</div>
                        </div>
                        {provided.placeholder}

                    </article >
                </Link>
            )}
        </Draggable>
    )
}



