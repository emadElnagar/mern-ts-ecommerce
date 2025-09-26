import { Fragment } from "react";
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

const OrdersPage = () => {
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
                  <TableRow>
                    <TableData>#12345</TableData>
                    <TableData>2023-10-01</TableData>
                    <TableData>John Doe</TableData>
                    <TableData>$150.00</TableData>
                    <TableData style={{ color: success }}>Paid</TableData>
                    <TableData style={{ color: success }}>Shipped</TableData>
                    <TableData>3</TableData>
                    <TableData style={{ color: success }}>Fulfilled</TableData>
                    <TableData>
                      <FaRegEye title="View" /> | <HiPencil title="Edit" /> |{" "}
                      <MdDelete title="Delete" />
                    </TableData>
                  </TableRow>
                  <TableRow>
                    <TableData>#12346</TableData>
                    <TableData>2023-10-02</TableData>
                    <TableData>Jane Smith</TableData>
                    <TableData>$200.00</TableData>
                    <TableData style={{ color: warning }}>Pending</TableData>
                    <TableData style={{ color: warning }}>Processing</TableData>
                    <TableData>5</TableData>
                    <TableData style={{ color: warning }}>
                      Unfulfilled
                    </TableData>
                    <TableData>
                      <FaRegEye title="View" /> | <HiPencil title="Edit" /> |{" "}
                      <MdDelete title="Delete" />
                    </TableData>
                  </TableRow>
                </tbody>
              </StyledTable>
            </TableWrapper>
          </Section>
        </Content>
      </Main>
    </Fragment>
  );
};

export default OrdersPage;
