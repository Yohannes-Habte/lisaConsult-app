import React, { useState } from 'react';
import './DataTable.scss';
import { userRows } from '../../../data/dataTableSource';
import { NavLink } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

const DataTable = () => {
  // Global state variables
  const { data, loading, error, reFetching } = useFetch(
    process.env.REACT_APP_SERVER_URL + '/api/users'
  );

  const handleDelete = (id) => {
    // setData(data.filter((item) => item.id !== id));
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
            <th className="head-cell"> User </th>
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
                      src={user.image}
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
                      onClick={() => handleDelete(user.id)}
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

export default DataTable;
