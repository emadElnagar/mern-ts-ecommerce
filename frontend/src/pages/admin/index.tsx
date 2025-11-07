import { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Content } from "../../styles/admin";
import ProductsList from "../../components/ProductsList";

const AdminMainPage = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Electronics-Admin</title>
      </Helmet>
      <Content>
        <ProductsList />
      </Content>
    </Fragment>
  );
};

export default AdminMainPage;
