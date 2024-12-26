import { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Container, Main } from "../../styles/main";
import { useSelector } from "react-redux";

const SingleProduct = () => {
  const { error, loading, product } = useSelector(
    (state: any) => state.product
  );
  return (
    <Fragment>
      <Helmet>
        <title>Electronics-product</title>
      </Helmet>
      <Main>
        <Container>
          <h1>single product page</h1>
        </Container>
      </Main>
    </Fragment>
  );
};

export default SingleProduct;
