import { Fragment, Key, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Container, Main, Section } from "../../styles/main";
import { useDispatch, useSelector } from "react-redux";
import { GetAllProducts } from "../../features/ProductFeatures";
import ErrorBox from "../../components/ErrorBox";
import LoadingBox from "../../components/LoadingBox";
import Product from "../../components/product";

const AllProducts = () => {
  const dispatch = useDispatch();
  const { products, error, loading } = useSelector(
    (state: any) => state.product
  );
  useEffect(() => {
    dispatch(GetAllProducts());
  }, [dispatch]);
  return (
    <Fragment>
      <Helmet>
        <title>Electronics-products</title>
      </Helmet>
      <Main>
        <Container>
          <Section>
            {error ? (
              <ErrorBox message="Error getting products" />
            ) : loading ? (
              <LoadingBox />
            ) : (
              products.map((product: { _id: Key }) => (
                <Product key={product._id} />
              ))
            )}
          </Section>
        </Container>
      </Main>
    </Fragment>
  );
};

export default AllProducts;
