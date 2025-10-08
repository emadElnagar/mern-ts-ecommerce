import { Helmet } from "react-helmet";
import { Container, Main } from "../../styles/main";
import { Fragment } from "react";
import { Content } from "../../styles/admin";
import SideNav from "../../components/SideNav";
import { useSelector } from "react-redux";

const SingleOrder = () => {
  const { error, isLoading, order } = useSelector((state: any) => state.order);
  return (
    <Fragment>
      <Helmet>
        <title>Voltaro - admin single order</title>
      </Helmet>
      <Content>
        <h1>Single order</h1>
      </Content>
    </Fragment>
  );
};

export default SingleOrder;
