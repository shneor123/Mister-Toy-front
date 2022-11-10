import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { ToyPreview } from './toy-preview'

export function Toylist({ toys, onRemoveToy, onAddCart, onRemoveCart }) {
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
                                    toyId={toy._id}
                                    index={index}
                                    onRemoveToy={onRemoveToy}
                                    onAddCart={onAddCart}
                                    onRemoveCart={onRemoveCart}
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

