import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Home from './views/homePage/Home';
import Login from './views/loginPage/Login';
import Single from './views/singlePage/Single';
import { productInputs, userInputs } from './data/DataFormSource';
import { BackgroundContext } from './context/background/BgProvider';
import './styles/BgColor.scss';
import { AdminContext } from './context/admin/AdminProvider';
import UserList from './views/listPage/UserList';
import ProductList from './views/listPage/ProductList';
import CourseList from './views/listPage/CourseList';
import NewCourse from './views/newPage/NewCourse';
import NewProduct from './views/newPage/NewProduct';
import NewUser from './views/newPage/NewUser';

const App = () => {
  // Global variable
  const { darkMode } = useContext(BackgroundContext);
  const { user } = useContext(AdminContext);

  // Route Protection function from accessing non-admin users
  // How to protect route or routes
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to={'/login'} />;
    }
    return children;
  };

  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <Router>
        <Routes>
          {/* Nested Routes */}
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            {/* Admin Route has further nexted route */}
            <Route path="users">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <UserList />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":userId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewUser />
                  </ProtectedRoute>
                }
              />
            </Route>

             {/* Product Route has further nexted route */}
             <Route path="products">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <ProductList />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":productId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewProduct />
                  </ProtectedRoute>
                }
              />
            </Route>

             {/* Courses Route has further nexted route */}
            <Route path="courses">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <CourseList />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":courseId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewCourse />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
