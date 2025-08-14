import { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Container, Section } from "../../styles/main";
import { Field, Label, RoundedInput } from "../../styles/form";

const CheckOut = () => {
  return (
    <Fragment>
      <Helmet>
        <title>checkout</title>
      </Helmet>
      <Container>
        <Section>
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
      </Container>
    </Fragment>
  );
};

export default CheckOut;
