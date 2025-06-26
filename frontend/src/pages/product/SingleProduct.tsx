import { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Container, Image, Main, Section, Tab, Tabs } from "../../styles/main";
import { useDispatch, useSelector } from "react-redux";
import { GetSingleProduct } from "../../features/ProductFeatures";
import { useParams } from "react-router-dom";
import LoadingBox from "../../components/LoadingBox";
import ErrorBox from "../../components/ErrorBox";
import RelatedProducts from "../../components/RelatedProducts";
import { FinalPrice, OldPrice, Price } from "../../styles/product";
import Review from "../../components/ReviewProduct";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const [imgIndex, setImgIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const { slug } = useParams();
  const { error, isLoading, product } = useSelector(
    (state: any) => state.product
  );
  // Get single product
  useEffect(() => {
    dispatch(GetSingleProduct(slug));
  }, [dispatch, slug]);
  // Get similar products
  const finalprice = product && product.price - product.discount;
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
              <>
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
                      <div>
                        {product.discount && product.discount > 0 ? (
                          <Price>
                            <FinalPrice>${finalprice}</FinalPrice>
                            <OldPrice>
                              <del>${product.price}</del>
                            </OldPrice>
                          </Price>
                        ) : (
                          <Price>
                            <FinalPrice>${product.price}</FinalPrice>
                          </Price>
                        )}
                      </div>
                      {product.features && product.features.length > 0 && (
                        <div className="features">
                          <h3>Product Highlights:</h3>
                          <ul>
                            {product.features.map(
                              (feature: string, index: number) => (
                                <li className="listed-item" key={index}>
                                  {feature}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </Section>
                <Section>
                  <Tabs>
                    <Tab
                      className={`${
                        activeTab === "description" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("description")}
                    >
                      Description
                    </Tab>
                    <Tab
                      className={`${activeTab === "reviews" ? "active" : ""}`}
                      onClick={() => setActiveTab("reviews")}
                    >
                      Reviews
                    </Tab>
                  </Tabs>
                  {activeTab === "description" ? (
                    <div className="description">
                      <p>{product.description}</p>
                    </div>
                  ) : (
                    <div className="reviews">
                      <Review slug={slug ?? ""} />
                    </div>
                  )}
                </Section>
              </>
            )
          )}
          {product && <RelatedProducts slug={product.slug} />}
        </Container>
      </Main>
    </Fragment>
  );
};

export default SingleProduct;
