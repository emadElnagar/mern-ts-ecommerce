import { Fragment } from "react";
import { useEffect } from "react";
import CategoryForm from "../../components/CategoryForm";
import { Container, DeleteButton, Section, Slide, UpdateButton } from "../../styles/main";
import { Helmet } from "react-helmet";
import CategoryList from "../../components/CategoryList";
import { useDispatch, useSelector } from "react-redux";
import { GetAllCategories } from "../../features/CategoryFeatures";

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state: any) => state.category);
  useEffect(() => {
    dispatch(GetAllCategories());
  }, [dispatch]);
  return (
    <Fragment>
      <Helmet>
        <title>Electronics-admin</title>
      </Helmet>
      <Container>
        <Section>
          <CategoryForm />
        </Section>
        <Section>
          <h1 className="text-center">categories list</h1>
          {
            categories.map((category: { _id: React.Key, title: string }) => (
              <CategoryList key={ category._id } title={ category.title } />
            ))
          }
        </Section>
      </Container>
    </Fragment>
  )
  }
  
  export default CategoriesPage;
  