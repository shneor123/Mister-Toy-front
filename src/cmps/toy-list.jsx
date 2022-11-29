import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { ToyPreview } from './toy-preview'

export function Toylist({ toys, cartItems, onAddToCart, onRemoveCart,onToggleCard }) {
    return (
        <Droppable droppableId="toys-list-container">
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className='toys-list-container'
                >
                    {toys && toys.map((toy, index) => {
                        return (
                            <ToyPreview
                                key={toy._id}
                                toy={toy}
                                index={index}
                                cartItems={cartItems}
                                onAddToCart={onAddToCart}
                                onRemoveCart={onRemoveCart}
                                onToggleCard={onToggleCard}
                            />
                        )
                    })}
                    {provided.placeholder}
                </div>

            )
            }
        </Droppable>
    )
}

