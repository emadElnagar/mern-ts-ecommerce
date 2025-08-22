import { Fragment, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Container, Header, Section } from "../../styles/main";
import {
  TableWrapper,
  StyledTable,
  TableHead,
  TableRow,
  TableHeader,
  TableData,
  ProductImage,
  QuantityInput,
  RemoveButton,
  CheckoutButton,
} from "../../styles/cart";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  deleteFromCart,
  getCart,
} from "../../features/CartFeatures";
import LoadingBox from "../../components/LoadingBox";
import ErrorBox from "../../components/ErrorBox";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);
  const { cart, error, isLoading } = useSelector((state: any) => state.cart);
  const { user } = useSelector((state: any) => state.user);
  // Get total price
  const totalPrice = cart.reduce((acc: number, product: any) => {
    const quantity = product.quantity || 1;
    const discount = product.discount || 0;
    const price = product.price || 0;
    return acc + (price - discount) * quantity;
  }, 0);
  // Remove product from cart
  const removeProduct = (id: string) => {
    dispatch(deleteFromCart(id));
  };
  // clear cart
  const clearTheCart = () => {
    dispatch(clearCart());
  };
  return (
    <Fragment>
      <Helmet>
        <title>Electronics-cart</title>
      </Helmet>
      <Container>
        <Section>
          {isLoading ? (
            <LoadingBox />
          ) : cart.length === 0 ? (
            <Header className="text-center">Your cart is empty</Header>
          ) : error ? (
            <ErrorBox message={error} />
          ) : (
            <>
              <TableWrapper>
                <StyledTable>
                  <TableHead>
                    <TableRow>
                      <TableHeader>Product</TableHeader>
                      <TableHeader>Price</TableHeader>
                      <TableHeader>Quantity</TableHeader>
                      <TableHeader>Total</TableHeader>
                      <TableHeader>Actions</TableHeader>
                    </TableRow>
                  </TableHead>
                  <tbody>
                    {cart.map((product: any) => {
                      const quantity = product.quantity || 1;
                      const discount = product.discount || 0;
                      const price = product.price || 0;
                      return (
                        <TableRow key={product._id}>
                          <TableData>
                            <Link to={`/products/${product.slug}`}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                {product && product.images && (
                                  <ProductImage
                                    src={`http://localhost:5000/${product.images[0]}`}
                                    alt="There is a problem showing your photos"
                                  />
                                )}
                                {product.name}
                              </div>
                            </Link>
                          </TableData>
                          <TableData>${price - discount}</TableData>
                          <TableData>
                            <QuantityInput
                              type="number"
                              value={quantity}
                              readOnly
                            />
                          </TableData>
                          <TableData>
                            ${(price - discount) * quantity}
                          </TableData>
                          <TableData>
                            <RemoveButton
                              onClick={() => removeProduct(product._id)}
                            >
                              Remove
                            </RemoveButton>
                          </TableData>
                        </TableRow>
                      );
                    })}
                    <TableRow>
                      <TableData colSpan={3}>
                        <strong>Total:</strong>
                      </TableData>
                      <TableData>
                        <strong>${totalPrice}</strong>
                      </TableData>
                      <TableData>
                        <RemoveButton onClick={() => clearTheCart()}>
                          Clear Cart
                        </RemoveButton>
                      </TableData>
                    </TableRow>
                  </tbody>
                </StyledTable>
              </TableWrapper>
              <CheckoutButton
                onClick={() =>
                  navigate(
                    `${user ? "/checkout" : "/users/login?next=/checkout"}`
                  )
                }
              >
                procced to checkout
              </CheckoutButton>
            </>
          )}
        </Section>
      </Container>
    </Fragment>
  );
};

export default Cart;
