import { Helmet } from "react-helmet";
import { Fragment, useEffect } from "react";
import { Content } from "../../styles/admin";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../../components/LoadingBox";
import ErrorBox from "../../components/ErrorBox";
import { Link, useParams } from "react-router-dom";
import { GetOrder } from "../../features/OrderFeatures";
import { FlexRow, HeaderCenter, Image, Section } from "../../styles/main";
import { API_URL } from "../../API";

const SingleOrder = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { error, isLoading, order } = useSelector((state: any) => state.order);
  useEffect(() => {
    dispatch(GetOrder(id));
  }, [dispatch, id]);
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
            order && (
              <>
                <HeaderCenter>Order number {order.orderNumber}</HeaderCenter>
                <h3 className="text-center">
                  Order customer:{" "}
                  <Link to={`/users/profile/${order.customer._id}`}>
                    {order.customer.firstName} {order.customer.lastName}
                  </Link>
                </h3>
                {order.orderItems.map((item: any) => (
                  <div key={item._id}>
                    <Link
                      style={{ margin: "auto" }}
                      to={`/products/${item.product.slug}`}
                    >
                      <div style={{ width: "100px", margin: "20px auto" }}>
                        <Image
                          src={`${API_URL}/${item.product.images[0]}`}
                          alt={item.product.name}
                        />
                      </div>
                      <h3 className="text-center">{item.product.name}</h3>
                    </Link>
                    <h3 className="text-center">Qty: {item.quantity}</h3>
                    <h3 className="text-center">Price: ${item.price}</h3>
                    <h3 className="text-center">
                      Total price: ${`${item.price * item.quantity}`}
                    </h3>
                  </div>
                ))}
                <h3 className="text-center">
                  Order Total price: ${order.totalPrice}
                </h3>
              </>
            )
          )}
        </Section>
      </Content>
    </Fragment>
  );
};

export default SingleOrder;
