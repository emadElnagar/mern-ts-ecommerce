import { Fragment } from "react";
import CategoryForm from "../../components/CategoryForm";
import { Container, Section } from "../../styles/main";
import { Helmet } from "react-helmet";
import CategoryList from "../../components/CategoryList";

const CategoriesPage = () => {
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
            <CategoryList />
          </Section>
        </Container>
      </Fragment>
    )
  }
  
  export default CategoriesPage;
  