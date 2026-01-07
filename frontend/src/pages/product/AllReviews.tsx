import { Fragment, useEffect } from "react";
import { Container, HeaderCenter } from "../../styles/main";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GetSingleProduct } from "../../features/ProductFeatures";
import LoadingBox from "../../components/LoadingBox";
import ErrorBox from "../../components/ErrorBox";
import ReviewItem from "../../components/ProductReview";
import { Helmet } from "react-helmet";

const AllReviews = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { product, error, isLoading } = useSelector(
    (state: any) => state.product
  );
  useEffect(() => {
    dispatch(GetSingleProduct(slug));
  }, [dispatch, slug]);
  return (
    <Fragment>
      <Helmet>
        <title>Voltaro - All reviews</title>
      </Helmet>
      <Container>
        {isLoading ? (
          <LoadingBox />
        ) : error ? (
          <ErrorBox message={error} />
        ) : product && product.reviews && product.reviews.length > 0 ? (
          <>
            <HeaderCenter>
              ({product.reviews.length}) Reviews for {product.name}
            </HeaderCenter>
            {product.reviews.map((review: any, index: number) => (
              <ReviewItem {...review} index={index} key={index} />
            ))}
          </>
        ) : (
          <ErrorBox message="No reviews for this product yet." />
        )}
      </Container>
    </Fragment>
  );
};

export default AllReviews;
