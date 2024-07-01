import { useEffect, useState } from "react";
import OrderService from "../../../services/OrderService";
import LoadingSpinner from "../../../LoadingSpinner";
import { FaEye, FaRegEdit, FaToggleOff, FaToggleOn, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
const OrderIndex = () => {

   const [orders, setOrders] = useState([]);
   const [load, setLoad] = useState(false);
   const [reload, setReload] = useState(0);

   useEffect(() => {
      (async () => {
         setLoad(true);
         const result = await OrderService.index();
         setOrders(result.orders);
         setLoad(false);
      })();
   }, [reload]);


   const handDelete = (id) => {
      (async () => {
         const result = await OrderService.destroy(id);
         setReload(result.order.id)
      })();
   };
   const handleStatus = (id) => {
      (async () => {
         const result = await OrderService.status(id);
         setReload(Date.now);

      })();
   };




   return (
      <div className="content">
         <section className="content-header my-2">
            <h1 className="d-inline">Quản lý đơn hàng</h1>
         </section>
         <section className="content-body my-2">
            {load ? <LoadingSpinner /> : ""}

            <table className="table table-bordered">
               <thead>
                  <tr>
                     <th className="text-center" style={{ width: "30px" }}>
                        <input type="checkbox" id="checkboxAll" />
                     </th>
                     <th>Họ tên khách hàng</th>
                     <th>Điện thoại</th>
                     <th>Email</th>
                     <th>Ngày đặt hàng</th>
                     <th className="text-center" style={{ width: "30px" }}>ID</th>
                  </tr>
               </thead>
               <tbody>
                  {orders && orders.map((order, index) => {
                     return (
                        <tr className="datarow">
                           <td>
                              <input type="checkbox" id="checkId" />
                           </td>
                           <td>
                              <div className="name">
                                 <a href="order_show.html">
                                    {order.delivery_name}
                                 </a>
                              </div>
                              <div className="function_style">
                                 <button onClick={() => handleStatus(order.id)}
                                    className={
                                       order.status === 1
                                          ? "border-0 px-1 text-success"
                                          : "border-0 px-1 text-danger"

                                    }>
                                    {order.status === 1 ? <FaToggleOn /> : <FaToggleOff />}
                                 </button>

                                 <Link to={"/admin/order/edit/" + order.id} className="px-1 text-primary">
                                    <FaRegEdit />
                                 </Link>
                                 <Link to={"/admin/order/show/" + order.id} className="px-1 text-info">
                                    <FaEye />
                                 </Link>
                                 <button onClick={() => handDelete(order.id)}
                                    className="border-0 px-1 text-danger">
                                    <FaTrashAlt />
                                 </button>
                              </div>

                           </td>
                           <td>{order.delivery_phone}</td>
                           <td>{order.delivery_email}</td>
                           <td>{order.created_at}</td>
                           <td className="text-center">{order.id}</td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>

         </section>
      </div>

   );
}

export default OrderIndex;