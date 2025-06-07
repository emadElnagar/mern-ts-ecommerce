import { Fragment } from "react";
import { useEffect } from "react";
import CategoryForm from "../../components/CategoryForm";
import { Main, Section } from "../../styles/main";
import { Helmet } from "react-helmet";
import CategoryList from "../../components/CategoryList";
import { useDispatch, useSelector } from "react-redux";
import { GetAllCategories } from "../../features/CategoryFeatures";
import { Content } from "../../styles/admin";
import SideNav from "../../components/SideNav";
import ErrorBox from "../../components/ErrorBox";
import LoadingBox from "../../components/LoadingBox";

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const { categories, error, loading } = useSelector(
    (state: any) => state.category
  );
  useEffect(() => {
    dispatch(GetAllCategories());
  }, [dispatch]);
  return (
    <Fragment>
      <Helmet>
        <title>Electronics-admin</title>
      </Helmet>
      <Main>
        <SideNav />
        <Content>
          <Section>
            <CategoryForm />
          </Section>
          <Section>
            {loading ? (
              <LoadingBox />
            ) : error ? (
              <ErrorBox message={error} />
            ) : (
              categories.length > 0 && (
                <>
                  <h1 className="text-center">all categories</h1>
                  {categories.map(
                    (category: { _id: React.Key; title: string }) => (
                      <CategoryList
                        key={category._id}
                        title={category.title}
                        _id={category._id}
                      />
                    )
                  )}
                </>
              )
            )}
          </Section>
        </Content>
      </Main>
    </Fragment>
  );
};

export default CategoriesPage;
