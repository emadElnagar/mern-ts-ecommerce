import { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Container, Section } from "../../styles/main";

const CheckOut = () => {
  return (
    <Fragment>
      <Helmet>
        <title>checkout</title>
      </Helmet>
      <Container>
        <Section></Section>
      </Container>
    </Fragment>
  );
};

export default CheckOut;
