import { Helmet } from "react-helmet";
import { Container, Grid, Main, Section, Tab, Tabs } from "../../styles/main";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopProducts } from "../../features/AnalysisFeatures";
import { AppDispatch } from "../../store";
import LoadingBox from "../../components/LoadingBox";
import ErrorBox from "../../components/ErrorBox";
import Product from "../../components/product";

const BestSellingPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState("last30Days");
  const { topProducts, isLoading, error } = useSelector(
    (state: any) => state.analysis
  );
  useEffect(() => {
    dispatch(fetchTopProducts());
  }, [dispatch]);
  return (
    <Fragment>
      <Helmet>
        <title>Voltaro-Bestselling</title>
      </Helmet>
      <Main>
        <Container>
          <Section>
            <Tabs className="center">
              <Tab
                onClick={() => setActiveTab("last30Days")}
                className={activeTab === "last30Days" ? "active" : ""}
              >
                Last 30 Days
              </Tab>
              <Tab
                onClick={() => setActiveTab("last90Days")}
                className={activeTab === "last90Days" ? "active" : ""}
              >
                Last 90 Days
              </Tab>
              <Tab
                onClick={() => setActiveTab("lastYear")}
                className={activeTab === "lastYear" ? "active" : ""}
              >
                Last Year
              </Tab>
            </Tabs>
            {isLoading ? (
              <LoadingBox />
            ) : error ? (
              <ErrorBox message={error} />
            ) : (
              topProducts && (
                <Grid className="mt-20">
                  {topProducts[activeTab].map((item: any) => (
                    <Product
                      key={item.product._id}
                      _id={item.product._id}
                      name={item.product.name}
                      slug={item.product.slug}
                      image={item.product.images?.[0] || "fallback.jpg"}
                      price={item.product.price}
                      discount={item.product.discount}
                    />
                  ))}
                </Grid>
              )
            )}
          </Section>
        </Container>
      </Main>
    </Fragment>
  );
};

export default BestSellingPage;
