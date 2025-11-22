// import React from 'react'
// import Login from './Page/Login'
// import ProtectedRoute from './Components/ProtectedRoute'
// import Dashboard from './Page/Dashboard'
// import Register from './Page/Register'
// import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Products from './Page/Products'
// import Customers from './Page/Customers'
// import Supliers from './Page/Supliers'
// import Invoices from './Page/Invoices'
// import SalesOrders from './Page/SalesOrders'
// import PurchaseOrders from './Page/PurchaseOrders'
// import GRN from './Page/GRN'
// import SalesReport from './Page/SalesReport'
// import PurchaseReport from './Page/PurchaseReport'
// import InventoryReport from './Page/InventoryReport'
// import UserManagement from './Page/UserManagement'

// function App() {
//   return (
//       <BrowserRouter>
//       <Routes>
//         <Route path="/login" element={<Login />}/>
//         <Route path="/register" element={<Register />}/>
//         <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
//         <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
//         <Route path="/customers" element={<ProtectedRoute><Customers /></ProtectedRoute>}/>
//         <Route path="/suppliers" element={<ProtectedRoute><Supliers /></ProtectedRoute>}/>
//         <Route path="/sales-orders" element={<ProtectedRoute><SalesOrders /></ProtectedRoute>}/>
//         <Route path="/purchase-orders" element={<ProtectedRoute><PurchaseOrders /></ProtectedRoute>} />
//         <Route path="/invoices" element={<ProtectedRoute><Invoices /></ProtectedRoute>} />
//         <Route path="/grn" element={<ProtectedRoute><GRN /></ProtectedRoute>} />
//         <Route path="/sales-report" element={<ProtectedRoute><SalesReport /></ProtectedRoute>} />
//         <Route path="/purchase-report" element={<ProtectedRoute><PurchaseReport /></ProtectedRoute>} />
//         <Route path="/inventory-report" element={<ProtectedRoute><InventoryReport /></ProtectedRoute>} />
//         <Route path="/user-management" element={<ProtectedRoute>< UserManagement /></ProtectedRoute>} />
        

//       </Routes>
//     </BrowserRouter>
//   )
// }

// export default App


import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./Components/ProtectedRoute";
import Layout from "./Components/Layout";

import Login from "./Page/Login";
import Register from "./Page/Register";

import Dashboard from "./Page/Dashboard";
import Products from "./Page/Products";
import Customers from "./Page/Customers";
import Suppliers from "./Page/Supliers";
import SalesOrders from "./Page/SalesOrders";
import PurchaseOrders from "./Page/PurchaseOrders";
import GRN from "./Page/GRN";
import Invoices from "./Page/Invoices";

import SalesReport from "./Page/SalesReport";
import PurchaseReport from "./Page/PurchaseReport";
import InventoryReport from "./Page/InventoryReport";
import UserManagement from "./Page/UserManagement";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected & Layout Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* Dashboard (default) */}
          <Route index element={<Dashboard />} />

          {/* Normal Pages */}
          <Route path="products" element={<Products />} />
          <Route path="customers" element={<Customers />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="sales-orders" element={<SalesOrders />} />
          <Route path="purchase-orders" element={<PurchaseOrders />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="grn" element={<GRN />} />

          {/* Reports */}
          <Route path="sales-report" element={<SalesReport />} />
          <Route path="purchase-report" element={<PurchaseReport />} />
          <Route path="inventory-report" element={<InventoryReport />} />

          {/* Admin */}
          <Route path="user-management" element={<UserManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
