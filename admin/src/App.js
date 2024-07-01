import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutAdmin from "./layouts/LayoutAdmin";
import AppRouter from "./router";
import React from 'react';
// import ReactDOM from 'react-dom';
// import { CartProvider } from './CartContext';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/admin" element={<LayoutAdmin />}>
        {AppRouter.RouteAdmin.map(function(route,index){
          const Page = route.component;
          return <Route key={index} path={route.path} element={<Page />} />
        })}
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;