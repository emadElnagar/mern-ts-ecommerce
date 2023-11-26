import { DeleteButton, Slide, UpdateButton } from "../styles/main";
import { HiPencil } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';
import { Key } from "react";
import { useDispatch } from "react-redux";
import { DeleteCategory, GetAllCategories } from "../features/CategoryFeatures";
import swal from 'sweetalert2';

type categoryProps = {
  _id: Key;
  title: string
}

const CategoryList = (category: categoryProps) => {
  const dispatch = useDispatch();
  const handleDelete = (id: Key) => {
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(DeleteCategory(id));
        dispatch(GetAllCategories());
        swal.fire(
          'Deleted!',
          'Category has been deleted.',
          'success'
        )
      }
    });
  }
  return (
    <Slide>
      <div>
        <h4>{category.title}</h4>
      </div>
      <div>
        <UpdateButton><HiPencil /></UpdateButton>
        <DeleteButton onClick={() => handleDelete(category._id)}><MdDelete /></DeleteButton>
      </div>
    </Slide>
  )
}

export default CategoryList;
