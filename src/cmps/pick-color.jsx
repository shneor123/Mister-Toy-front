import { useState } from "react"
import { TwitterPicker } from "react-color";
import { IoIosColorFilter } from 'react-icons/io'

export const PickColor = ({ blockPickerColor, setBlockPickerColor }) => {

    const [isOpenModal, setIsOpenModal] = useState(false)

    const onToggleModal = () => {
        setIsOpenModal(!isOpenModal)
    }

    return (
        <>
            <button onClick={onToggleModal} className="update-btn">
                <IoIosColorFilter />
            </button>
            {isOpenModal && <div style={{
                width: '0px',
                height: '0px',
                border: "2px solid white"
            }}>
                <TwitterPicker color={blockPickerColor}
                    onChange={(color) => { setBlockPickerColor(color.hex) }} />
            </div>
            }
        </>
    )
}