import React from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import About from './views/procedurePage/Procedure';
import Contact from './views/contactPage/Contact';
import Home from './views/homePage/Home';
import Research from './views/researchPage/Research';
import Courses from './views/coursesPage/Courses';
import Register from './views/registerPage/Register';
import Login from './views/loginPage/Login';
import StripeSuccess from './views/stripe/StripeSuccess';
import StripeCancel from './views/stripe/StripeCancel';
import Footer from './components/footer/Footer';
import Products from './views/productPage/Products';
import SingleProduct from './views/singleProductPage/SingleProduct';
import Cart from './views/cartPage/Cart';
//? toast-step-1: import "ToastContainer" and 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Shipping from './views/shippingPage/Shipping';
import Payment from './views/paymentPage/Payment';
import Placeorder from './views/placeorderPage/Placeorder';
import ProductOrdered from './views/productOrderPage/ProductOrdered';
import Profile from './views/profilePage/Profile';
import OrderHistory from './views/orderHistoryPage/OrderHistory';
import CourseRegistration from './views/courseRegistrationPage/CourseRegistration';
import StudentAddress from './views/studentAddressPage/StudentAddress';
import CoursePayment from './views/coursePaymentPage/CoursePayment';
import CoursePlaceOrder from './views/coursePlaceOrder/CoursePlaceOrder';
import StripePayment from './views/courseStripePayment/StripePayment';

export const myContext = React.createContext();

const App = () => {
  return (
    <div>
      <Router>
        {/* //? toast-step-2: state the postion and limit it to one */}
        <ToastContainer position="bottom-center" limit={1} />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/procedures" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course" element={<CourseRegistration />} />
          <Route path="/studentAddress" element={<StudentAddress />} />
          <Route path="/coursPayment" element={<CoursePayment />} />
          <Route path="/coursePlaceOrder" element={<CoursePlaceOrder />} />
          <Route path="/stripePayment" element={<StripePayment />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="/research" element={<Research />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/placeorder" element={<Placeorder />} />
          <Route path="/productOrders/:id" element={<ProductOrdered />} />
          <Route path="/orderHistory" element={<OrderHistory />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/stripe-success" element={<StripeSuccess />} />
          <Route path="/stripe-cancel" element={<StripeCancel />} />
          <Route path="*" element={<Navigate to={'/'} />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
