import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './views/loginPage/Login';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/">
          <Route path="login" element={<Login />} />

          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App;