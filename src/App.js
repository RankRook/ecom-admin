import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Resetpassword from './pages/Resetpassword';
import Forgotpassword from './pages/Forgotpassword';
import MainLayout from './components/MainLayout';
import Bloglist from './pages/Bloglist';
import Blogcatlist from './pages/Blogcatlist';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Categorylist from './pages/Categorylist';
import Brandlist from './pages/Brandlist';
import Productlist from './pages/Productlist';
import Addblog from './pages/Addblog';
import Addblogcat from './pages/Addblogcat';
import Addcat from './pages/Addcat';
import Addbrand from './pages/Addbrand';


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
          <Route path="blog-list" element={<Bloglist />} />
          <Route path="blog-category-list" element={<Blogcatlist />} />
          <Route path="order" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="category" element={<Addcat />} />
          <Route path="category-list" element={<Categorylist />} />
          <Route path="brand" element={<Addbrand />} />
          <Route path="brand-list" element={<Brandlist />} />
          <Route path="product-list" element={<Productlist />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
