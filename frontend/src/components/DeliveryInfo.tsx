import { Delivery } from "../styles/main";

interface Order {
  shippingStatus: string;
  shippingAddress?: {
    address: string;
  };
  deliveredAt?: string;
}

const DeliveryInfo = ({ order }: { order: Order }): JSX.Element => {
  switch (order.shippingStatus) {
    case "Delivered":
      return (
        <Delivery>
          <span>
            Delivered to: <strong>{order.shippingAddress?.address}</strong>
          </span>
          <span>
            Delivered on:{" "}
            <strong>
              {order.deliveredAt
                ? new Date(order.deliveredAt).toLocaleDateString()
                : "Unknown"}
            </strong>
          </span>
        </Delivery>
      );

    case "Out for Delivery":
      return (
        <Delivery>
          <span>
            Shipping to: <strong>{order.shippingAddress?.address}</strong>
          </span>
          <span>
            Estimated delivery: <strong>in 2 days</strong>
          </span>
        </Delivery>
      );

    case "Pending":
    case "Processing":
      return (
        <Delivery>
          <span>Preparing for shipment...</span>
        </Delivery>
      );

    case "Cancelled":
      return (
        <Delivery>
          <span>Order cancelled</span>
        </Delivery>
      );
    default:
      return (
        <Delivery>
          <span>Status unknown</span>
        </Delivery>
      );
  }
};

export default DeliveryInfo;
