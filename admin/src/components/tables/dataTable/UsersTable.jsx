import React, { useEffect, useState } from 'react';
import './DataTable.scss';
import { NavLink, useLocation } from 'react-router-dom';
import axios from 'axios';

const UsersTable = () => {
  // Use location hook to specify the id of the user
  const location = useLocation();
  const path = location.pathname.split('/'[1]);
  console.log(path);
  // State variables for fetching array data
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // useEffect to display users details
  useEffect(() => {
    const fetchingData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_SERVER_URL + `/api/users`
        );
        setData(data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };

    fetchingData();
  }, []);

  // Delete a user from database
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        process.env.REACT_APP_SERVER_URL + `/api${path}/${id}`
      );
      setData(data.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="users-data-table">
      <article className="add-user">
        <h3 className="add-title">Add New User</h3>
        <NavLink to={'/users/new'} className={'link'}>
          Add New
        </NavLink>
      </article>

      <table className="users-table">
        <thead className="table-head">
          <tr className="table-head-row">
            <th className="head-cell"> ID </th>
            <th className="head-cell"> Product </th>
            <th className="head-cell"> Email </th>
            <th className="head-cell"> Phone </th>
            <th className="head-cell"> Address </th>
            <th className="head-cell"> Country </th>
            <th className="head-cell"> Action </th>
          </tr>
        </thead>

        <tbody className="table-body">
          {data.map((user) => {
            return (
              <tr key={user._id} className="table-body-row">
                <td className="body-cell"> {user._id} </td>
                <td className="body-cell-image">
                  <div className="image-wrapper">
                    <img
                      src={
                        user.image || 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'
                      }
                      alt={user.firstName}
                      className="image"
                    />
                    <p className="name">
                      {user.firstName} {user.lastName}
                    </p>
                  </div>
                </td>
                <td className="body-cell-email"> {user.email} </td>
                <td className="body-cell-age"> {user.phone} </td>
                <td className="body-cell-age"> {user.address} </td>
                <td className="body-cell-age"> {user.country} </td>
                <td className="body-cell-action">
                  <div className="action-wrapper">
                    <NavLink to={'/users/userId'} className={'link'}>
                      View
                    </NavLink>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="button"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
