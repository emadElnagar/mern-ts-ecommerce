import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect } from "react";
import { Helmet } from "react-helmet";
import { SearchProducts } from "../../features/ProductFeatures";
import { Container, Grid, Main, Section } from "../../styles/main";
import LoadingBox from "../../components/LoadingBox";
import ErrorBox from "../../components/ErrorBox";
import Product from "../../components/product";

const SearchProductsPage = () => {
  const { keyword } = useParams<{ keyword: string }>();
  const dispatch = useDispatch();
  const { searchedProducts, isLoading, error } = useSelector(
    (state: any) => state.product
  );
  useEffect(() => {
    dispatch(SearchProducts(keyword));
  }, [dispatch, keyword]);
  return (
    <Fragment>
      <Helmet>
        <title>electronics-search</title>
      </Helmet>
      <Main>
        <Container>
          {isLoading ? (
            <LoadingBox />
          ) : error ? (
            <ErrorBox message={error.message} />
          ) : searchedProducts &&
            searchedProducts.products &&
            searchedProducts.products.length > 0 ? (
            <Section>
              <Grid>
                {searchedProducts.products.map(
                  (product: {
                    _id: string;
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
            </Section>
          ) : (
            <h1>No products found</h1>
          )}
        </Container>
      </Main>
    </Fragment>
  );
};

export default SearchProductsPage;
