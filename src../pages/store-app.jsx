import React from 'react'
import { Basket } from './basket'

export const StoreApp = ({ cartItems, onAdd, onRemove }) => {
    return (
        <Basket cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} />

    )
}
