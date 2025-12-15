import { Helmet } from "react-helmet";
import { Container, Main, Section } from "../../styles/main";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopProducts } from "../../features/AnalysisFeatures";
import { AppDispatch } from "../../store";
import LoadingBox from "../../components/LoadingBox";
import ErrorBox from "../../components/ErrorBox";

const BestSellingPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { topProducts, isLoading, error } = useSelector(
    (state: any) => state.analysis
  );
  useEffect(() => {
    dispatch(fetchTopProducts());
  }, [dispatch]);
  return (
    <Fragment>
      <Helmet>Voltaro-Bestselling</Helmet>
      <Main>
        <Container>
          <Section>
            {isLoading ? (
              <LoadingBox />
            ) : error ? (
              <ErrorBox message={error} />
            ) : (
              topProducts && (
                <>
                  <h2>Best Selling Products</h2>
                </>
              )
            )}
          </Section>
        </Container>
      </Main>
    </Fragment>
  );
};

export default BestSellingPage;
