import { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Container, Image, Main, Section } from "../../styles/main";
import { useDispatch, useSelector } from "react-redux";
import { GetSingleProduct } from "../../features/ProductFeatures";
import { useParams } from "react-router-dom";
import LoadingBox from "../../components/LoadingBox";
import ErrorBox from "../../components/ErrorBox";
import RelatedProducts from "../../components/RelatedProducts";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const [imgIndex, setImgIndex] = useState(0);
  const { slug } = useParams();
  const { error, isLoading, product } = useSelector(
    (state: any) => state.product
  );
  // Get single product
  useEffect(() => {
    dispatch(GetSingleProduct(slug));
  }, [dispatch, slug]);
  // Get similar products
  return (
    <Fragment>
      <Helmet>
        <title>Electronics-product</title>
      </Helmet>
      <Main>
        <Container>
          {isLoading ? (
            <LoadingBox />
          ) : error ? (
            <ErrorBox message={error.message} />
          ) : (
            product && (
              <Section>
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
                          className={`cursor-pointer ${
                            imgIndex === index && "selected"
                          }`}
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
              </Section>
            )
          )}
          {product && <RelatedProducts slug={product.slug} />}
        </Container>
      </Main>
    </Fragment>
  );
};

export default SingleProduct;
