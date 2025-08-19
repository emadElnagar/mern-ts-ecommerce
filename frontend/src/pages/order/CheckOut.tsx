import { Fragment } from "react";
import { Helmet } from "react-helmet";
import {
  Card,
  Container,
  FlexBetweenRow,
  FullButtonRounded,
  Section,
} from "../../styles/main";
import { Field, Label, RoundedInput } from "../../styles/form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CheckOut = () => {
  const { user } = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  if (!user) {
    navigate("/users/login?next=/checkout");
  }
  return (
    <Fragment>
      <Helmet>
        <title>checkout</title>
      </Helmet>
      <Container>
        <FlexBetweenRow>
          <Section style={{ width: "70%" }}>
            <form>
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
      </Container>
    </Fragment>
  );
};

export default CheckOut;
