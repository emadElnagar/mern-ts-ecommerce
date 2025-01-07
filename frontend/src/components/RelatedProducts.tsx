import { Fragment, Key, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetSimilarProducts } from "../features/ProductFeatures";
import ErrorBox from "./ErrorBox";
import LoadingBox from "./LoadingBox";

type propsType = {
  slug: string;
};

const RelatedProducts = (props: propsType) => {
  const dispatch = useDispatch();
  const slug = props.slug;
  const { error, loading, similarProducts } = useSelector(
    (state: any) => state.product
  );
  useEffect(() => {
    dispatch(GetSimilarProducts(slug));
  }, [dispatch, slug]);
  return (
    <Fragment>
      <div>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <ErrorBox message="Error getting similar products" />
        ) : (
          similarProducts.length > 0 && (
            <div>
              <h2 className="text-center">related products</h2>
              {similarProducts.map((product: { _id: Key }) => (
                <div key={product._id}>{product._id}</div>
              ))}
            </div>
          )
        )}
      </div>
    </Fragment>
  );
};

export default RelatedProducts;
