import { Fragment, Key, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Button, Container, Grid, Main, Section } from "../../styles/main";
import { useDispatch, useSelector } from "react-redux";
import { GetAllProducts } from "../../features/ProductFeatures";
import ErrorBox from "../../components/ErrorBox";
import LoadingBox from "../../components/LoadingBox";
import Product from "../../components/product";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const AllProducts = () => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useSelector((state: any) => state.product);
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
            ) : isLoading ? (
              <LoadingBox />
            ) : (
              <>
                <Grid>
                  {data.products &&
                    data.products.length > 0 &&
                    data.products.map(
                      (product: {
                        _id: Key;
                        name: string;
                        slug: string;
                        images?: string[];
                        price: number;
                        discount: number;
                      }) => (
                        <Product
                          key={product._id}
                          _id={product._id}
                          name={product.name}
                          slug={product.slug}
                          image={product.images?.[0] || "fallback.jpg"}
                          price={product.price}
                          discount={product.discount}
                        />
                      )
                    )}
                </Grid>
                <div className="pagination-bar">
                  <Button>
                    <IoIosArrowBack />
                  </Button>
                  <Button>1</Button>
                  <Button>2</Button>
                  <Button>3</Button>
                  <Button>
                    <IoIosArrowForward />
                  </Button>
                </div>
              </>
            )}
          </Section>
        </Container>
      </Main>
    </Fragment>
  );
};

export default AllProducts;
