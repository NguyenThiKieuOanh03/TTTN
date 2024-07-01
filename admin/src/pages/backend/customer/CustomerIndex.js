import { FaEye, FaPlus, FaRegEdit, FaToggleOff, FaToggleOn, FaTrash, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import CustomerService from "../../../services/CustomerService";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../../LoadingSpinner";

const CustomerIndex = () => {

   const [customers, setCustomers] = useState([]);
   const [load, setLoad] = useState(false);
   const [reload, setReload] = useState(0);

   useEffect(() => {
      (async () => {
         setLoad(true);
         const result = await CustomerService.index();
         setCustomers(result.customers);
         setLoad(false);
      })();
   }, [reload]);

   const handDelete = (id) => {
      (async () => {
         const result = await CustomerService.delete(id);
         setReload(result.customer.id)
      })();
   };
   const handleStatus = (id) => {
      (async () => {
         const result = await CustomerService.status(id);
         setReload(Date.now);

      })();
   };


   return (
      <div className="content">
         <section className="content-header my-2">
            <h1 className="d-inline">Khách hàng</h1>
            <div className="col-md-12 text-end">
               <Link to="/admin/customer/create" className="btn btn-sm btn-success" ><FaPlus />Thêm</Link>
               <Link to="/admin/customer/trash" className="btn btn-sm btn-danger" ><FaTrash />  Thùng Rác</Link>
            </div>
         </section>
         <section className="content-body my-2">
            {load ? <LoadingSpinner /> : ""}
            <table className="table table-bordered">
               <thead>
                  <tr>
                     <th className="text-center" style={{ width: "30px" }}>
                        <input type="checkbox" id="checkboxAll" />
                     </th>
                     <th>Họ tên</th>
                     <th>Điện thoại</th>
                     <th>Email</th>
                     <th className="text-center" style={{ width: "30px" }}>ID</th>
                  </tr>
               </thead>
               <tbody>
                  {customers && customers.map((customer, index) => {
                     return (
                        <tr className="datarow" key={index}>
                           <td>
                              <input type="checkbox" id="checkId" />
                           </td>
                           <td>
                              <div className="name">
                                 <a href="customer_edit.html">{customer.name}</a>
                              </div>
                              <div className="function_style">
                                 <button onClick={() => handleStatus(customer.id)}
                                    className={
                                       customer.status === 1
                                          ? "border-0 px-1 text-success"
                                          : "border-0 px-1 text-danger"

                                    }>
                                    {customer.status === 1 ? <FaToggleOn /> : <FaToggleOff />}
                                 </button>

                                 <Link to={"/admin/customer/edit/" + customer.id} className="px-1 text-primary">
                                    <FaRegEdit />
                                 </Link>
                                 <Link to={"/admin/customer/show/" + customer.id} className="px-1 text-info">
                                    <FaEye />
                                 </Link>
                                 <button onClick={() => handDelete(customer.id)}
                                    className="border-0 px-1 text-danger">
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

export default CustomerIndex;