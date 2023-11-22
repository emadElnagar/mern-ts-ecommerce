import { DeleteButton, Slide, UpdateButton } from "../styles/main";
import { HiPencil } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';

type categoryProps = {
  title: string
}

const CategoryList = (category: categoryProps) => {
  return (
    <Slide>
      <div>
        <h4>{category.title}</h4>
      </div>
      <div>
        <UpdateButton><HiPencil /></UpdateButton>
        <DeleteButton><MdDelete /></DeleteButton>
      </div>
    </Slide>
  )
}

export default CategoryList;
