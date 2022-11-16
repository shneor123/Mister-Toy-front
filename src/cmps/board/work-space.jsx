import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { TiStarOutline } from "react-icons/ti"
import { AiOutlineClockCircle } from 'react-icons/ai'
import { loadToys, updateToy } from '../store/actions/toy.actions'
import { BoardList } from '../cmps/board/board-list'
import { useNavigate } from 'react-router-dom'

export const WorkSpace = () => {
  const { toys } = useSelector((storeState) => storeState.toyModule)
  const { user } = useSelector((storeState) => storeState.userModule)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  useEffect(() => {
    // if (!user) navigate('/login')
    onLoadToys()
  }, [])

  const onLoadToys = () => {
    dispatch(loadToys())
  }

  const getStarredBoards = () => {
    const starredToys = toys.filter(toy => toy && toy.isStar)
    return starredToys
  }

  const onToggleStar = (ev, toyId) => {
    ev.preventDefault()
    const toy = toys.find(toy => toy._id === toyId)
    toy.isStar = !toy.isStar
    dispatch(updateToy(toy))
  }

  return (
    <section className="workspace-page ">
      <section className="all-boards-list">
        <div className="content-all-boards">

          <section className="starred-boards-section">
            <div className="title-header flex">
              <div className="title-header-icon-container">
                <TiStarOutline className="header-icon star-icon" />
              </div>
              <h3>Starred boards</h3>
            </div>
            <div className="primary-boards-container-section">
              <BoardList
                 toys={getStarredBoards()}
                 updateToy={updateToy}
                 onToggleStar={onToggleStar}
                 isStarToy={true}
              />
            </div>
          </section>

          <section className="recent-boards-section">
            <div className="title-header flex">
              <div className="title-header-icon-container">
                <AiOutlineClockCircle className="header-icon star-icon" />
              </div>
              <h3>Recently viewed</h3>
            </div>
            <div className="primary-boards-container-section ">
              <div className='board-list-container'>
              </div>
              <BoardList
                toys={toys}
                updateToy={updateToy}
                onToggleStar={onToggleStar}
              />
            </div>
          </section>

        </div>
      </section>
    </section >
  )
}