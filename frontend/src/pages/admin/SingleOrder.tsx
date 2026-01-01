import { Helmet } from "react-helmet";
import { Fragment, useEffect } from "react";
import { Content } from "../../styles/admin";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../../components/LoadingBox";
import ErrorBox from "../../components/ErrorBox";
import { Link, useParams } from "react-router-dom";
import { GetOrder } from "../../features/OrderFeatures";
import { FlexRow, HeaderCenter, Section } from "../../styles/main";

const SingleOrder = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { error, isLoading, order } = useSelector((state: any) => state.order);
  useEffect(() => {
    dispatch(GetOrder(id));
  }, [dispatch, id]);
  console.log(id);
  console.log(order);
  return (
    <Fragment>
      <Helmet>
        <title>Voltaro - admin single order</title>
      </Helmet>
      <Content>
        <Section>
          {isLoading ? (
            <LoadingBox />
          ) : error ? (
            <ErrorBox message={error.message} />
          ) : (
            <>
              <HeaderCenter>Order number {order.orderNumber}</HeaderCenter>
              <FlexRow>
                <h3 className="text-center">Order customer : </h3>
                <Link to={`/users/profile/${order.customer._id}`}>
                  <h3 className="text-center">
                    {order.customer.firstName} {order.customer.lastName}
                  </h3>
                </Link>
              </FlexRow>
            </>
          )}
        </Section>
      </Content>
    </Fragment>
  );
};

export default SingleOrder;
