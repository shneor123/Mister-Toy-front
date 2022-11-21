import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { userService } from '../services/user.service'
import { PickColor } from './pick-color';
import { utilService } from '../services/util.service'

import trash from "../assets/img/trash.png"
import edit from "../assets/img/edit.png"
import details from "../assets/img/details.png"
import imgDef from '../assets/img/default.jpg'
import imgSale from '../assets/img/sale-2.png'
import { Draggable } from 'react-beautiful-dnd';

export const ToyPreview = ({ toy, onRemoveToy, cartItems, onAddToCart, onRemoveCart, index }) => {
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

                        <article className="toy-container" style={{ background: blockPickerColor }}>
                            <Link className='links_a' to={`/toy/details/${toy._id}`}>
                                <h1>{toy.name.length > 20 ? toy.name.substring(0, 20) + '...' : toy.name}</h1>
                                <h4>${toy.price}</h4>
                                <p><strong>created:</strong>{utilService.dateToString(createdAt)}</p>
                                <img className='sale_preivew' src={toy.price < 60 ? imgSale : ""} alt="" />
                            </Link>
                            <div className="img-container"><img src={toy.src || imgDef} /></div>

                            {cartItems <= 0 ? (
                                <span className='sp_add_cart flip-in-hor-bottom' onClick={() => onAddToCart(toy)}> + Add To Cart</span>
                            ) : (
                                <div className='add_lass_inCart flip-in-hor-bottom'>
                                    <span className='sp_cart_pre' onClick={() => onAddToCart(toy)}> + </span>
                                    {/* <span className='cart_leng'>{cartItems.qty} In Cart</span> */}
                                    {/* {cartItems.map((item, idx) => (<div key={idx} className="row"><div className="col-2 text-right"> {item.qty}</div></div>))} */}
                                    <span className='sp_cart_pre' onClick={() => onRemoveCart(toy)}> - </span>
                                </div>
                            )}
                            <section className="btns-container">
                                {(loggedInUser?.isAdmin) && <>
                                    <PickColor blockPickerColor={blockPickerColor} setBlockPickerColor={setBlockPickerColor} />
                                    <button className="link_btns delete-btn" onClick={() => onRemoveToy(toy._id)}><img src={trash} /></button>
                                    <Link className='link_btns' to={`/toy/edit/${toy._id}`}><button className="update-btn"><img src={edit}></img></button></Link>
                                    <Link className='link_btns' to={`/toy/details/${toy._id}`}><button><img src={details}></img></button></Link>
                                </>}
                                <div>{(!loggedInUser?.isAdmin) && <Link to={`/toy/details/${toy._id}`}>
                                    <button><img src={details} /></button></Link>}</div>
                            </section>
                        </article >

                    </div>
                )}
            </Draggable>
        </div>
    )
}