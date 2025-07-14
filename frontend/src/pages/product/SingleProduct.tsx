import { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
  FullButtonRounded,
  Container,
  FlexRow,
  Image,
  Main,
  Section,
  Tab,
  Tabs,
  QuantityInput,
  QuantityContainer,
  ButtonRoundedStart,
  ButtonRoundedEnd,
} from "../../styles/main";
import { useDispatch, useSelector } from "react-redux";
import { GetSingleProduct } from "../../features/ProductFeatures";
import { useParams } from "react-router-dom";
import LoadingBox from "../../components/LoadingBox";
import ErrorBox from "../../components/ErrorBox";
import RelatedProducts from "../../components/RelatedProducts";
import { FinalPrice, OldPrice, Price } from "../../styles/product";
import Review from "../../components/ReviewProduct";
import RatingStars from "../../components/RatingStars";
import { FaCartArrowDown } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { addToCart } from "../../features/CartFeatures";
import RatingPercentage from "../../components/RatingPercentage";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const [imgIndex, setImgIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [quantity, setQuantity] = useState(1);
  const { slug } = useParams();
  const { error, isLoading, product } = useSelector(
    (state: any) => state.product
  );
  const productRating =
    product &&
    product.reviews &&
    product.reviews.length > 0 &&
    product.reviews.reduce(
      (sum: any, review: { rating: any }) => sum + review.rating,
      0
    ) / product.reviews.length;
  // Get single product
  useEffect(() => {
    dispatch(GetSingleProduct(slug));
  }, [dispatch, slug]);
  // Product price calculation
  const finalprice = product && product.price - product.discount;
  // decrease quantity
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  // increase quantity
  const handleIncrease = () => {
    if (quantity < product.countInStock) {
      setQuantity(quantity + 1);
    }
  };
  // Add to cart
  const handleAddToCart = () => {
    dispatch(addToCart({ _id: product._id, quantity }));
  };
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
                      <div className="rating">
                        {productRating && (
                          <FlexRow>
                            <RatingStars rating={productRating.toFixed(1)} />
                            <span className="reviews-number">
                              ({product.reviews.length} reviews)
                            </span>
                          </FlexRow>
                        )}
                      </div>
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
                      <div className="product-actions">
                        <FlexRow>
                          <QuantityContainer>
                            <ButtonRoundedStart
                              onClick={() => handleDecrease()}
                            >
                              <AiOutlineMinus />
                            </ButtonRoundedStart>
                            <QuantityInput
                              type="number"
                              id="quantity"
                              name="quantity"
                              min="1"
                              max={product.countInStock}
                              defaultValue="1"
                              value={quantity}
                            />
                            <ButtonRoundedEnd onClick={() => handleIncrease()}>
                              <AiOutlinePlus />
                            </ButtonRoundedEnd>
                          </QuantityContainer>
                          <FullButtonRounded onClick={() => handleAddToCart()}>
                            Add to Cart <FaCartArrowDown />
                          </FullButtonRounded>
                        </FlexRow>
                        <FullButtonRounded
                          style={{
                            marginTop: "10px",
                            backgroundColor: "#e67514",
                          }}
                        >
                          Buy Now
                        </FullButtonRounded>
                      </div>
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
                    <>
                      <div className="rating-percentage">
                        <RatingPercentage reviews={product.reviews} />
                      </div>
                      <div className="reviews-container">
                        <div className="reviews-created">
                          {product &&
                            product.reviews &&
                            product.reviews.length > 0 && (
                              <h3>
                                ({product.reviews.length}){" "}
                                {product.reviews.length === 1
                                  ? "review"
                                  : "reviews"}{" "}
                                for {product.name}
                              </h3>
                            )}
                          {product &&
                            product.reviews &&
                            product.reviews.length > 0 && (
                              <div className="reviews">
                                {product.reviews.map(
                                  (review: any, index: number) => (
                                    <div className="review" key={index}>
                                      <div className="review-user">
                                        <img
                                          src={`${
                                            review.user.image
                                              ? `http://localhost:5000/${review.user.image}`
                                              : `${
                                                  process.env.PUBLIC_URL +
                                                  "/user-icon-2098873_640.png"
                                                }`
                                          }`}
                                          alt="user"
                                        />
                                        <span className="user-name">
                                          {review.user.firstName}{" "}
                                          {review.user.lastName}
                                        </span>
                                        <span className="review-date">
                                          {new Date(
                                            review.createdAt
                                          ).toLocaleDateString()}
                                        </span>
                                      </div>
                                      <div className="review-content">
                                        <p>
                                          <RatingStars rating={review.rating} />
                                        </p>
                                        <p>{review.comment}</p>
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            )}
                        </div>
                        <Review slug={slug ?? ""} />
                      </div>
                    </>
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
