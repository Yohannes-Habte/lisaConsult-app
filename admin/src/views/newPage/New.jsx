import React, { useState } from 'react';
import './New.scss';
import { FaCloudUploadAlt } from 'react-icons/fa';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';

const New = ({ inputs, title }) => {
  const [file, setFile] = useState('');
  console.log(file);

  return (
    <main className="new-page">
      <Sidebar />
      <section className="new-page-container">
        <Navbar />
        <article className="add-user-container">
          <h3 className="title"> {title} </h3>
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
            <form action="" className="form">
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

              {inputs.map((input) => {
                return (
                  <div key={input.id} className="input-container">
                    <input
                      type={input.type}
                      id={input.id}
                      placeholder={input.placeholder}
                      className="input-field"
                    />
                    <label htmlFor="" className="input-label">
                      {input.label}
                    </label>
                    <span class="input-highlight"></span>
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

export default New;
