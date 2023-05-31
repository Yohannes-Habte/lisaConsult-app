import React, { useEffect, useState } from 'react';
import './DataTable.scss';
import { NavLink, useLocation } from 'react-router-dom';
import axios from 'axios';

const ProductsTable = () => {
  // Use location hook to specify the id of a product
  const location = useLocation();
  const path = location.pathname.split('/'[1]);

  // State variables for fetching array data
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // useEffect to display products
  useEffect(() => {
    const fetchingData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_SERVER_URL + `/api/products`
        );
        setData(data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };

    fetchingData();
  }, []);

  // Delete a product from database
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
        <h3 className="add-title">Add New Product </h3>
        <NavLink to={'/products/new'} className={'link'}>
          Add New
        </NavLink>
      </article>

      <table className="users-table">
        <thead className="table-head">
          <tr className="table-head-row">
            <th className="head-cell"> ID </th>
            <th className="head-cell"> Name </th>
            <th className="head-cell"> Category </th>
            <th className="head-cell"> Brand </th>
            <th className="head-cell"> Action </th>
          </tr>
        </thead>

        <tbody className="table-body">
          {data.map((product) => {
            return (
              <tr key={product._id} className="table-body-row">
                <td className="body-cell"> {product._id} </td>
                <td className="body-cell-image">
                  <div className="image-wrapper">
                    <img
                      src={
                        product.image ||
                        'https://i.ibb.co/MBtjqXQ/no-avatar.gif'
                      }
                      alt={product.name}
                      className="image"
                    />
                    <p className="name">{product.name}</p>
                  </div>
                </td>
                <td className="body-cell-email"> {product.category} </td>
                <td className="body-cell-age"> {product.brand} </td>
                <td className="body-cell-action">
                  <div className="action-wrapper">
                    <NavLink to={'/users/userId'} className={'link'}>
                      View
                    </NavLink>
                    <button
                      onClick={() => handleDelete(product._id)}
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

export default ProductsTable;
