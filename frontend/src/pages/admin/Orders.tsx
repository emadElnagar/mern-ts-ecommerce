import { Fragment, Key, useEffect } from "react";
import { Helmet } from "react-helmet";
import { HeaderCenter, Section } from "../../styles/main";
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
import { HiPencil } from "react-icons/hi";
import { success, warning } from "../../styles/variables";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllOrders,
  UpdateOrderPaymentStatus,
  UpdateOrderStatus,
} from "../../features/OrderFeatures";
import LoadingBox from "../../components/LoadingBox";
import ErrorBox from "../../components/ErrorBox";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

type UpdateOrder = {
  deliveryStatus: string;
  paymentStatus: string;
};
const OrdersPage = () => {
  const dispatch = useDispatch();
  const { isLoading, error, orders } = useSelector((state: any) => state.order);
  // Update order
  let DeliveryStatusInput: HTMLInputElement;
  let PymentStatusInput: HTMLInputElement;
  const handleUpdate = (
    id: Key,
    OrderDeliveryStatus: string,
    paymentStatus: string
  ) => {
    Swal.fire<UpdateOrder>({
      title: "Delivery and payment status",
      html: `
        <div class="select">
          <select name="deliveryStatus" id="deliveryStatus">
            <option value="Pending" ${
              OrderDeliveryStatus === "Pending" && "selected"
            }>Pending</option>
            <option value="Processing" ${
              OrderDeliveryStatus === "Processing" && "selected"
            }>Processing</option>
            <option value="Out for Delivery" ${
              OrderDeliveryStatus === "Out for Delivery" && "selected"
            }>Out for Delivery</option>
            <option value="Delivered" ${
              OrderDeliveryStatus === "Delivered" && "selected"
            }>Delivered</option>
            <option value="Canceled" ${
              OrderDeliveryStatus === "Canceled" && "selected"
            }>Canceled</option>
          </select>
        </div>
        <div class="select">
          <select name="paymentStatus" id="paymentStatus">
            <option value="notPaid" ${
              paymentStatus === "notPaid" && "selected"
            }>Not paid</option>
            <option value="paid" ${
              paymentStatus === "paid" && "selected"
            }>Paid</option>
          </select>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Confirm",
      focusConfirm: false,
      didOpen: () => {
        const popup = Swal.getPopup()!;
        DeliveryStatusInput = popup.querySelector(
          "#deliveryStatus"
        ) as HTMLInputElement;
        PymentStatusInput = popup.querySelector(
          "#paymentStatus"
        ) as HTMLInputElement;
        DeliveryStatusInput.onkeyup = (event) =>
          event.key === "Enter" && Swal.clickConfirm();
        PymentStatusInput.onkeyup = (event) =>
          event.key === "Enter" && Swal.clickConfirm();
      },
      preConfirm: () => {
        const deliveryStatus = DeliveryStatusInput.value;
        const paymentStatus = PymentStatusInput.value;
        if (!deliveryStatus) {
          Swal.showValidationMessage(`Please Choose delivery status`);
        }
        if (!paymentStatus) {
          Swal.showValidationMessage(`Please Choose payment status`);
        }
        return { deliveryStatus, paymentStatus };
      },
    }).then((result) => {
      const deliveryStatus = result.value?.deliveryStatus;
      const paymentStatus = result.value?.paymentStatus;
      if (result.isConfirmed) {
        Promise.all([
          dispatch(
            UpdateOrderStatus({
              _id: id,
              status: deliveryStatus,
            })
          ),
          dispatch(
            UpdateOrderPaymentStatus({
              _id: id,
              paymentResult: paymentStatus,
            })
          ),
        ]).then(() => {
          dispatch(GetAllOrders());
        });
      }
    });
  };
  // Get all orders
  useEffect(() => {
    dispatch(GetAllOrders());
  }, [dispatch]);
  return (
    <Fragment>
      <Helmet>
        <title>Voltaro - admin orders</title>
      </Helmet>
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
                          style={{
                            color:
                              order.paymentResult &&
                              order.paymentResult.status === "paid"
                                ? success
                                : warning,
                          }}
                        >
                          {order.paymentResult &&
                          order.paymentResult.status === "paid"
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
                          |{" "}
                          <HiPencil
                            title="Edit"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handleUpdate(
                                order._id,
                                order.shippingStatus,
                                order.paymentResult?.status
                              )
                            }
                          />
                        </TableData>
                      </TableRow>
                    ))}
                </tbody>
              </StyledTable>
            </TableWrapper>
          )}
        </Section>
      </Content>
    </Fragment>
  );
};

export default OrdersPage;
