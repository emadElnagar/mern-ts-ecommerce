import { Fragment, Key, useEffect } from "react";
import SideNav from "../../components/SideNav";
import { Grid, Main, Section } from "../../styles/main";
import { useDispatch, useSelector } from "react-redux";
import { DeleteProduct, GetAllProducts } from "../../features/ProductFeatures";
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
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../API";
import {
  StyledTable,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
  TableWrapper,
} from "../../styles/cart";

const AdminMainPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, error, isLoading } = useSelector((state: any) => state.product);
  useEffect(() => {
    dispatch(GetAllProducts());
  }, [dispatch]);
  // Delete product
  const handleDelete = (_id: Key) => {
    swal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete",
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(DeleteProduct({ _id }));
          swal.fire("Deleted!", "Product has been deleted.", "success");
        }
      })
      .then(() => {
        dispatch(GetAllProducts());
      });
  };
  // Update product
  const handleUpdate = (slug: string) => {
    navigate(`/admin/products/update/${slug}`);
  };
  return (
    <Fragment>
      <Helmet>
        <title>Electronics-Admin</title>
      </Helmet>
      <Content>
        <Section>
          {error ? (
            <ErrorBox message="Error getting products" />
          ) : isLoading ? (
            <LoadingBox />
          ) : (
            <TableWrapper>
              <StyledTable>
                <TableHead>
                  <TableRow>
                    <TableHeader>Product</TableHeader>
                    <TableHeader>Price</TableHeader>
                    <TableHeader>Discount</TableHeader>
                    <TableHeader>Category</TableHeader>
                    <TableHeader>Brand</TableHeader>
                    <TableHeader>Stock</TableHeader>
                    <TableHeader>Sold</TableHeader>
                    <TableHeader>Actions</TableHeader>
                  </TableRow>
                </TableHead>
                <tbody>
                  <TableRow>
                    <TableData
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <img src="https://placehold.co/50x50" />
                      <span>product name</span>
                    </TableData>
                    <TableData>$100</TableData>
                    <TableData>$10</TableData>
                    <TableData>category</TableData>
                    <TableData>brand</TableData>
                    <TableData>100</TableData>
                    <TableData>10</TableData>
                    <TableData>
                      <FlexBetweenRow>
                        <IconButton>
                          <HiPencil />
                        </IconButton>
                        <IconButton>
                          <MdDelete />
                        </IconButton>
                      </FlexBetweenRow>
                    </TableData>
                  </TableRow>
                </tbody>
              </StyledTable>
            </TableWrapper>
          )}
        </Section>
      </Content>
    </Fragment>
  );
};

export default AdminMainPage;
