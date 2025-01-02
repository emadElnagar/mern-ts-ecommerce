import { Fragment, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Container, Image, Main } from "../../styles/main";
import { useDispatch, useSelector } from "react-redux";
import { GetSingleProduct } from "../../features/ProductFeatures";
import { useParams } from "react-router-dom";
import LoadingBox from "../../components/LoadingBox";
import ErrorBox from "../../components/ErrorBox";

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
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <ErrorBox message="error loading product" />
          ) : (
            product !== null && (
              <div className="product-summary">
                <div className="images">
                  <div className="thumbnail">
                    <Image
                      src={`http://localhost:5000/${product.images[0]}`}
                      alt="problem loading image"
                    />
                  </div>
                  <div className="images-min">
                    {product.images.map((image: string) => (
                      <Image
                        src={`http://localhost:5000/${image}`}
                        alt="problem loading images"
                      />
                    ))}
                  </div>
                </div>
                <div className="porduct-desc">
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                  <div>
                    <span>{product.price}$</span>
                  </div>
                </div>
              </div>
            )
          )}
        </Container>
      </Main>
    </Fragment>
  );
};

export default SingleProduct;
