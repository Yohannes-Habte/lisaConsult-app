import React from 'react'
import "./Single.scss"
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Chart from '../../components/charts/chart/Chart';
import TableReact from '../../components/tables/table/Table';

const Single = () => {
  return  (
      <main className="single-page">
        <Sidebar />
  
        <div className="single-page-contianer">
          <Navbar />
  
          <div className="top">
            <article className="left">
              <button className='edit-button'>Edit</button>
              <h1 className="title">Information</h1>
              <div className="item">
                <img
                  src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
                  alt=""
                  className="item-image"
                />
  
                <section className='details'>
                  <h2 className='detail-title'> Jane Doe </h2> 
                  <div className='detail-info'>
                    <span> Email: </span>
                    <span>jane@gmail.com</span>
                  </div>
  
                  <div className='detail-info'>
                    <span> Phone: </span>
                    <span> +2298298272 </span>
                  </div>
  
                  <div className='detail-info'>
                    <span> Adddress: </span>
                    <span> RabStr. 2, 35 New York </span>
                  </div>
  
                  <div className='detail-info'>
                    <span> Country: </span>
                    <span> USA </span>
                  </div>
                </section>
              </div>
            </article>
            <div className="right">
              <Chart />
            </div>
          </div>
  
          <div className="bottom">
            <TableReact />
          </div>
        </div>
      </main>
    );
  
}

export default Single