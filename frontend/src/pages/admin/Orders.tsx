import { Fragment } from "react";
import { Helmet } from "react-helmet";
import { HeaderCenter, Main, Section } from "../../styles/main";
import SideNav from "../../components/SideNav";
import { Content } from "../../styles/admin";

const OrdersPage = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Voltaro - admin orders</title>
      </Helmet>
      <Main>
        <SideNav />
        <Content>
          <Section>
            <HeaderCenter>Manage all orders</HeaderCenter>
          </Section>
        </Content>
      </Main>
    </Fragment>
  );
};

export default OrdersPage;
