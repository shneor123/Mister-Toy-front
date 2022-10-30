import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { Toylist } from '../cmps/toy-list'
import { loadToys, removeToy, setFilter } from '../store/actions/toy.actions'
import { ToyFilter } from '../cmps/toy-filter'
import { DragDropContext } from 'react-beautiful-dnd'
import { AiOutlineSearch } from "react-icons/ai";
import { userService } from '../services/user.service'

export const ToyApp = () => {

  const { toys, toy } = useSelector((storeState) => storeState.toyModule)
  const { user } = useSelector((storeState) => storeState.userModule)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isOpenModal, setIsOpenModal] = useState(false)

  const onToggleModal = () => {
    setIsOpenModal(!isOpenModal)
  }

  useEffect(() => {
    if (!user) navigate('/login')
    onLoadToys()
  }, [])

  const onLoadToys = () => {
    dispatch(loadToys())
  }

  const onRemoveToy = (toyId) => {
    dispatch(loadToys())
    dispatch(removeToy(toyId))
  }

  const onChangeFilter = (filterBy) => {
    dispatch(setFilter(filterBy))
    dispatch(loadToys())
  }

  const onDragEnd = (result) => { }
  const loggedInUser = userService.getLoggedinUser()
  if (!toys) return <>Loading...</>
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <section className='toy-app'>
        <div>
          <section className="upper-side-menu ">
            <button onClick={onToggleModal} className="btn-opt"><AiOutlineSearch /> Filter cards</button>
          </section>

          {isOpenModal && <div className='filter-open '>
            <ToyFilter onChangeFilter={onChangeFilter} />
          </div>}

          {(loggedInUser?.isAdmin) && <Link to={'/toy/edit'}>
            <span className='add-btn'>Add New Toy</span></Link>}
        </div>
        <Toylist toys={toys} onRemoveToy={onRemoveToy} />
      </section>
    </DragDropContext>
  )
}




































// import { MdOutlineFilterList } from 'react-icons/md'
// import { BsFillFilterCircleFill } from 'react-icons/bs'


{/* <section className="upper-side-menu ">
            <button onClick={onToggleModal} className="btn-opt">
              <AiOutlineSearch />
              Filter cards
            </button>
          </section> */}

{/* {isOpenModal && <div className='filter-open '>
            <ToyFilter onChangeFilter={onChangeFilter} />
          </div>
          } */}

{/* <span
  className={`pop-up-menu ${onToggleModal}`}
  onClick={onToggleModal}>
  {(isOpenModal) ? <BsFillFilterCircleFill /> : <MdOutlineFilterList />}{" "}Filter
</span> */}