import { Fragment } from "react";
import { DeleteButton, Slide, UpdateButton } from "../styles/main";
import { HiPencil } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';

const CategoryList = () => {
  return (
    <Fragment>
      <h1 className="text-center">categories list</h1>
      <Slide>
        <div>
          <h4>category title</h4>
        </div>
        <div>
          <UpdateButton><HiPencil /></UpdateButton>
          <DeleteButton><MdDelete /></DeleteButton>
        </div>
      </Slide>
    </Fragment>
  )
}

export default CategoryList;
