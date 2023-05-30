import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Home from './views/homePage/Home';
import Login from './views/loginPage/Login';
import List from './views/listPage/List';
import Single from './views/singlePage/Single';
import New from './views/newPage/New';
import { productInputs, userInputs } from './data/DataFormSource';
import { BackgroundContext } from './context/background/BgProvider';
import './styles/BgColor.scss';
import { AdminContext } from './context/admin/AdminProvider';

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
                    <List />
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
                    <New inputs={userInputs} title="Add New User" />
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
                    <List />
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
                    <New inputs={productInputs} title="Add New Product" />
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
