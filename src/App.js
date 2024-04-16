import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './Pages/HomePage'
import UpdateShipment from './Components/ShipmentsTable/UpdateShipment'
import Header from './Components/Header/Header'
import './Assets/index.css'
import { ToastContainer } from 'react-toastify'
import ShipmentsPage from './Pages/ShipmentsPage'
import AddShipmentPage from './Pages/AddShipmentPage'

function App () {
  return (
    <div className='App'>
      <BrowserRouter>
        <div className='header'>
          <Header />{' '}
        </div>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/shipments' element={<ShipmentsPage />}></Route>
          <Route
            path='/shipments/add-shipment'
            element={<AddShipmentPage />}
          ></Route>
          <Route
            path='/shipments/edit/:orderNo'
            element={<UpdateShipment />}
          ></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer></ToastContainer>
    </div>
  )
}

export default App
