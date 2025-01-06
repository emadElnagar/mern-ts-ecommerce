import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetSimilarProducts } from "../features/ProductFeatures";

const RelatedProducts = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { error, loading, similarProducts } = useSelector(
    (state: any) => state.product
  );
  useEffect(() => {
    dispatch(GetSimilarProducts(slug));
  }, [dispatch, slug]);
  return <div>Related products</div>;
};

export default RelatedProducts;
