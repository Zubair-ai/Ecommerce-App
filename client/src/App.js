
import './App.css';
import {Routes,Route} from 'react-router-dom'
import Home from './secreens/Home';
import Contact from './secreens/Contact';
import About from './secreens/About';
import Policy from './secreens/Policy';
import NotFound from './secreens/NotFound';
import Signin from "./secreens/Auth/Signin";
import Login from "./secreens/Auth/Login"
import Dashborad from './secreens/user/Dashborad';
import {PrivateRoute} from "./components/routes/PrivateRoute";
import ForgetPassword from "./secreens/Auth/ForgetPassword"
import AdminDashborad from './secreens/Admin/AdminDashborad';
import { AdminPrivateRoute } from './components/routes/Admin';
import CreateCategory from './secreens/Admin/CreateCategory';
import CreateProduct from './secreens/Admin/CreateProduct';
import Users from './secreens/Admin/Users';
import Profile from './secreens/user/Profile';
import Orders from './secreens/user/Orders';
import Products from './secreens/Admin/Products';
import SingleProduct from "./secreens/Admin/SingleProduct";
import SearchedProduct from './secreens/SearchedProduct';
import MoreDetail from './secreens/MoreDetail';
import SlectedCategory from './secreens/SlectedCategory';
import FullCategories from './secreens/FullCategories';
import CartPage from './secreens/CartPage';
import AdminOrders from './secreens/Admin/AdminOrders';



function App() {
  return (
    <Routes>
     <Route path='/' element={<Home/>}/>
     {/* to protect the userroute this nested route technique */}
     <Route path={"/dashboard"} element={<PrivateRoute/>}>
        <Route path='user' element={<Dashborad/>}/>
        <Route path='user/profile' element={<Profile/>}/>
        <Route path='user/orders' element={<Orders/>}/>
     </Route>
     {/* to protect the admin route */}
      <Route path='/dashboard' element={<AdminPrivateRoute/>}>
        <Route path='admin' element={<AdminDashborad/>}/>
        <Route path='admin/createcategory' element={<CreateCategory/>}/>
        <Route path='admin/createproduct' element={<CreateProduct/>}/>
        <Route path='admin/products' element={<Products/>}/>
        <Route path='admin/adminorders' element={<AdminOrders/>}/>
        <Route path='/dashboard/admin/products/:slug' element={<SingleProduct/>}/>
        <Route path='admin/users' element={<Users/>}/>
      </Route>

     <Route path='/contact' element={<Contact/>}/>
     <Route path='/cartpage' element={<CartPage/>}/>
     <Route path='/fullcategories' element={<FullCategories/>}/>
     <Route path='/selectedcategory/:slug' element={<SlectedCategory/>}/>
     <Route path='/moredetail/:slug' element={<MoreDetail/>}/>
     <Route path='/search' element={<SearchedProduct/>}/>
     <Route path='/signin' element={<Signin/>}/>
     <Route path='/forgetpassword' element={<ForgetPassword/>}/>
     <Route path='/login' element={<Login/>}/>
     <Route path='/about' element={<About/>}/>
     <Route path='/dashborad' element={<Dashborad/>}/>
     <Route path='/policy' element={<Policy/>}/>
     <Route path='*' element={<NotFound/>}/>
    </Routes>
  );
}

export default App;
