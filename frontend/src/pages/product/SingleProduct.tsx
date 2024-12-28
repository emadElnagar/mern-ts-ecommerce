import { Fragment, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Container, Image, Main } from "../../styles/main";
import { useDispatch, useSelector } from "react-redux";
import { GetSingleProduct } from "../../features/ProductFeatures";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
  const dispatch = useDispatch();
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
