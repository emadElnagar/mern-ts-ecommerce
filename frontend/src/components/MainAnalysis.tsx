import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrderIncome,
  fetchOrderStats,
} from "../features/AnalysisFeatures";
import type { AppDispatch, RootState } from "../store";
import { AnalysisCard, FlexRow, TabButton, Tabs } from "../styles/main";
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
    <>
      {isLoading ? (
        <LoadingBox />
      ) : error ? (
        <ErrorBox message={error} />
      ) : (
        <div className="paper-container">
          <Tabs className="center underline">
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
                {activeTab === "1 month"
                  ? orders?.ordersLast30Days
                  : activeTab === "90 days"
                  ? orders?.ordersLast90Days
                  : activeTab === "1 year"
                  ? orders?.ordersLastYear
                  : orders?.totalOrders}
              </p>
            </AnalysisCard>
            <AnalysisCard>
              <h3>Total Income</h3>
              <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                $
                {activeTab === "1 month"
                  ? income?.incomeLast30Days?.toFixed(2)
                  : activeTab === "90 days"
                  ? income?.incomeLast90Days?.toFixed(2)
                  : activeTab === "1 year"
                  ? income?.incomeLastYear?.toFixed(2)
                  : income?.totalIncome?.toFixed(2)}
              </p>
            </AnalysisCard>
          </FlexRow>
        </div>
      )}
    </>
  );
};

export default MainAnalysis;
