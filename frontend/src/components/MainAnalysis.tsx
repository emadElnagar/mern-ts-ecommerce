import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchOrderStats } from "../features/AnalysisFeatures";
import type { AppDispatch } from "../store";

const MainAnalysis = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchOrderStats());
  }, [dispatch]);
  return (
    <div>
      <h1>Main Analysis Component</h1>
    </div>
  );
};

export default MainAnalysis;
