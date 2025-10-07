import { Fragment, useEffect } from "react";
import { Helmet } from "react-helmet";
import { HeaderCenter, Main, Section } from "../../styles/main";
import SideNav from "../../components/SideNav";
import { Content } from "../../styles/admin";
import {
  StyledTable,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
  TableWrapper,
} from "../../styles/cart";
import { FaRegEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { HiPencil } from "react-icons/hi";
import { success, warning } from "../../styles/variables";
import { useDispatch, useSelector } from "react-redux";
import { GetAllOrders } from "../../features/OrderFeatures";
import LoadingBox from "../../components/LoadingBox";
import ErrorBox from "../../components/ErrorBox";
import { Link } from "react-router-dom";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { isLoading, error, orders } = useSelector((state: any) => state.order);
  useEffect(() => {
    dispatch(GetAllOrders());
  }, [dispatch]);
  return (
    <Fragment>
      <Helmet>
        <title>Voltaro - admin orders</title>
      </Helmet>
      <Main>
        <SideNav />
        <Content>
          <Section>
            <HeaderCenter>Manage all orders</HeaderCenter>
            {isLoading ? (
              <LoadingBox />
            ) : error ? (
              <ErrorBox message={error} />
            ) : (
              <TableWrapper>
                <StyledTable>
                  <TableHead>
                    <TableRow>
                      <TableHeader>Order</TableHeader>
                      <TableHeader>Date</TableHeader>
                      <TableHeader>Customer</TableHeader>
                      <TableHeader>Total</TableHeader>
                      <TableHeader>Payment</TableHeader>
                      <TableHeader>Delivery</TableHeader>
                      <TableHeader>Items</TableHeader>
                      <TableHeader>Fulfillment</TableHeader>
                      <TableHeader>Actions</TableHeader>
                    </TableRow>
                  </TableHead>
                  <tbody>
                    {orders &&
                      orders.length > 0 &&
                      orders.map((order: any) => (
                        <TableRow key={order._id}>
                          <TableData>{order.orderNumber}</TableData>
                          <TableData>
                            {new Date(order.createdAt).toLocaleDateString()}
                          </TableData>
                          <TableData style={{ textTransform: "capitalize" }}>
                            {order.customer.firstName} {order.customer.lastName}
                          </TableData>
                          <TableData>${order.totalPrice.toFixed(2)}</TableData>
                          <TableData
                            style={{ color: order.isPaid ? success : warning }}
                          >
                            {order.paymentResult && order.paymentResult.paidAt
                              ? "Paid"
                              : "pending"}
                          </TableData>
                          <TableData
                            style={{
                              color:
                                order.shippingStatus &&
                                order.shippingStatus === "Delivered"
                                  ? success
                                  : warning,
                            }}
                          >
                            {order.shippingStatus}
                          </TableData>
                          <TableData>{order.orderItems.length}</TableData>
                          <TableData
                            style={{
                              color:
                                order.shippingStatus &&
                                order.shippingStatus === "Delivered"
                                  ? success
                                  : warning,
                            }}
                          >
                            {order.shippingStatus &&
                            order.shippingStatus === "Delivered"
                              ? "Fulfilled"
                              : "Unfulfilled"}
                          </TableData>
                          <TableData>
                            <Link to={`/admin/orders/${order._id}`}>
                              <FaRegEye title="View" />
                            </Link>{" "}
                            | <HiPencil title="Edit" /> |{" "}
                            <MdDelete title="Delete" />
                          </TableData>
                        </TableRow>
                      ))}
                  </tbody>
                </StyledTable>
              </TableWrapper>
            )}
          </Section>
        </Content>
      </Main>
    </Fragment>
  );
};

export default OrdersPage;
