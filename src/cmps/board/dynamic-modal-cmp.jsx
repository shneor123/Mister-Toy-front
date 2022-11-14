import { IoMdClose } from "react-icons/io";
import { AddBoard } from "./add-board";

export const DynamicModalCmp = ({
  modalDetails: { bottom },
  onCloseModal,
  modalTitle,
}) => {
  let modalTypeToOpen;
  console.log(modalTitle);
  switch (modalTitle) {
    case "Create Board":
      if (bottom >= 170 && bottom < 230) bottom -= 60;
      if (bottom >= 230 && bottom < 260) bottom -= 100;
      if (bottom >= 260 && bottom < 300) bottom -= 140;
      if (bottom >= 300) bottom -= 200;
      modalTypeToOpen = <AddBoard onCloseModal={onCloseModal} />;
      break;
  }
  return (
    <div
    >
      <div className="modal-header-wrapper">
        <div className="modal-header">
          {modalTitle}
          <span onClick={onCloseModal} className="modal-close-btn">
            <IoMdClose />
          </span>
        </div>
      </div>
      <div className="modal-content-wrapper">{modalTypeToOpen}</div>
    </div>
  );
};

// props:
// {
//   component functions and props
//   component(s) to render
//   modalTitle
// height, width, modal size
// button size: to subtract half of the button size from the top so it will open under the button
//   *** assuming the event opens in the middle of the button
//  top subtract button size from it and make it the start point
// }

// add title, add title style
//

// DEFAULT WIDTH SHOULD BE 304PX
