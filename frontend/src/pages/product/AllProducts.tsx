import { Fragment, Key, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Button, Container, Grid, Main, Section } from "../../styles/main";
import { useDispatch, useSelector } from "react-redux";
import { GetAllProducts } from "../../features/ProductFeatures";
import ErrorBox from "../../components/ErrorBox";
import LoadingBox from "../../components/LoadingBox";
import Product from "../../components/product";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useSearchParams } from "react-router-dom";

const AllProducts = () => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useSelector((state: any) => state.product);
  const { totalPages } = data;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get("page") || "1");

  const handleChangePage = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    setSearchParams({ page: pageNumber.toString() });
    dispatch(GetAllProducts(pageNumber));
  };

  useEffect(() => {
    dispatch(GetAllProducts({ page: pageFromUrl }));
    setCurrentPage(pageFromUrl);
  }, [pageFromUrl, dispatch]);

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
                {totalPages > 1 && (
                  <div className="pagination-bar">
                    <Button
                      disabled={currentPage === 1}
                      onClick={() => handleChangePage(currentPage - 1)}
                    >
                      <IoIosArrowBack />
                    </Button>
                    {totalPages &&
                      totalPages > 0 &&
                      Array.from(
                        { length: totalPages },
                        (_, index) => index + 1
                      ).map((pageNumber) => (
                        <Button
                          key={pageNumber}
                          className={pageNumber === currentPage ? "active" : ""}
                          onClick={() => handleChangePage(pageNumber)}
                        >
                          {pageNumber}
                        </Button>
                      ))}
                    <Button
                      disabled={currentPage === totalPages}
                      onClick={() => handleChangePage(currentPage + 1)}
                    >
                      <IoIosArrowForward />
                    </Button>
                  </div>
                )}
              </>
            )}
          </Section>
        </Container>
      </Main>
    </Fragment>
  );
};

export default AllProducts;
