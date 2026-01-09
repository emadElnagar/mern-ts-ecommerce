import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ErrorBox from "../../components/ErrorBox";
import { Fragment, Key, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  Container,
  Image,
  InfoRow,
  Label,
  Section,
  Value,
} from "../../styles/main";
import LoadingBox from "../../components/LoadingBox";
import { GetOrder } from "../../features/OrderFeatures";
import {
  Card,
  SectionTitle,
  Item,
  ItemInfo,
  ItemPrice,
} from "../../styles/main";
import { API_URL } from "../../API";

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { order, isLoading, error } = useSelector((state: any) => state.order);
  useEffect(() => {
    dispatch(GetOrder(id));
  }, [dispatch, id]);
  return (
    <Fragment>
      <Helmet>
        <title>Voltaro order details</title>
      </Helmet>
      <Container>
        <Section>
          {isLoading ? (
            <LoadingBox />
          ) : error ? (
            <ErrorBox message={error.message} />
          ) : (
            order && (
              <>
                <Card>
                  <SectionTitle>Order Summary</SectionTitle>
                  <InfoRow>
                    <div>
                      <Label>Items</Label>
                      <Value>{order.orderItems.length}</Value>
                    </div>
                    <div>
                      <Label>status</Label>
                      <Value>{order.shippingStatus}</Value>
                    </div>
                    <div>
                      <Label>Total Price</Label>
                      <Value>${order.totalPrice}</Value>
                    </div>
                    <div>
                      <Label>Payment Method</Label>
                      <Value>{order.paymentResult?.method || "N/A"}</Value>
                    </div>
                    <div>
                      <Label>Address</Label>
                      <Value>
                        {order.shippingAddress.country},{" "}
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.address}
                      </Value>
                    </div>
                    <div>
                      <Label>Placed on</Label>
                      <Value>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </Value>
                    </div>
                    <div>
                      <Label>Delivered on</Label>
                      <Value>
                        {order.deliveredAt
                          ? new Date(order.deliveredAt).toLocaleDateString()
                          : "Not delivered yet"}
                      </Value>
                    </div>
                  </InfoRow>
                </Card>
                <Card>
                  <SectionTitle>Order Items</SectionTitle>
                  {order.orderItems.map(
                    (item: {
                      product: { _id: Key; images: string[]; name: string };
                      quantity: number;
                      price: number;
                    }) => (
                      <Item key={item.product._id}>
                        <Image
                          src={`${API_URL}/${item.product.images[0]}`}
                          alt={String(item.product.name)}
                        />
                        <ItemInfo>
                          <strong>{item.product.name}</strong>
                          <span>Quantity: {item.quantity}</span>
                        </ItemInfo>
                        <ItemPrice>${item.price}</ItemPrice>
                      </Item>
                    )
                  )}
                </Card>
              </>
            )
          )}
        </Section>
      </Container>
    </Fragment>
  );
};

export default OrderDetails;
