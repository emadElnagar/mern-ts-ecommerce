import { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Container, Image, Main } from "../../styles/main";
import { useDispatch, useSelector } from "react-redux";
import { GetSingleProduct } from "../../features/ProductFeatures";
import { useParams } from "react-router-dom";
import LoadingBox from "../../components/LoadingBox";
import ErrorBox from "../../components/ErrorBox";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const [imgIndex, setImgIndex] = useState(0);
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
                      src={`http://localhost:5000/${product.images[imgIndex]}`}
                      alt="problem loading image"
                    />
                  </div>
                  <div className="images-min">
                    {product.images.map((image: string, index: number) => (
                      <Image
                        src={`http://localhost:5000/${image}`}
                        alt="problem loading images"
                        className="cursor-pointer"
                        onClick={() => setImgIndex(index)}
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
