import React from 'react'
import { BoardPreview } from './board-preview.jsx'
import { CreateNewBoard } from './new-board.jsx'



export function BoardList({ toys, updateToy, onToggleStar, isStarToy }) {
    console.log(toys);
    return (
        <section className='board-list-container'>

            {!isStarToy && <CreateNewBoard />}
            {toys.map(board =>
                <BoardPreview
                    key={board._id}
                    board={board}
                    toy={toys}
                    updateToy={updateToy}
                    onToggleStar={onToggleStar}
                />
            )}
        </section>
    )

}