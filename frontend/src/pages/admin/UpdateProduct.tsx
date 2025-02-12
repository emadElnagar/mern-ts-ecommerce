import { Fragment, useEffect, Key } from "react";
import { Helmet } from "react-helmet";
import { Button, HeaderCenter, Main, Section } from "../../styles/main";
import { Content } from "../../styles/admin";
import SideNav from "../../components/SideNav";
import { Field, Input, Select, Textarea } from "../../styles/form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GetSingleProduct } from "../../features/ProductFeatures";

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
  return (
    <Fragment>
      <Helmet>
        <title>update product</title>
      </Helmet>
      <Main>
        <SideNav />
        <Content>
          <Section>
            <HeaderCenter>update product</HeaderCenter>
            <form
              method="POST"
              className="product-form"
              encType="multipart/form-data"
              acceptCharset="*/images"
            >
              <Field>
                <Input type="text" id="name" />
                <label htmlFor="name">name</label>
              </Field>
              <Field>
                <Textarea id="description"></Textarea>
                <label htmlFor="description">description</label>
              </Field>
              <Field>
                <Input type="text" id="brand" />
                <label htmlFor="brand">brand</label>
              </Field>
              <Field>
                <Input type="number" min="0" id="price" />
                <label htmlFor="price">price</label>
              </Field>
              <Field>
                <Input type="number" min="0" id="discount" />
                <label htmlFor="discount">discount</label>
              </Field>
              <Field>
                <Input type="number" min="0" id="countinstock" />
                <label htmlFor="countinstock">count in stock</label>
              </Field>
              <Field>
                <Select name="category" id="category">
                  {categories.map((category: { _id: Key; title: string }) => (
                    <option key={category._id} value={`${category._id}`}>
                      {category.title}
                    </option>
                  ))}
                </Select>
                <label htmlFor="category">category</label>
              </Field>
              <Field>
                <Input
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
        </Content>
      </Main>
    </Fragment>
  );
};

export default UpdatePage;
