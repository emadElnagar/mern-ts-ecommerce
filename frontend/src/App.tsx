import { Fragment } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/user/login";
import RegisterPage from "./pages/user/register";
import ProfilePage from "./pages/user/Profile";
import AdminMainPage from "./pages/admin";
import { useSelector } from "react-redux";
import AllUsers from "./pages/admin/Users";
import CategoriesPage from "./pages/admin/Categories";
import ProfileSettings from "./pages/user/ProfileSettings";
import NewProductPage from "./pages/admin/NewProduct";
import AllProducts from "./pages/product/AllProducts";
import SingleProduct from "./pages/product/SingleProduct";
import UpdatePage from "./pages/admin/UpdateProduct";
import SearchProductsPage from "./pages/product/searchProducts";
import Cart from "./pages/cart/Cart";
import CheckOut from "./pages/order/CheckOut";
import WishlistPage from "./pages/cart/Wishlist";
import OrdersPage from "./pages/admin/Orders";
import SingleOrder from "./pages/admin/SingleOrder";
import AdminLayout from "./layouts/AdminLayout";
import BestSellingPage from "./pages/product/BestSelling";

function AppContent() {
  const { user } = useSelector((state: any) => state.user);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/login" element={<LoginPage />} />
        <Route path="/users/register" element={<RegisterPage />} />
        <Route path="/users/profile/:id" element={<ProfilePage />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/products/:slug" element={<SingleProduct />} />
        <Route path="/search/:keyword" element={<SearchProductsPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/bestselling" element={<BestSellingPage />} />
        {user !== null && (
          <Route path="/users/profile/settings" element={<ProfileSettings />} />
        )}
        {user !== null && user.role === "admin" && (
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminMainPage />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="users/all" element={<AllUsers />} />
            <Route path="products/new" element={<NewProductPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="orders/:id" element={<SingleOrder />} />
            <Route path="products/update/:slug" element={<UpdatePage />} />
          </Route>
        )}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div
        className="App"
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <AppContent />
      </div>
    </BrowserRouter>
  );
}

export default App;
