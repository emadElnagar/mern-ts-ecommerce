import { Fragment, Key } from "react";
import { Helmet } from "react-helmet";
import { HeaderCenter, Main, Section } from "../../styles/main";
import SideNav from "../../components/SideNav";
import { Content } from "../../styles/admin";
import { Field, Input, Select, Textarea } from "../../styles/form";
import { useSelector } from "react-redux";

const NewProduct = () => {
  const { categories } = useSelector((state: any) => state.category);
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
            <form className="product-form">
              <Field>
                <Input type="text" id="title" />
                <label htmlFor="title">title</label>
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
                <Input type="number" id="price" />
                <label htmlFor="price">price</label>
              </Field>
              <Field>
                <Input type="number" id="discount" />
                <label htmlFor="discount">discount</label>
              </Field>
              <Field>
                <Input type="number" id="countinstock" />
                <label htmlFor="countinstock">count in stock</label>
              </Field>
              <Field>
                <Select name="category" id="category">
                  {
                    categories.map((category: { _id: Key; title: string }) => (
                      <option key={ category._id } value={`${ category.title }`}>{ category.title }</option>
                    ))
                  }
                </Select>
                <label htmlFor="category">category</label>
              </Field>
              <Field>
                <Input type="file" id="images" accept="image/*" />
                <label htmlFor="images">images</label>
              </Field>
            </form>
          </Section>
        </Content>
      </Main>
    </Fragment>
  )
}

export default NewProduct;
