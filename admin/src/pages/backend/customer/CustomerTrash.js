import { FaTrashAlt, FaUndo } from "react-icons/fa";
import { useEffect, useState } from "react";
import CustomerService from "../../../services/CustomerService";
import { Link } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";

const CustomerTrash = () => {

   const [customers, setCustomers] = useState([]);
   const [load, setLoad] = useState(true);
   const [reload, setReLoad] = useState(0);

   useEffect(() => {
      (async () => {
         setLoad(false);
         const result = await CustomerService.trash();
         setCustomers(result.customers);
         setLoad(true);
      })();
   }, [reload]);
   const handDelete = (id) => {
      (async () => {
         const result = await CustomerService.destroy(id);
         alert(result.message);
         setReLoad(Date.now)
      })();
   };
   const handRestore = (id) => {
      (async () => {
         const result = await CustomerService.restore(id);
         alert(result.message);
         setReLoad(result.customer.id)
      })();
   };



   return (
      <div className="content">
         <section className="content-header my-2">
            <h1 className="d-inline">Thùng rác khách hàng</h1>
            <div className="text-end">
               <Link to={"/admin/customer/index"} className="btn btn-sm btn-success">
                  <IoArrowBackSharp className="fa fa-arrow-left" /> Về danh sách
               </Link>
            </div>

         </section>
         <section className="content-body my-2">

            <table className="table table-bordered">
               <thead>
                  <tr>
                     <th className="text-center" style={{ width: "30px" }}>
                        <input type="checkbox" id="checkboxAll" />
                     </th>
                     <th>Họ tên</th>
                     <th>Điện thoại</th>
                     <th>Email</th>
                     <th className="text-center" style={{ width: "130px" }}>ID</th>
                  </tr>
               </thead>
               <tbody>
                  {customers && customers.length > 0 && customers.map((customer, index) => {
                     return (

                        <tr className="datarow">
                           <td>
                              <input type="checkbox" id="checkId" />
                           </td>

                           <td>
                              <div className="name">
                                 <a href="customer_edit.html">
                                    {customer.name}
                                 </a>
                              </div>
                              <div className="function_style">
                                 <button onClick={() => handRestore(customer.id)} className="border-0 fa fa-undo text-primary mx-1" >
                                    <FaUndo />
                                 </button>

                                 <button onClick={() => handDelete(customer.id)} className="border-0 fa fa-trash text-danger mx-1" >
                                    <FaTrashAlt />
                                 </button>

                              </div>

                           </td>
                           <td>{customer.phone}</td>
                           <td>{customer.email}</td>
                           <td className="text-center">{customer.id}</td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>

         </section>
      </div>

   );
}

export default CustomerTrash;