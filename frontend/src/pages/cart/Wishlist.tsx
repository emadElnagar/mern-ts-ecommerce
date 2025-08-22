import { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Button, Container } from "../../styles/main";
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

const WishlistPage = () => {
  return (
    <Fragment>
      <Helmet>
        <title>wishlist</title>
      </Helmet>
      <Container>
        <TableWrapper>
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableHeader colSpan={3}>Product</TableHeader>
                <TableHeader>Price</TableHeader>
                <TableHeader>Stock Status</TableHeader>
                <TableHeader>cart</TableHeader>
              </TableRow>
            </TableHead>
            <tbody>
              <TableRow>
                <TableData>
                  <DeleteButton>x</DeleteButton>
                </TableData>
                <TableData>
                  <ImageContainer>
                    <img
                      src="https://placehold.co/50"
                      alt="There is a problem showing your photos"
                    />
                  </ImageContainer>
                </TableData>
                <TableData>Product name</TableData>
                <TableData>$130.00</TableData>
                <TableData>In stock</TableData>
                <TableData>
                  <Button>Add to cart</Button>
                </TableData>
              </TableRow>
            </tbody>
          </StyledTable>
        </TableWrapper>
      </Container>
    </Fragment>
  );
};

export default WishlistPage;
