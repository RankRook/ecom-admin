import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Auth/Login';
import Resetpassword from './pages/Auth/Resetpassword';
import Forgotpassword from './pages/Auth/Forgotpassword';
import MainLayout from './components/MainLayout';
import Bloglist from './pages/Blog/Bloglist';
import Blogcatlist from './pages/Bcategory/Blogcatlist';
import Orders from './pages/Order/Orders';
import Customers from './pages/Customer/Customers';
import Categorylist from './pages/Category/Categorylist';
import Brandlist from './pages/Brand/Brandlist';
import Productlist from './pages/Product/Productlist';
import Addblog from './pages/Blog/Addblog';
import Addblogcat from './pages/Bcategory/Addblogcat';
import Addcat from './pages/Category/Addcat';
import Addbrand from './pages/Brand/Addbrand';
import Addproduct from './pages/Product/Addproduct';
import Enquiries from './pages/Enquiry/Enquiries';
import Couponlist from './pages/Coupon/Couponlist';
import Addcoupon from './pages/Coupon/Addcoupon';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<Resetpassword />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/admin" element={<MainLayout />} >
          <Route index element={<Dashboard />} />
          <Route path="blog" element={<Addblog />} />
          <Route path="blog-category" element={<Addblogcat />} />
          <Route path="blog-category/:id" element={<Addblogcat />} />
          <Route path="blog-list" element={<Bloglist />} />
          <Route path="blog-category-list" element={<Blogcatlist />} />
          <Route path="coupon-list" element={<Couponlist />} />
          <Route path="coupon" element={<Addcoupon />} />
          <Route path="coupon/:id" element={<Addcoupon />} />
          <Route path="order" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="category" element={<Addcat />} />
          <Route path="category/:id" element={<Addcat />} />
          <Route path="category-list" element={<Categorylist />} />
          <Route path="brand" element={<Addbrand />} />
          <Route path="brand/:id" element={<Addbrand />} />
          <Route path="brand-list" element={<Brandlist />} />
          <Route path="product-list" element={<Productlist />} />
          <Route path="product" element={<Addproduct />} />
          <Route path="enquiries" element={<Enquiries />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
