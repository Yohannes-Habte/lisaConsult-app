import React from 'react'
import "./List.scss"
import DataTable from '../../components/tables/dataTable/DataTable'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'

const List = () => {
  return (
    <main className="list-page">
      <Sidebar />

      <div className="list-container">
        <Navbar />
        <DataTable />
      </div>
    </main>
  )
}

export default List