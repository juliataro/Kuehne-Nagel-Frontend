
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Component/Home";
import ShipmentListing from "./Component/ShipmentTable/ShipmentListing";
import UpdateShipment from "./Component/ShipmentTable/UpdateShipment";
import Header from "./Component/Header";
import './Assets/index.css';





function App() {
  return (

    <div className="App">
      <BrowserRouter>
      <div className='header'>
        <Header />
        
      </div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/shipment" element={<ShipmentListing />}></Route>
          <Route path="/shipment/add" element={<UpdateShipment />}></Route>
          <Route path="/shipment/edit/:orderNo" element={<UpdateShipment />}></Route>
        </Routes>
      </BrowserRouter>
    
    </div>

  );
}

export default App;
