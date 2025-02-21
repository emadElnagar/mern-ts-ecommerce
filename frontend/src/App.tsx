import { Fragment } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App() {
  const { user } = useSelector((state: any) => state.user);
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <NavBar />
        </header>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/login" element={<LoginPage />} />
        <Route path="/users/register" element={<RegisterPage />} />
        <Route path="/users/profile/:id" element={<ProfilePage />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/products/:slug" element={<SingleProduct />} />
        <Route path="/products/search" element={<SearchProductsPage />} />
        {user !== null && (
          <Route path="/users/profile/settings" element={<ProfileSettings />} />
        )}
        {user !== null && user.role === "admin" && (
          <Fragment>
            <Route path="/admin" element={<AdminMainPage />} />
            <Route path="/admin/categories" element={<CategoriesPage />} />
            <Route path="/admin/users/all" element={<AllUsers />} />
            <Route path="/admin/products/new" element={<NewProductPage />} />
            <Route
              path="/admin/products/update/:slug"
              element={<UpdatePage />}
            />
          </Fragment>
        )}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
