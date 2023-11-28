import { DeleteButton, Slide, UpdateButton } from "../styles/main";
import { HiPencil } from 'react-icons/hi';
import { MdDelete, MdOutlineTimeToLeave } from 'react-icons/md';
import { Key } from "react";
import { useDispatch } from "react-redux";
import { DeleteCategory, GetAllCategories, UpdateCategory } from "../features/CategoryFeatures";
import swal from 'sweetalert2';

type categoryProps = {
  _id: Key;
  title: string
}

type UpdateCategoryType = {
  title: string
}

const CategoryList = (category: categoryProps) => {
  const dispatch = useDispatch();
  let titleInput: HTMLInputElement;
  // Delete category
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
  // Update category
  const handleUpdate = (_id: Key) => {
    swal.fire<UpdateCategoryType>({
      title: 'Update category',
      html: `
        <input type="text" id="title" class="swal2-input" value="${category.title}">
      `,
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      focusConfirm: false,
      didOpen: () => {
        const popup = swal.getPopup()!
        titleInput = popup.querySelector('#title') as HTMLInputElement;
        titleInput.onkeyup = (event) => event.key === 'Enter' && swal.clickConfirm();
      },
      preConfirm: () => {
        const title = titleInput.value;
        if (!MdOutlineTimeToLeave) {
          swal.showValidationMessage(`Please enter title and password`)
        }
        return { title }
      },
    }).then((result) => {
      const  title  = result.value?.title;
      if (result.isConfirmed) {
        dispatch(UpdateCategory({
          _id,
          title
        }));
        dispatch(GetAllCategories());
      }
    });
  }
  return (
    <Slide>
      <div>
        <h4>{category.title}</h4>
      </div>
      <div>
        <UpdateButton onClick={() => handleUpdate(category._id)}><HiPencil /></UpdateButton>
        <DeleteButton onClick={() => handleDelete(category._id)}><MdDelete /></DeleteButton>
      </div>
    </Slide>
  )
}

export default CategoryList;
