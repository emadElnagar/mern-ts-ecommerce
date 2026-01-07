import { ChangeEvent, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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
  Delivery,
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
import { GetUserOrders } from "../../features/OrderFeatures";

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
                        <OrderId>ORDER: #0007</OrderId>
                        <OrderDate>Placed on: 12 Jan 2026</OrderDate>
                      </OrderInfo>
                      <Status>Delivered</Status>
                    </CardHeader>

                    {/* Product Preview */}
                    <ProductSection>
                      <ProductImages>
                        <ImageWrapper>
                          <img src="https://placehold.co/70" alt="product" />
                          <MoreBadge>+2</MoreBadge>
                        </ImageWrapper>
                      </ProductImages>

                      <ProductDetails>
                        <ProductName>iPhone 15 Pro Max</ProductName>
                        <MoreItems>and 2 more items</MoreItems>
                      </ProductDetails>
                    </ProductSection>

                    <Divider />

                    {/* Summary */}
                    <Summary>
                      <SummaryItem>
                        <Label>Items</Label>
                        <Value>3</Value>
                      </SummaryItem>

                      <SummaryItem>
                        <Label>Total</Label>
                        <Value>$1,420</Value>
                      </SummaryItem>

                      <SummaryItem>
                        <Label>Payment</Label>
                        <Value>Visa •••• 4242</Value>
                      </SummaryItem>
                    </Summary>

                    <Divider />

                    {/* Delivery */}
                    <Delivery>
                      <span>
                        Delivered to: <strong>Home Address</strong>
                      </span>
                      <span>
                        Delivered on: <strong>15 Jan</strong>
                      </span>
                    </Delivery>

                    {/* Actions */}
                    <Actions>
                      <CancelButton>Cancel Order</CancelButton>
                      <SecondaryButton>Track Order</SecondaryButton>
                      <PrimaryButton>View Details</PrimaryButton>
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
