
import React, { useContext, useState } from 'react';
import { AdminContext } from '../../context/admin/AdminProvider';
import axios from 'axios';
import { USER_ACTION } from '../../context/admin/AdminReducer';

const Login = () => {
  const { user, dispatch } = useContext(AdminContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to update login user data
  const updateData = (event) => {
    switch (event.target.name) {
      case 'email':
        setEmail(event.target.value);
        break;
      case 'password':
        setPassword(event.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const currentUser = {
        email: email,
        password: password,
      };

      const { data } = await axios.post(
        process.env.REACT_APP_SERVER_URL + '/api/users/login',
        currentUser
      );

      dispatch({ type: USER_ACTION.USER_LOGIN, payload: data.details });
      localStorage.setItem('user', JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            name="email"
            value={email}
            onChange={updateData}
            placeholder="Email"
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={password}
            onChange={updateData}
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Login;