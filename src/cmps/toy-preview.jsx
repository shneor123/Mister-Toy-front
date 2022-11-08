import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { userService } from '../services/user.service'
import { PickColor } from './pick-color';
import { utilService } from '../services/util.service'

import trash from "../assets/img/trash.png"
import edit from "../assets/img/edit.png"
import details from "../assets/img/details.png"
import imgDef from '../assets/img/default.jpg'


export const ToyPreview = ({ toy, onRemoveToy, onAddCart, onRemoveCart }) => {
    const [blockPickerColor, setBlockPickerColor] = useState('#ece9e9')
    const { createdAt } = toy
    const loggedInUser = userService.getLoggedinUser()
    return (
        // <Link className='links' to={`/toy/details/${toy._id}`} >
        <article className="toy-container" style={{ backgroundColor: blockPickerColor }}>
            <h3>{toy.name.length > 20 ? toy.name.substring(0, 20) + '...' : toy.name}</h3>
            <h4>${toy.price}</h4>
            <p><strong>created:</strong>{utilService.dateToString(createdAt)}</p>
            <div className="img-container"><img src={toy.src || imgDef} /></div>
            <span style={{ cursor: 'pointer' }} onClick={() => onAddCart(toy)}> + Add To Cart</span>
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
        //  </Link>
    )
}




