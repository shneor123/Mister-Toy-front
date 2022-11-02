import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { toyService } from '../services/toy.service';
import { saveBg } from '../store/actions/toy.actions';

export const PickerColor = ({ toy, color }) => {
    const [state, setState] = useState({
        toy: null,
        color: color
    })

    
    const onChangeBgc = (toyId, color) => {
        toyService.changeBgc(toyId, color)
            .then((toy) => {
                setState({ toy })
            })
    }

    const bgColors = [
        { id: 'c1', color: '#d29034' },
        { id: 'c2', color: '#0079bf' },
        { id: 'c3', color: '#b04632' },
        { id: 'c4', color: '#519839' },
        { id: 'c5', color: '#cd5a91' },
        { id: 'c6', color: '#89609e' },
    ]

    return (
        <section className="color-container" style={{ background: bgColors.color }}>
            <section className="color-menu">
                {bgColors.map((color) => {
                    return <div key={color._id} className="color-input"
                        style={{ background: color.color }}
                        onClick={() => onChangeBgc(toy._id, state.color)}
                    >
                    </div>
                })}
            </section>
        </section>
    )
}
