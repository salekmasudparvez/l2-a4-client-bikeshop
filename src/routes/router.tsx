import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Home } from "../pages/home/Home";
import AllProducts from "../pages/allProducts/AllProducts";
import AboutUs from "../pages/aboutus/AboutUs";
import Login from "../pages/logIn/Login";
import Registration from "../pages/registration/Registration"
import { ProductDetails } from "../pages/productDetails/ProductDetails";
import DashboardLayout from "../components/layout/DashboardLayout";
import Forbidden from "../pages/error/Forbidden";
import ProtectedRoute from "./ProtectedRoute";
import { UserManagement } from "../pages/dashboard/admin/UserManagement";
import AddProduct from "../pages/dashboard/admin/AddProduct";
import { Orders } from "../pages/dashboard/customer/Orders";
import { Profile } from "../pages/dashboard/customer/Profile";
import { ProductManagement } from "../pages/dashboard/admin/ProductManagement";
import  EditProduct  from "../pages/dashboard/admin/EditProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", index: true, element: <Home></Home> },
      { path: "all-products", element: <AllProducts></AllProducts> },
      { path: "product/:id", element: <ProductDetails></ProductDetails> },
      { path: "about-us", element: <AboutUs></AboutUs> },
    ]
  },
  {
    path: "/dashboard/admin",
    element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <ProtectedRoute> <UserManagement /></ProtectedRoute>},
      { path: "product/add", element: <ProtectedRoute><AddProduct /></ProtectedRoute> },
      {path: "products", element: <ProtectedRoute><ProductManagement/></ProtectedRoute>},
      {path: "product/edit/:id", element: <ProtectedRoute><EditProduct/></ProtectedRoute>},

    ]
  },
  {
    path: "/dashboard/customer",
    element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <ProtectedRoute> <Orders /></ProtectedRoute>},
      { path: "profile", element: <ProtectedRoute><Profile /></ProtectedRoute> },

    ]
  },
  { path: '/403', element: <Forbidden /> }
  ,
  { path: "/signup", element: <Registration /> },
  { path: "/login", element: <Login /> },
]);
