import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrderIncome,
  fetchOrderStats,
} from "../features/AnalysisFeatures";
import type { AppDispatch, RootState } from "../store";
import { AnalysisCard, FlexRow, Grid, Section } from "../styles/main";
import ErrorBox from "./ErrorBox";
import LoadingBox from "./LoadingBox";

const MainAnalysis = () => {
  const { error, isLoading, orders, income } = useSelector(
    (state: RootState) => state.analysis
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchOrderStats());
    dispatch(fetchOrderIncome());
  }, [dispatch]);
  return (
    <Section>
      {isLoading ? (
        <LoadingBox />
      ) : error ? (
        <ErrorBox message={error} />
      ) : (
        <FlexRow style={{ gap: "20px", justifyContent: "space-around" }}>
          <AnalysisCard>
            <h3>Total Orders</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>
              {orders?.totalOrders}
            </p>
          </AnalysisCard>
          <AnalysisCard>
            <h3>Total Income</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>
              ${income?.totalIncome.toFixed(2)}
            </p>
          </AnalysisCard>
        </FlexRow>
      )}
    </Section>
  );
};

export default MainAnalysis;
