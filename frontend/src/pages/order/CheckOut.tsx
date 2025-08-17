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
                <Label>First name</Label>
              </Field>
              <Field>
                <RoundedInput type="text" required />
                <Label>Last name</Label>
              </Field>
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
              <p>Items: 3</p>
              <p>Price: $150.00</p>
              <p>Shipping: $15.00</p>
              <p>Tax: $20.00</p>
              <hr />
              <p>Total: $185.00</p>
              <FullButtonRounded type="submit">Place Order</FullButtonRounded>
            </Card>
          </Section>
        </FlexBetweenRow>
      </Container>
    </Fragment>
  );
};

export default CheckOut;
