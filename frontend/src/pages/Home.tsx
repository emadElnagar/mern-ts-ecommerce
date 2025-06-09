import { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Container } from "../styles/main";

function Home() {
  return (
    <Fragment>
      <Helmet>
        <title>Electronics</title>
      </Helmet>
      <Container></Container>
    </Fragment>
  );
}

export default Home;
