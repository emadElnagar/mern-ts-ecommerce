import { SetStateAction, useState } from "react";
import { InlineForm, BrdInput } from "../styles/form";
import { Button } from "../styles/main";
import { useDispatch, useSelector } from "react-redux";
import { NewCategory } from "../features/CategoryFeatures";

const CategoryForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const { user } = useSelector((state: any) => state.user);
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    dispatch(NewCategory({
      title,
      author: user._id
    }));
  }
  return (
    <InlineForm method="POST" onSubmit={handleSubmit}>
      <BrdInput type="text" name="text" placeholder="Enter the category title here" onChange={(e: { target: { value: SetStateAction<string>; }; }) => setTitle(e.target.value)} required />
      <Button type='submit'>Add</Button>
    </InlineForm>
  )
}

export default CategoryForm;
