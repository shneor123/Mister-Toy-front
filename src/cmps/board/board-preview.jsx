import React from "react";
import { Link } from "react-router-dom";
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { removeToy } from "../../store/actions/toy.actions";

export function BoardPreview({ board, onToggleStar }) {
  console.log(board, 'board')

const dispatch = useDispatch()
  const onRemoveBoard = (ev) => {
    ev.stopPropagation()
    dispatch(removeToy(board._id));
  };

  return (
    <div className="board-container">
      <Link to={`/board/${board._id}`}>
        <div className="board-preview-container"
          style={{ backgroundColor: 'red', border: '2px solid blue' }}>
          <h3>{board.title}</h3>

          <span className="starred-container">
            {(board.isStar) ?
              <TiStarFullOutline className="star-icon star" onClick={ev => onToggleStar(ev, board._id)} /> :
              <TiStarOutline className="star-icon" onClick={ev => onToggleStar(ev, board._id)} />
            }
          </span>
        </div>
      </Link>
            <button className="remove_board" onClick={onRemoveBoard}>Delete</button> 
    </div>
  )
}
