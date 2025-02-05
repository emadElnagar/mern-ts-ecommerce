import { Fragment, useEffect } from "react";
import SideNav from "../../components/SideNav";
import { Container, Grid, Section } from "../../styles/main";
import { useDispatch, useSelector } from "react-redux";
import { GetAllProducts } from "../../features/ProductFeatures";
import { Helmet } from "react-helmet";

const AdminMainPage = () => {
  const dispatch = useDispatch();
  const { products, error, loading } = useSelector(
    (state: any) => state.product
  );
  useEffect(() => {
    dispatch(GetAllProducts());
  }, [dispatch]);
  return (
    <Fragment>
      <Helmet>
        <title>Electronics-Admin</title>
      </Helmet>
      <SideNav />
      <Container>
        <Section>
          <Grid>
            <h1>Admin Main Page</h1>
          </Grid>
        </Section>
      </Container>
    </Fragment>
  );
};

export default AdminMainPage;
