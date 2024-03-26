import React from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Contact from './views/contactPage/ContactPage';
import Research from './views/researchPage/ResearchPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserRegister from './views/userPages/registerPage/UserRegister';
import UserLogin from './views/userPages/loginPage/UserLogin';
import About from './views/aboutPage/AboutPage';
import CoursesPage from './views/coursesPage/CoursesPage';
import HomePage from './views/homePage/HomePage';
import ProductsPage from './views/productsPages/productsPage/ProductsPage';
import FAQsPage from './views/faqPage/FAQsPage';

export const myContext = React.createContext();

const App = () => {
  return (
    <div>
      <Router>
        {/* //? toast-step-2: state the postion and limit it to one */}
        <ToastContainer position="bottom-center" limit={1} />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/research" element={<Research />} />
          <Route path="/faqs" element={<FAQsPage />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* User Pages */}
          <Route path="/register" element={<UserRegister />} />
          <Route path="/login" element={<UserLogin />} />

          {/* Not Found Page */}
          <Route path="*" element={<Navigate to={'/'} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
