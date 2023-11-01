import { InlineForm, BrdInput } from "../styles/form";
import { Button } from "../styles/main";

const CategoryForm = () => {
  return (
    <InlineForm>
      <BrdInput type="text" name="text" placeholder="Enter the category title here" required />
      <Button type='submit'>Add</Button>
    </InlineForm>
  )
}

export default CategoryForm;
