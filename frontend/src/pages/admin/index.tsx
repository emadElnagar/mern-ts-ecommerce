import { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Content } from "../../styles/admin";
import ProductsList from "../../components/ProductsList";
import MainAnalysis from "../../components/MainAnalysis";

const AdminMainPage = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Voltaro-Admin</title>
      </Helmet>
      <Content>
        <MainAnalysis />
        <ProductsList />
      </Content>
    </Fragment>
  );
};

export default AdminMainPage;
