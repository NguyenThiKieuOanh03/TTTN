import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutSite from "./layouts/LayoutSite";
import AppRouter from "./router";
import React from 'react';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LayoutSite />}>
        {AppRouter.RouteSite.map(function(route,index){
          const Page = route.component;
          return <Route key={index} path={route.path} element={<Page />} />
        })}
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;