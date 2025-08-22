import { Fragment } from "react";
import { Helmet } from "react-helmet";
import {
  Button,
  Card,
  Container,
  FlexBetweenRow,
  FullButtonRounded,
  Section,
} from "../../styles/main";
import { Field, Label, RoundedInput } from "../../styles/form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CreateOrder } from "../../features/OrderFeatures";

const CheckOut = () => {
  const { user } = useSelector((state: any) => state.user);
  const { cart } = useSelector((state: any) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (!user) {
    navigate("/users/login?next=/checkout");
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(CreateOrder());
  };
  return (
    <Fragment>
      <Helmet>
        <title>checkout</title>
      </Helmet>
      <Container>
        {cart && cart.length > 0 ? (
          <FlexBetweenRow>
            <Section style={{ width: "70%" }}>
              <form onSubmit={handleSubmit}>
                <Field>
                  <RoundedInput type="text" required />
                  <Label>Country</Label>
                </Field>
                <Field>
                  <RoundedInput type="text" required />
                  <Label>City</Label>
                </Field>
                <Field>
                  <RoundedInput type="text" required />
                  <Label>Street address</Label>
                </Field>
                <Field>
                  <RoundedInput type="text" required />
                  <Label>Postal code</Label>
                </Field>
                <Field>
                  <RoundedInput type="text" required />
                  <Label>Phone</Label>
                </Field>
                <Field>
                  <RoundedInput type="text" />
                  <Label>Phone 2 ( optional )</Label>
                </Field>
              </form>
            </Section>
            <Section>
              <Card>
                <h2>Order Summary</h2>
                <div>
                  <div className="row">
                    <span>Items:</span>
                    <span>3</span>
                  </div>
                  <div className="row">
                    <span>Price:</span>
                    <span>$150.00</span>
                  </div>
                  <div className="row">
                    <span>Shipping:</span>
                    <span>$15.00</span>
                  </div>
                  <div className="row">
                    <span>Tax:</span>
                    <span>$20.00</span>
                  </div>
                  <hr />
                  <div className="row">
                    <span>Total:</span>
                    <span>185.00</span>
                  </div>
                </div>
                <FullButtonRounded type="submit">Place Order</FullButtonRounded>
              </Card>
            </Section>
          </FlexBetweenRow>
        ) : (
          <div className="text-center">
            <h2>Your cart is empty</h2>
            <Button onClick={() => navigate("/products")}>
              Return to shop
            </Button>
          </div>
        )}
      </Container>
    </Fragment>
  );
};

export default CheckOut;
