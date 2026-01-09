import { ChangeEvent, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { GetProfile, changeUserImage } from "../../features/UserFeatures";
import { Helmet } from "react-helmet";
import {
  Button,
  CardHeader,
  Container,
  Image,
  ImageWrapper,
  ImgContainer,
  OrderCard,
  OrderDate,
  OrderId,
  OrderInfo,
  ProductImages,
  ProductSection,
  Section,
  UserForm,
  MoreBadge,
  Status,
  ProductDetails,
  ProductName,
  MoreItems,
  Divider,
  Summary,
  SummaryItem,
  Value,
  Actions,
  SecondaryButton,
  PrimaryButton,
  OrdersList,
  CancelButton,
  SectionHeading,
} from "../../styles/main";
import { FileInput, Label } from "../../styles/form";
import { FaCamera } from "react-icons/fa";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import ErrorBox from "../../components/ErrorBox";
import LoadingBox from "../../components/LoadingBox";
import { API_URL } from "../../API";
import { CancelOrder, GetUserOrders } from "../../features/OrderFeatures";
import DeliveryInfo from "../../components/DeliveryInfo";
import Swal from "sweetalert2";

const ProfilePage = () => {
  const [userImg, setUserImg] = useState<File | undefined>();
  const { id } = useParams();
  const { user, profile, isLoading, error } = useSelector(
    (state: any) => state.user
  );
  const { userOrders } = useSelector((state: any) => state.order);
  const dispatch = useDispatch();
  // Get profile data
  useEffect(() => {
    dispatch(GetProfile(id));
    dispatch(GetUserOrders(id));
  }, [dispatch, id]);
  // Handel image upload
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    setUserImg(target.files[0]);
  };
  // Change user image
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (typeof userImg === "undefined") return;
    const formData = new FormData();
    formData.append("usrimg", userImg);
    dispatch(
      changeUserImage({
        _id: user._id,
        formData,
      })
    );
    setUserImg(undefined);
    dispatch(GetProfile(id));
  };
  // Close form
  const close = () => {
    setUserImg(undefined);
  };
  // Order colors
  const statusColors = {
    Pending: "#f1c40f",
    Processing: "#e67e22",
    "Out for Delivery": "#3498db",
    Delivered: "#2ecc71",
    Cancelled: "#e74c3c",
  };

  // Handle order cancellation
  const handleCancelOrder = (orderId: any) => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error,
      });
      return;
    }
    dispatch(CancelOrder(orderId));
  };
  return (
    <Fragment>
      <Helmet>
        <title>Voltaro-profile</title>
      </Helmet>
      {isLoading ? (
        <LoadingBox />
      ) : error ? (
        <ErrorBox message={error} />
      ) : (
        <Container>
          <Section>
            <ImgContainer>
              <Image
                src={
                  userImg
                    ? URL.createObjectURL(userImg)
                    : profile?.image
                    ? `${API_URL}/${profile.image}`
                    : "/user-icon-2098873_640.png"
                }
              />
              {user && user._id === profile?._id && (
                <UserForm onSubmit={handleSubmit}>
                  {userImg ? (
                    <div>
                      <Button type="submit">
                        <IoMdCheckmark />
                      </Button>
                      <Button onClick={close}>
                        <IoMdClose />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <FileInput
                        type="file"
                        id="img"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                      <Label htmlFor="img">
                        <FaCamera className="icon" />
                      </Label>
                    </>
                  )}
                </UserForm>
              )}
            </ImgContainer>
            <SectionHeading>
              {profile?.firstName} {profile?.lastName}
            </SectionHeading>
          </Section>

          {userOrders && userOrders.length > 0 && (
            <Section>
              <SectionHeading>
                {profile?.firstName} {profile?.lastName} orders
              </SectionHeading>
              <OrdersList>
                {userOrders.map((order: any) => (
                  <OrderCard key={order._id}>
                    <CardHeader>
                      <OrderInfo>
                        <OrderId>ORDER: {order.orderNumber}</OrderId>
                        <OrderDate>
                          Placed on:{" "}
                          {new Date(order.createdAt).toLocaleDateString()}
                        </OrderDate>
                      </OrderInfo>
                      <Status
                        style={{
                          backgroundColor:
                            statusColors[
                              order.shippingStatus as keyof typeof statusColors
                            ] || statusColors.Delivered,
                        }}
                      >
                        {order.shippingStatus}
                      </Status>
                    </CardHeader>

                    {/* Product Preview */}
                    <ProductSection>
                      <ProductImages>
                        <ImageWrapper>
                          <Image
                            src={
                              order.orderItems?.[0]?.product?.images?.[0] &&
                              `${API_URL}/${order.orderItems[0].product.images[0]}`
                            }
                            alt="product"
                          />
                          {order.orderItems.length > 1 && (
                            <MoreBadge>
                              +{order.orderItems.length - 1}
                            </MoreBadge>
                          )}
                        </ImageWrapper>
                      </ProductImages>

                      <ProductDetails>
                        <ProductName>
                          {order.orderItems?.[0]?.product?.name}
                        </ProductName>
                        {order.orderItems.length > 1 && (
                          <MoreItems>
                            and {order.orderItems.length - 1} more items
                          </MoreItems>
                        )}
                      </ProductDetails>
                    </ProductSection>

                    <Divider />

                    {/* Summary */}
                    <Summary>
                      <SummaryItem>
                        <Label>Items</Label>
                        <Value>{order.orderItems.length}</Value>
                      </SummaryItem>

                      <SummaryItem>
                        <Label>Total</Label>
                        <Value>${order.totalPrice}</Value>
                      </SummaryItem>

                      <SummaryItem>
                        <Label>Payment</Label>
                        <Value>{order.paymentResult?.method}</Value>
                      </SummaryItem>
                    </Summary>

                    <Divider />

                    {/* Delivery */}
                    <DeliveryInfo order={order} />

                    {/* Actions */}
                    <Actions>
                      {(user &&
                        user._id === order.customer &&
                        order.shippingStatus === "Pending") ||
                        (user &&
                          user._id === order.customer &&
                          order.shippingStatus === "Processing" && (
                            <CancelButton
                              onClick={() => handleCancelOrder(order._id)}
                            >
                              Cancel Order
                            </CancelButton>
                          ))}
                      <SecondaryButton>Track Order</SecondaryButton>
                      <PrimaryButton>
                        <Link to={`/orders/details/${order._id}`}>
                          View Details
                        </Link>
                      </PrimaryButton>
                    </Actions>
                  </OrderCard>
                ))}
              </OrdersList>
            </Section>
          )}
        </Container>
      )}
    </Fragment>
  );
};

export default ProfilePage;
