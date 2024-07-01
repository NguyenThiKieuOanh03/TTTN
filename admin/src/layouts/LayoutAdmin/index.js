import React from 'react'
import "./LayoutAdminStyle.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Outlet } from "react-router-dom";
import Menu from './Menu';
import { FaPowerOff, FaStore, FaUser } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LayoutAdmin = () => {


   return (
      <div>
         <section className="hdl-header sticky-top">
            <div className="container-fluid">
               <ul className="menutop">
                  <li>
                     <a href="">
                        <FaStore className="fa-brands fa-dashcube" /> Shop Điện Thoại
                     </a>
                  </li>
                  <li className="text-phai">
                     <a href="">
                        <FaPowerOff className="fa-solid fa-power-off" /> Thoát
                     </a>
                  </li>
                  <li className="text-phai">
                     <a href="">
                        <FaUser className="fa fa-user" /> Chào quản lý
                     </a>
                  </li>
               </ul>
            </div>
         </section>
         <section className="hdl-content">
            <ToastContainer
               position="top-right"
               autoClose={5000}
               hideProgressBar={false}
               newestOnTop={false}
               closeOnClick
               rtl={false}
               pauseOnFocusLoss
               draggable
               pauseOnHover
            />
            <div className="container-fluid">
               <div className="row">
                  <div className="col-md-2 bg-dark p-0 hdl-left">
                     <div className="hdl-left">
                        <div className="dashboard-name">
                           Bảng điều khiển
                        </div>
                        <nav className="m-2 mainmenu">
                           <Menu />
                        </nav>
                     </div>
                  </div>
                  <div className="col-md-10">
                     <div className="content">
                        <Outlet />
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </div>
   )
}

export default LayoutAdmin