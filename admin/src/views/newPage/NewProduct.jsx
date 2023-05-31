import React, { useState } from 'react';
import './New.scss';
import { FaCloudUploadAlt } from 'react-icons/fa';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { productInputs } from '../../data/DataFormSource';
import axios from 'axios';

const NewProduct = () => {
  const [file, setFile] = useState('');
  const [productInfo, setProductInfo] = useState({});

  // Handle change fuction
  const handleChange = (e) => {
    setProductInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Sumbit Product
  const submitProduct = async (e) => {
    e.preventDefault();

    // Upload Image from the form data
    const data = new FormData();
    data.append('file', file);
    // upload preset
    data.append('upload_preset', 'upload');

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dzlsa51a9/image/upload`,
        data
      );
      const { url } = response.data;

      // New Product
      const newProduct = {
        name: productInfo.name,
        image: url,
        category: productInfo.category,
        brand: productInfo.brand,
        price: productInfo.price,
        countInStock: productInfo.countInStock,
        rating: productInfo.rating,
        description: productInfo.description,
      };

      // Send the new Product to the backend
      await axios.post(
        process.env.REACT_APP_SERVER_URL + '/api/products/createProduct',
        newProduct   );
    } catch (error) {}
  };

  return (
    <main className="new-page">
      <Sidebar />
      <section className="new-page-container">
        <Navbar />
        <article className="add-user-container">
          <h3 className="title"> Add New Products </h3>
        </article>
        <div className="form-container">
          <figure className="left-cotainer">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : 'https://icon-library.com/images/no-image-icon//no-image-icon-0.jpg'
              }
              alt=""
              className="image"
            />
          </figure>
          <div className="right-cotainer">
            <form onSubmit={submitProduct} action="" className="form">
              <div className="file-input-container">
                <input
                  type="file"
                  name="file"
                  id="file"
                  // upload only one image
                  onChange={(e) => setFile(e.target.files[0])}
                  className="file-field"
                />

                <label htmlFor="file" className="file-label">
                  Image: <FaCloudUploadAlt className="icon" />{' '}
                </label>
              </div>

              {productInputs.map((input) => {
                return (
                  <div key={input.id} className="input-container">
                    <input
                      type={input.type}
                      name={input.name}
                      id={input.id}
                      onChange={handleChange}
                      placeholder={input.placeholder}
                      className="input-field"
                    />
                    <label htmlFor="" className="input-label">
                      {input.label}
                    </label>
                    <span className="input-highlight"></span>
                  </div>
                );
              })}

              <div className="btn-container">
                <button className="btn">Send</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NewProduct;
