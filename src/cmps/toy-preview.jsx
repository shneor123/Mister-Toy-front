import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { userService } from '../services/user.service'
import { PickColor } from './pick-color';
import { utilService } from '../services/util.service'

import trash from "../assets/img/trash.png"
import edit from "../assets/img/edit.png"
import details from "../assets/img/details.png"
import imgDef from '../assets/img/default.jpg'
import { Draggable } from 'react-beautiful-dnd';

export const ToyPreview = ({ toy, onRemoveToy, onAddToCart, toyId, index }) => {
    const [sale, setSale] = useState({
        isOnSale: <img className='sale-img-preview' src='https://static5.depositphotos.com/1039762/473/i/600/depositphotos_4735393-stock-photo-red-sale-tag.jpg' />
    })

    const [blockPickerColor, setBlockPickerColor] = useState('#ece9e9')
    const loggedInUser = userService.getLoggedinUser()
    const { createdAt } = toy
    return (
        <div>
            <Draggable draggableId={toy._id} index={index}>
                {(provided) => (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <article className="toy-container" style={{ backgroundColor: blockPickerColor }}>
                            <h3>{toy.name.length > 20 ? toy.name.substring(0, 20) + '...' : toy.name}</h3>
                            <h4>${toy.price}</h4>
                            <p className='sale'>{toy.price < 60 ? sale.isOnSale : ""}</p>
                            <p><strong>created:</strong>{utilService.dateToString(createdAt)}</p>
                            <div className="img-container"><img src={toy.src || imgDef} /></div>
                            <span style={{ cursor: 'pointer' }} onClick={() => onAddToCart(toy)}> + Add To Cart</span>

                            <div className="btns-container">
                                {(loggedInUser?.isAdmin) && <>
                                    <PickColor blockPickerColor={blockPickerColor} setBlockPickerColor={setBlockPickerColor} />
                                    <button className="delete-btn" onClick={() => onRemoveToy(toy._id)}><img src={trash} /></button>
                                    <Link to={`/toy/edit/${toy._id}`}><button className="update-btn"><img src={edit}></img></button></Link>
                                    <Link to={`/toy/details/${toy._id}`}><button><img src={details}></img></button></Link>
                                </>}
                                <div>{(!loggedInUser?.isAdmin) && <Link to={`/toy/details/${toy._id}`}>
                                    <button><img src={details} /></button></Link>}</div>
                            </div>
                        </article >
                    </div>
                )}
            </Draggable>
        </div>
    )
}