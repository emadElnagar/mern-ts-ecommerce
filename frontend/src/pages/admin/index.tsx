import { Fragment, useEffect } from "react";
import SideNav from "../../components/SideNav";
import { Grid, Main, Section } from "../../styles/main";
import { useDispatch, useSelector } from "react-redux";
import { GetAllProducts } from "../../features/ProductFeatures";
import { Helmet } from "react-helmet";
import { Content } from "../../styles/admin";
import ErrorBox from "../../components/ErrorBox";
import LoadingBox from "../../components/LoadingBox";
import {
  ProductDiv,
  ProductHeader,
  ProductImg,
  ProductTitle,
  OriginalPrice,
  IconButton,
} from "../../styles/product";
import { FlexBetweenRow } from "../../styles/main";
import { MdDelete } from "react-icons/md";
import { HiPencil } from "react-icons/hi2";

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
      <Main>
        <SideNav />
        <Content>
          <Section>
            {error ? (
              <ErrorBox message="Error getting products" />
            ) : loading ? (
              <LoadingBox />
            ) : (
              <Grid>
                {products.map(
                  (product: {
                    _id: string;
                    name: string;
                    images: string[];
                    price: number;
                    discount: number;
                  }) => (
                    <ProductDiv className="stable" key={product._id}>
                      <ProductHeader>
                        <ProductTitle>{product.name}</ProductTitle>
                      </ProductHeader>
                      <ProductImg
                        src={`http://localhost:5000/${product.images[0]}`}
                        alt="There is a problem showing your photos"
                      />
                      {product.discount ? (
                        <FlexBetweenRow>
                          <small>
                            <OriginalPrice>{product.price}$</OriginalPrice>
                          </small>
                        </FlexBetweenRow>
                      ) : (
                        <FlexBetweenRow>
                          <span>{product.price}$</span>
                        </FlexBetweenRow>
                      )}

                      <FlexBetweenRow>
                        <IconButton>
                          update <HiPencil />
                        </IconButton>
                        <IconButton>
                          delete <MdDelete />
                        </IconButton>
                      </FlexBetweenRow>
                    </ProductDiv>
                  )
                )}
              </Grid>
            )}
          </Section>
        </Content>
      </Main>
    </Fragment>
  );
};

export default AdminMainPage;
