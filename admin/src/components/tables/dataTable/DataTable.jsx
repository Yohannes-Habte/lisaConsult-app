import React, { useState } from 'react';
import './DataTable.scss';
import { userRows } from '../../../data/dataTableSource';
import { NavLink } from 'react-router-dom';

const DataTable = () => {
  const [data, setData] = useState(userRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
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
            <th className="head-cell"> Age </th>
            <th className="head-cell"> Status </th>
            <th className="head-cell"> Action </th>
          </tr>
        </thead>

        <tbody className="table-body">
          {data.map((item) => {
            return (
              <tr key={item.id} className="table-body-row">
                <td className="body-cell"> {item.id} </td>
                <td className="body-cell-image">
                  <div className="image-wrapper">
                    <img src={item.img} alt={item.username} className="image" />
                    <p className="name"> {item.username}</p>
                  </div>
                </td>
                <td className="body-cell-email"> {item.email} </td>
                <td className="body-cell-age"> {item.age} </td>
                <td className={`body-cell-status ${item.status}`}>
                  {item.status}
                </td>
                <td className="body-cell-action">
                  <div className="action-wrapper">
                    <NavLink to={"/users/userId"} className={'link'}> View </NavLink>
                    <button onClick={() => handleDelete(item.id)} className="button">
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
