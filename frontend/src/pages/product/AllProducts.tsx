import { Fragment, Key, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Container, Grid, Main, Section } from "../../styles/main";
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
              <Grid>
                {products &&
                  products.length > 0 &&
                  products.map(
                    (product: {
                      _id: Key;
                      name: string;
                      slug: string;
                      images: string[];
                      price: number;
                      discount: number;
                    }) => (
                      <Product
                        key={product._id}
                        _id={product._id}
                        name={product.name}
                        slug={product.slug}
                        image={product.images[0]}
                        price={product.price}
                        discount={product.discount}
                      />
                    )
                  )}
              </Grid>
            )}
          </Section>
        </Container>
      </Main>
    </Fragment>
  );
};

export default AllProducts;
