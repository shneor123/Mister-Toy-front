import React from 'react'
import { NavLink } from 'react-router-dom'
import { Draggable } from 'react-beautiful-dnd'
import { utilService } from '../services/util.service'

import imgDef from '../assets/img/default.jpg'
import imgSale from '../assets/img/sale-2.png'

export const ToyPreview = ({ toy, index, cartItems, onAddToCart, onRemoveCart, onToggleCard }) => {
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
                        <article className="toy-container">
                            <NavLink to={`/toy/details/${toy._id}`}>
                                <div className='toy_row'>
                                    <h1>{toy.name.length > 20 ? toy.name.substring(0, 20) + '...' : toy.name}</h1>
                                    <h4>${toy.price}</h4>
                                </div>
                                <p><strong>created: </strong>{utilService.dateToString(createdAt)}</p>
                                <img className='sale_preivew' src={toy.price < 60 ? imgSale : ""} alt="" />
                            </NavLink>
                            <div className="img-container"><img src={toy.src || imgDef} /></div>
                            {cartItems <= 0 ? <span className='sp_add_cart flip-in-hor-bottom' onClick={() => onAddToCart(toy)}> + Add To Cart</span>
                                : <div className="add_lass_inCart">
                                    <button className="sp_cart_pre" onClick={() => onRemoveCart(toy)}> - </button>{" "}
                                    {/* <span>{cartItems.length} In Cart</span> */}
                                    <button className="sp_cart_pre" onClick={() => onAddToCart(toy)}> + </button>
                                </div>}
                        </article >
                    </div>
                )}
            </Draggable>
        </div>
    )
}