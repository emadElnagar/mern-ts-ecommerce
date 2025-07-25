import { Fragment, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Container, Section } from "../../styles/main";
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
} from "../../styles/cart";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../features/CartFeatures";
import LoadingBox from "../../components/LoadingBox";
import ErrorBox from "../../components/ErrorBox";

const Cart = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);
  const { cart, error, isLoading } = useSelector((state: any) => state.cart);
  console.log(cart);
  return (
    <Fragment>
      <Helmet>
        <title>Electronics-cart</title>
      </Helmet>
      <Container>
        <Section>
          {isLoading ? (
            <LoadingBox />
          ) : error ? (
            <ErrorBox message={error} />
          ) : cart.length === 0 ? (
            <ErrorBox message="Your cart is empty" />
          ) : (
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
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <ProductImage
                              src={`http://localhost:5000/${product.images[0]}`}
                              alt="There is a problem showing your photos"
                            />
                            {product.name}
                          </div>
                        </TableData>
                        <TableData>${price - discount}</TableData>
                        <TableData>
                          <QuantityInput
                            type="number"
                            value={quantity}
                            readOnly
                          />
                        </TableData>
                        <TableData>${(price - discount) * quantity}</TableData>
                        <TableData>
                          <RemoveButton>Remove</RemoveButton>
                        </TableData>
                      </TableRow>
                    );
                  })}
                  <TableRow>
                    <TableData colSpan={3}>
                      <strong>Total:</strong>
                    </TableData>
                    <TableData>
                      <strong>$141.97</strong>
                    </TableData>
                    <TableData>
                      <RemoveButton>Clear Cart</RemoveButton>
                    </TableData>
                  </TableRow>
                </tbody>
              </StyledTable>
            </TableWrapper>
          )}
        </Section>
      </Container>
    </Fragment>
  );
};

export default Cart;
