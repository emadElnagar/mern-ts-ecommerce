import { Fragment, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Button, Container, Header, Section } from "../../styles/main";
import {
  TableData,
  TableHead,
  TableHeader,
  TableRow,
  TableWrapper,
  ImageContainer,
  DeleteButton,
  StyledTable,
} from "../../styles/cart";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../../components/LoadingBox";
import ErrorBox from "../../components/ErrorBox";
import {
  addToCart,
  getWithlist,
  removeFromWishlist,
} from "../../features/CartFeatures";
import { Link } from "react-router-dom";
import { API_URL } from "../../API";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const { isLoading, error, wishlist } = useSelector(
    (state: any) => state.cart
  );
  useEffect(() => {
    dispatch(getWithlist());
  }, [dispatch]);
  // Add to cart
  const handleAddToCart = (id: string) => {
    dispatch(addToCart({ _id: id, quantity: 1 }));
  };
  // Remove from wishlist
  const handleRemoveFromWishlist = (id: string) => {
    dispatch(removeFromWishlist(id));
  };
  return (
    <Fragment>
      <Helmet>
        <title>Voltaro-wishlist</title>
      </Helmet>
      <Container>
        <Section>
          {isLoading ? (
            <LoadingBox />
          ) : wishlist && wishlist.length === 0 ? (
            <Header className="text-center">Your wishlist is empty</Header>
          ) : error ? (
            <ErrorBox message={error} />
          ) : (
            <TableWrapper>
              <StyledTable>
                <TableHead>
                  <TableRow>
                    <TableHeader colSpan={2}>Product</TableHeader>
                    <TableHeader>Price</TableHeader>
                    <TableHeader>Stock Status</TableHeader>
                    <TableHeader>cart</TableHeader>
                  </TableRow>
                </TableHead>
                <tbody>
                  {wishlist &&
                    wishlist.map((product: any) => (
                      <TableRow key={product._id}>
                        <TableData>
                          <DeleteButton
                            onClick={() =>
                              handleRemoveFromWishlist(product._id)
                            }
                          >
                            x
                          </DeleteButton>
                        </TableData>
                        <TableData>
                          <Link to={`/products/${product.slug}`}>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <ImageContainer style={{ marginRight: "10px" }}>
                                {product &&
                                  product.images &&
                                  product.images.length > 0 && (
                                    <img
                                      src={`${API_URL}/${product.images[0]}`}
                                      alt="There is a problem showing your photos"
                                    />
                                  )}
                              </ImageContainer>
                              {product.name}
                            </div>
                          </Link>
                        </TableData>
                        <TableData>
                          $
                          {product.discount
                            ? product.price - product.discount
                            : product.price}
                        </TableData>
                        <TableData>
                          {product.countInStock >= 1 ? "in stock" : "invalid"}
                        </TableData>
                        <TableData>
                          <Button onClick={() => handleAddToCart(product._id)}>
                            Add to cart
                          </Button>
                        </TableData>
                      </TableRow>
                    ))}
                </tbody>
              </StyledTable>
            </TableWrapper>
          )}
        </Section>
      </Container>
    </Fragment>
  );
};

export default WishlistPage;
