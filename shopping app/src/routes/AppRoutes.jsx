import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from '../component/navbarComponents/Navbar';
import Footer from '../component/otherComponents/Footer';
import ScrollToTop from '../component/otherComponents/ScrollToTop';

import Home from '../component/navbarComponents/Home';
import Categories from '../component/navbarComponents/Categories';
import About from '../component/navbarComponents/About';
import Wishlist from '../component/navbarComponents/Wishlist';
import Cart from '../component/navbarComponents/Cart';
import LoginPage from '../component/navbarComponents/LoginPage';
import Product from '../component/productComponents/Product';
import AdminPage from '../component/admin/AdminPage';
import MyProfile from '../component/navbarComponents/MyProfile';
import ProductList from '../component/productComponents/ProductList';
import Orders from '../component/navbarComponents/Orders';
import OrderPlace from '../component/paymentComponents/OrderPlace';
import Verify from '../component/paymentComponents/Verify';

const Layout = () => (
  <>
    <ScrollToTop />
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="categories" element={<Categories />} />
      <Route path="wishlist" element={<Wishlist />} />
      <Route path="cart" element={<Cart />} />
      <Route path="orderPlace" element={<OrderPlace />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="myProfile/*" element={<MyProfile />} />
      <Route path="orders" element={<Orders />} />
      <Route path="verify" element={<Verify />} />
      <Route path="search" element={<ProductList />} />
      <Route path="product/:id" element={<Product />} />
    </Route>
    <Route path="/admin/*" element={<AdminPage />} />
  </Routes>
);

export default AppRoutes;
