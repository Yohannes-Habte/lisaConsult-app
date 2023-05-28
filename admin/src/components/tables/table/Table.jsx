import React from 'react';
import './Table.scss';

const TableReact = () => {
  const rows = [
    {
      id: 1143155,
      product: 'Acer Nitro 5',
      img: 'https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg',
      customer: 'John Smith',
      date: '1 March',
      amount: 785,
      method: 'Cash on Delivery',
      status: 'Approved',
    },
    {
      id: 2235235,
      product: 'Playstation 5',
      img: 'https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg',
      customer: 'Michael Doe',
      date: '1 March',
      amount: 900,
      method: 'Online Payment',
      status: 'Pending',
    },
    {
      id: 2342353,
      product: 'Redragon S101',
      img: 'https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg',
      customer: 'John Smith',
      date: '1 March',
      amount: 35,
      method: 'Cash on Delivery',
      status: 'Pending',
    },
    {
      id: 2357741,
      product: 'Razer Blade 15',
      img: 'https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg',
      customer: 'Jane Smith',
      date: '1 March',
      amount: 920,
      method: 'Online',
      status: 'Approved',
    },
    {
      id: 2342355,
      product: 'ASUS ROG Strix',
      img: 'https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg',
      customer: 'Harold Carol',
      date: '1 March',
      amount: 2000,
      method: 'Online',
      status: 'Pending',
    },
  ];

  return (
    <section className="table-container">
      <h4 className="table-title">2022 Transactions</h4>
      <table className="table">
        <thead className="table-header">
          <tr className="header-row">
            <td className="table-cell"> Tracking ID </td>
            <td className="table-cell"> Product </td>
            <td className="table-cell"> Customer </td>
            <td className="table-cell"> Date </td>
            <td className="table-cell"> Amount </td>
            <td className="table-cell"> Payment </td>
            <td className="table-cell"> Status </td>
          </tr>
        </thead>
        <tbody className="table-body">
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="cell-content">{row.id}</td>
              <td className="cell-content">
                <div className="cell-wrapper">
                  <img
                    src={row.img}
                    alt={row.product}
                    className="product-image"
                  />
                  {row.product}
                </div>
              </td>
              <td className="cell-content">{row.customer}</td>
              <td className="cell-content">{row.date}</td>
              <td className="cell-content">${row.amount}</td>
              <td className="cell-content">{row.method}</td>
              <td className="cell-content">
                <span className={`status ${row.status}`}> {row.status} </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default TableReact;
