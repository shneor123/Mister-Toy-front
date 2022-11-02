import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { ToyPreview } from './toy-preview'

export function Toylist({ toys, onRemoveToy }) {
    return (
        <Droppable droppableId={`${toys}`}>
            {(provided) => (
                <section
                    className='toys-list-container'
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                >
                    {toys.map((toy, index) => {
                            return (
                                <ToyPreview
                                key={toy._id}
                                toy={toy}
                                toyId={toy._id}
                                index={index}
                                onRemoveToy={onRemoveToy}
                                />
                            );
                        })}

                    {/* {provided.placeholder} */}
                </section>
            )}
        </Droppable>

    )
}

