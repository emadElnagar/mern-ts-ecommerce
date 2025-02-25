import {
  Fragment,
  useEffect,
  Key,
  useState,
  SetStateAction,
  ChangeEvent,
} from "react";
import { Helmet } from "react-helmet";
import { Button, HeaderCenter, Main, Section } from "../../styles/main";
import { Content } from "../../styles/admin";
import SideNav from "../../components/SideNav";
import { Field, Input, Select, Textarea } from "../../styles/form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GetSingleProduct } from "../../features/ProductFeatures";
import LoadingBox from "../../components/LoadingBox";
import ErrorBox from "../../components/ErrorBox";

const UpdatePage = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state: any) => state.category);
  const { slug } = useParams();
  const { error, loading, product } = useSelector(
    (state: any) => state.product
  );
  useEffect(() => {
    dispatch(GetSingleProduct(slug));
  }, [dispatch, slug]);
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [brand, setBrand] = useState(product.brand);
  const [price, setPrice] = useState<number | null>(product.price);
  const [discount, setDiscount] = useState<number | null>(product.discount);
  const [countInStock, setCountInStock] = useState<number | null>(
    product.countInStock
  );
  const [category, setCategory] = useState(product.category);
  const [images, setImages] = useState<File[]>([product.image]);
  // Change price
  const onPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = !Number.isNaN(e.target.valueAsNumber)
      ? e.target.valueAsNumber
      : null;
    setPrice(value);
  };
  // Change discount
  const onDiscountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = !Number.isNaN(e.target.valueAsNumber)
      ? e.target.valueAsNumber
      : null;
    setDiscount(value);
  };
  // Change count in stock
  const onCountInStockChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = !Number.isNaN(e.target.valueAsNumber)
      ? e.target.valueAsNumber
      : null;
    setCountInStock(value);
  };
  // Handle images
  const onImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    const files = target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        images.push(files[i]);
      }
    }
  };
  return (
    <Fragment>
      <Helmet>
        <title>update product</title>
      </Helmet>
      <Main>
        <SideNav />
        <Content>
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <ErrorBox message={error.message} />
          ) : (
            product && (
              <Section>
                <HeaderCenter>update product</HeaderCenter>
                <form
                  method="POST"
                  className="product-form"
                  encType="multipart/form-data"
                  acceptCharset="*/images"
                >
                  <Field>
                    <Input
                      type="text"
                      id="name"
                      defaultValue={product.name}
                      onChange={(e: {
                        target: { value: SetStateAction<string> };
                      }) => setName(e.target.value)}
                    />
                    <label htmlFor="name">name</label>
                  </Field>
                  <Field>
                    <Textarea
                      id="description"
                      defaultValue={product.description}
                      onChange={(e: {
                        target: { value: SetStateAction<string> };
                      }) => setDescription(e.target.value)}
                    ></Textarea>
                    <label htmlFor="description">description</label>
                  </Field>
                  <Field>
                    <Input
                      type="text"
                      id="brand"
                      defaultValue={product.brand}
                      onChange={(e: {
                        target: { value: SetStateAction<string> };
                      }) => setBrand(e.target.value)}
                    />
                    <label htmlFor="brand">brand</label>
                  </Field>
                  <Field>
                    <Input
                      type="number"
                      min="0"
                      id="price"
                      defaultValue={product.price}
                      onChange={onPriceChange}
                    />
                    <label htmlFor="price">price</label>
                  </Field>
                  <Field>
                    <Input
                      type="number"
                      min="0"
                      id="discount"
                      defaultValue={product.discount}
                      onChange={onDiscountChange}
                    />
                    <label htmlFor="discount">discount</label>
                  </Field>
                  <Field>
                    <Input
                      type="number"
                      min="0"
                      id="countinstock"
                      defaultValue={product.countInStock}
                      onChange={onCountInStockChange}
                    />
                    <label htmlFor="countinstock">count in stock</label>
                  </Field>
                  <Field>
                    <Select
                      name="category"
                      id="category"
                      onChange={(e: {
                        target: { value: SetStateAction<string> };
                      }) => setCategory(e.target.value)}
                    >
                      {categories.map(
                        (category: { _id: Key; title: string }) => (
                          <option
                            key={category._id}
                            value={`${category._id}`}
                            selected={category._id === product.category}
                          >
                            {category.title}
                          </option>
                        )
                      )}
                    </Select>
                    <label htmlFor="category">category</label>
                  </Field>
                  <Field>
                    <Input
                      onChange={onImagesChange}
                      type="file"
                      id="images"
                      name="images"
                      accept="image/*"
                      multiple
                    />
                    <label htmlFor="images">images</label>
                  </Field>
                  <Button type="submit">submit</Button>
                </form>
              </Section>
            )
          )}
        </Content>
      </Main>
    </Fragment>
  );
};

export default UpdatePage;
