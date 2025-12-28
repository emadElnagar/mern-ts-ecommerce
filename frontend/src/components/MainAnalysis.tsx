import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrderIncome,
  fetchOrderStats,
} from "../features/AnalysisFeatures";
import type { AppDispatch, RootState } from "../store";
import {
  AnalysisCard,
  FlexRow,
  Grid,
  Section,
  Tab,
  TabButton,
  Tabs,
} from "../styles/main";
import ErrorBox from "./ErrorBox";
import LoadingBox from "./LoadingBox";

const MainAnalysis = () => {
  const { error, isLoading, orders, income } = useSelector(
    (state: RootState) => state.analysis
  );
  const [activeTab, setActiveTab] = useState("1 month");
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
        <div>
          <Tabs className="center">
            <TabButton
              className={activeTab === "1 month" ? "active" : ""}
              onClick={() => setActiveTab("1 month")}
            >
              1 month
            </TabButton>
            <TabButton
              className={activeTab === "90 days" ? "active" : ""}
              onClick={() => setActiveTab("90 days")}
            >
              90 days
            </TabButton>
            <TabButton
              className={activeTab === "1 year" ? "active" : ""}
              onClick={() => setActiveTab("1 year")}
            >
              1 year
            </TabButton>
            <TabButton
              className={activeTab === "All" ? "active" : ""}
              onClick={() => setActiveTab("All")}
            >
              All
            </TabButton>
          </Tabs>
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
                ${income?.totalIncome?.toFixed(2)}
              </p>
            </AnalysisCard>
          </FlexRow>
        </div>
      )}
    </Section>
  );
};

export default MainAnalysis;
