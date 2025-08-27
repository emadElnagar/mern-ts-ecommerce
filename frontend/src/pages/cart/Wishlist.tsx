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
import { getWithlist } from "../../features/CartFeatures";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const { isLoading, error, wishlist } = useSelector(
    (state: any) => state.cart
  );
  useEffect(() => {
    dispatch(getWithlist());
  }, [dispatch]);
  return (
    <Fragment>
      <Helmet>
        <title>wishlist</title>
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
          )}
        </Section>
      </Container>
    </Fragment>
  );
};

export default WishlistPage;
