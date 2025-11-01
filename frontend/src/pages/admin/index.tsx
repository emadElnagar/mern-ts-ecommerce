import { Fragment, Key, useEffect, useState } from "react";
import { Button, Image, Section } from "../../styles/main";
import { useDispatch, useSelector } from "react-redux";
import { DeleteProduct, GetAllProducts } from "../../features/ProductFeatures";
import { Helmet } from "react-helmet";
import { Content } from "../../styles/admin";
import ErrorBox from "../../components/ErrorBox";
import LoadingBox from "../../components/LoadingBox";
import { IconButton } from "../../styles/product";
import { FlexBetweenRow } from "../../styles/main";
import { MdDelete } from "react-icons/md";
import { HiPencil } from "react-icons/hi2";
import swal from "sweetalert2";
import { useNavigate, useSearchParams } from "react-router-dom";
import { API_URL } from "../../API";
import {
  StyledTable,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
  TableWrapper,
} from "../../styles/cart";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const AdminMainPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, error, isLoading } = useSelector((state: any) => state.product);
  const { totalPages } = data;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get("page") || "1");
  const handleChangePage = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    setSearchParams({ page: pageNumber.toString() });
    dispatch(GetAllProducts(pageNumber));
  };
  useEffect(() => {
    dispatch(GetAllProducts({ page: pageFromUrl, limit: 5 }));
    setCurrentPage(pageFromUrl);
  }, [pageFromUrl, dispatch]);
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
                  {data.products &&
                    data.products.length > 0 &&
                    data.products.map((product: any) => (
                      <TableRow>
                        <TableData
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <Image
                            src={`${API_URL}/${product.images?.[0]}`}
                            alt="product from voltaro"
                            style={{ width: "50px" }}
                          />
                          <span>{product.name}</span>
                        </TableData>
                        <TableData>${product.price}</TableData>
                        <TableData>
                          {product.discount ? "$" + product.discount : 0}
                        </TableData>
                        <TableData>{product.category.title}</TableData>
                        <TableData>{product.brand}</TableData>
                        <TableData>{product.countInStock}</TableData>
                        <TableData>{product.sold}</TableData>
                        <TableData>
                          <FlexBetweenRow>
                            <IconButton
                              onClick={() => handleUpdate(product.slug)}
                            >
                              <HiPencil />
                            </IconButton>
                            <IconButton
                              onClick={() => handleDelete(product._id)}
                            >
                              <MdDelete />
                            </IconButton>
                          </FlexBetweenRow>
                        </TableData>
                      </TableRow>
                    ))}
                </tbody>
              </StyledTable>
            </TableWrapper>
          )}
          {totalPages > 1 && (
            <div className="pagination-bar">
              <Button
                disabled={currentPage === 1}
                onClick={() => handleChangePage(currentPage - 1)}
              >
                <IoIosArrowBack />
              </Button>
              {totalPages &&
                totalPages > 0 &&
                Array.from({ length: totalPages }, (_, index) => index + 1).map(
                  (pageNumber) => (
                    <Button
                      key={pageNumber}
                      className={pageNumber === currentPage ? "active" : ""}
                      onClick={() => handleChangePage(pageNumber)}
                    >
                      {pageNumber}
                    </Button>
                  )
                )}
              <Button
                disabled={currentPage === totalPages}
                onClick={() => handleChangePage(currentPage + 1)}
              >
                <IoIosArrowForward />
              </Button>
            </div>
          )}
        </Section>
      </Content>
    </Fragment>
  );
};

export default AdminMainPage;
