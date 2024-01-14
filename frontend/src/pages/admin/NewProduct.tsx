import { ChangeEvent, Fragment, Key, SetStateAction, useState } from "react";
import { Helmet } from "react-helmet";
import { Button, HeaderCenter, Main, Section } from "../../styles/main";
import SideNav from "../../components/SideNav";
import { Content } from "../../styles/admin";
import { Field, Input, Select, Textarea } from "../../styles/form";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { NewProduct } from "../../features/ProductFeatures";

const NewProductPage = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state: any) => state.category);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState<number|null>(null);
  const [discount, setDiscount] = useState<number|null>(null);
  const [countInStock, setCountInStock] = useState<number|null>(null);
  const [category, setCategory] = useState('');
  const [images, setImages] = useState<File[]>([]);
  // Change price
  const onPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = !Number.isNaN(e.target.valueAsNumber) ? e.target.valueAsNumber : null;
    setPrice(value);
  }
  // Change discount
  const onDiscountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = !Number.isNaN(e.target.valueAsNumber) ? e.target.valueAsNumber : null;
    setDiscount(value);
  }
  // Change count in stock
  const onCountInStockChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = !Number.isNaN(e.target.valueAsNumber) ? e.target.valueAsNumber : null;
    setCountInStock(value);
  }
  // Handle images
  const onImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files){
      for (let i = 0; i < files.length; i++) {
        images.push(files[i]);
      }
    }
  }
  // Handle form submit
  const handleSbmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !description || !brand || !price || !countInStock || !category) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter all required fields'
      });
    }
    else if (discount !== null && discount > price) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Discount can't be greater than price`
      });
    }
    dispatch(NewProduct({
      name,
      description,
      brand,
      price,
      discount,
      countInStock,
      category,
      images
    }));
  }
  return (
    <Fragment>
      <Helmet>
        <title>Electronics-admin</title>
      </Helmet>
      <Main>
        <SideNav />
        <Content>
          <Section>
            <HeaderCenter>add new product</HeaderCenter>
            <form method="POST" onSubmit={handleSbmit} className="product-form" encType="multipart/form-data" acceptCharset="*/images">
              <Field>
                <Input onChange={(e: { target: { value: SetStateAction<string>; }; }) => setName(e.target.value)} type="text" id="name" />
                <label htmlFor="name">name</label>
              </Field>
              <Field>
                <Textarea onChange={(e: { target: { value: SetStateAction<string>; }; }) => setDescription(e.target.value)} id="description"></Textarea>
                <label htmlFor="description">description</label>
              </Field>
              <Field>
                <Input onChange={(e: { target: { value: SetStateAction<string>; }; }) => setBrand(e.target.value)} type="text" id="brand" />
                <label htmlFor="brand">brand</label>
              </Field>
              <Field>
                <Input onChange={onPriceChange} type="number" min="0" id="price" />
                <label htmlFor="price">price</label>
              </Field>
              <Field>
                <Input onChange={onDiscountChange} type="number" min="0" id="discount" />
                <label htmlFor="discount">discount</label>
              </Field>
              <Field>
                <Input onChange={onCountInStockChange} type="number" min="0" id="countinstock" />
                <label htmlFor="countinstock">count in stock</label>
              </Field>
              <Field>
                <Select onChange={(e: { target: { value: SetStateAction<string>; }; }) => setCategory(e.target.value)} name="category" id="category">
                  {
                    categories.map((category: { _id: Key; title: string }) => (
                      <option key={ category._id } value={`${ category.title }`}>{ category.title }</option>
                    ))
                  }
                </Select>
                <label htmlFor="category">category</label>
              </Field>
              <Field>
                <Input onChange={onImagesChange} type="file" id="images" accept="image/*" multiple/>
                <label htmlFor="images">images</label>
              </Field>
              <Button type="submit">submit</Button>
            </form>
          </Section>
        </Content>
      </Main>
    </Fragment>
  )
}

export default NewProductPage;
