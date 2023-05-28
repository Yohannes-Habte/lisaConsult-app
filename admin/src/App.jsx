import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/homePage/Home';
import Login from './views/loginPage/Login';
import List from './views/listPage/List';
import Single from './views/singlePage/Single';
import New from './views/newPage/New';
import { productInputs, userInputs } from './data/DataFormSource';
import { BackgroundContext } from './context/background/BgProvider';
import "./styles/BgColor.scss";

const App = () => {
  // Global variable
  const {darkMode} = useContext(BackgroundContext);
  return (
    <div className={darkMode? "app dark" : "app"}>
      <Router>
        <Routes>
          {/* Nested Routes */}
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />

            {/* User Route has further nexted route */}
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route path="new" element={<New inputs= {userInputs} title="Add New User" />} />
            </Route>

            {/* Product Route has further nexted route */}
            <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route path="new" element={<New inputs= {productInputs} title="Add New Product"  />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
