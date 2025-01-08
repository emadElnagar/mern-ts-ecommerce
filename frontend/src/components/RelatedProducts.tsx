import { Fragment, Key, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetSimilarProducts } from "../features/ProductFeatures";
import ErrorBox from "./ErrorBox";
import LoadingBox from "./LoadingBox";
import { Grid, Section } from "../styles/main";
import Product from "./product";

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
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <ErrorBox message="Error getting similar products" />
      ) : (
        similarProducts.length > 0 && (
          <Section>
            <h2 className="text-center">related products</h2>
            <Grid>
              {similarProducts.map(
                (product: {
                  _id: Key;
                  name: string;
                  slug: string;
                  images: string[];
                  price: number;
                  discount: number;
                  myClass: string;
                }) => (
                  <Product
                    key={product._id}
                    _id={product._id}
                    name={product.name}
                    slug={product.slug}
                    image={product.images[0]}
                    price={product.price}
                    discount={product.discount}
                    myClass="similar"
                  />
                )
              )}
            </Grid>
          </Section>
        )
      )}
    </Fragment>
  );
};

export default RelatedProducts;
