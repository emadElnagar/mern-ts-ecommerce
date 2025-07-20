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

const Cart = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);
  const cart = useSelector((state: any) => state.cart);
  console.log(cart);
  return (
    <Fragment>
      <Helmet>
        <title>Electronics-cart</title>
      </Helmet>
      <Section>
        <Container>
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
                <TableRow>
                  <TableData>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <ProductImage
                        src="https://placehold.co/50x50"
                        alt="Product"
                      />
                      Wireless Mouse
                    </div>
                  </TableData>
                  <TableData>$25.99</TableData>
                  <TableData>
                    <QuantityInput type="number" value="2" readOnly />
                  </TableData>
                  <TableData>$51.98</TableData>
                  <TableData>
                    <RemoveButton>Remove</RemoveButton>
                  </TableData>
                </TableRow>

                <TableRow>
                  <TableData>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <ProductImage
                        src="https://placehold.co/50x50"
                        alt="Product"
                      />
                      Bluetooth Headphones
                    </div>
                  </TableData>
                  <TableData>$89.99</TableData>
                  <TableData>
                    <QuantityInput type="number" value="1" readOnly />
                  </TableData>
                  <TableData>$89.99</TableData>
                  <TableData>
                    <RemoveButton>Remove</RemoveButton>
                  </TableData>
                </TableRow>
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
        </Container>
      </Section>
    </Fragment>
  );
};

export default Cart;
