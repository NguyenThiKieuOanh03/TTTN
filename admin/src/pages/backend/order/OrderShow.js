import { IoArrowBackSharp } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import OrderService from "../../../services/OrderService";
import { useEffect, useState } from "react";
import OrderDetailService from "../../../services/OrderDetailService";
import { urlImage } from "../../../config";

const OrderShow = () => {

   const { id } = useParams();
   const [delivery_name, setDelivery_name] = useState("");
   const [delivery_email, setDelivery_email] = useState("");
   const [delivery_phone, setDelivery_phone] = useState("");
   const [delivery_address, setdelivery_address] = useState("");
   const [note, setNote] = useState("");
   const [created_at, setCreated_at] = useState("");
   const [status, setStatus] = useState(1);
   const [totalAmount, setTotalAmount] = useState(0); // State for total amount
   const [orderdetails, setOrderdetails] = useState([]);

   useEffect(() => {
      (async () => {
         const result = await OrderDetailService.showOrderid(id);
         setOrderdetails(result.orderdetails);
      })();
   }, [id]);


   useEffect(() => {
      (async () => {
         const result = await OrderService.show(id);
         const order = result.order;
         setDelivery_name(order.delivery_name);
         setDelivery_email(order.delivery_email);
         setDelivery_phone(order.delivery_phone);
         setdelivery_address(order.delivery_address);
         setNote(order.note);
         setCreated_at(order.created_at);
         setStatus(order.status);
      })();
   }, [id]);

   useEffect(() => {
      const total = orderdetails.reduce((acc, orderdet) => acc + orderdet.price * orderdet.qty, 0);
      setTotalAmount(total);
   }, [orderdetails]);

   const formatDate = (datetime) => {
      const date = new Date(datetime);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
   };

   return (
      <div className="content">
         <section className="content-header my-2">
            <h1 className="d-inline">Chi tiết đơn hàng</h1>
            <div className="mt-1 text-end">
               <Link className="btn btn-sm btn-primary" to={"/admin/order/index"}>
                  <IoArrowBackSharp className="fa fa-arrow-left" /> Về danh sách
               </Link>
            </div>
         </section>
         <section className="content-body my-2">

            <h3>Thông tin khách hàng</h3>
            <div className="row">
               <div className="col-md">
                  <label><strong>Họ tên (*)</strong></label>
                  <input type="text" name="name" value={delivery_name} className="form-control" readonly />
               </div>
               <div className="col-md">
                  <label><strong>Email (*)</strong></label>
                  <input type="text" name="email" value={delivery_email} className="form-control" readonly />
               </div>
               <div className="col-md">
                  <label><strong>Điện thoại (*)</strong></label>
                  <input type="text" name="phone" value={delivery_phone} className="form-control" readonly />
               </div>
               <div className="col-md-5">
                  <label><strong>Địa chỉ (*)</strong></label>
                  <input type="text" name="address" value={delivery_address} className="form-control" readonly />
                  </div>
            </div>
            <h3>Chi tiết giỏ hàng</h3>
            <div className="row my-2">
               <div className="col-3">
               <strong>Tổng tiền:</strong> {totalAmount.toFixed(3)}đ
               </div>
               <div className="col-3">
               <strong>Ngày đặt:</strong> {formatDate(created_at)}
               </div>
               <div className="col-3">
               <strong>Hình thức đặt:</strong> {note}
               </div>
               <div className="col-3">
               <strong>Trạng thái:</strong> {status === 2 ? "Chưa thực hiện" : "Đã thực hiện"}
               </div>
            </div>
            <div className="row my-3">
               <div className="col-12">
                  <table className="table table-bordered table-striped">
                     <thead>
                        <tr>
                           <th className="text-center" style={{ width: "90px" }}>Hình ảnh</th>
                           <th>Tên sản phẩm</th>
                           <th style={{ width: "160px" }} className="text-center">Giá</th>
                           <th style={{ width: "90px" }} className="text-center">Số lượng</th>
                           <th style={{ width: "160px" }} className="text-center">Thành tiền</th>
                        </tr>
                     </thead>
                     <tbody>
                        {orderdetails && orderdetails.map((orderdet, index) => {
                           return (
                              <tr key={index} className="datarow">
                                 <td>
                                 <img className="img-fluid" src={urlImage + "product/" + orderdet.proimage} alt={orderdet.image} />
                                 </td>
                                 <td>{orderdet.proname}</td>
                                 <td className="text-right">{orderdet.price.toFixed(3)}đ</td>
                                 <td className="text-center">{orderdet.qty}</td>
                                 <td className="text-right">{(orderdet.price * orderdet.qty).toFixed(3)}đ</td>
                              </tr>
                           );
                        })}
                     </tbody>
                  </table>
               </div>
            </div>

         </section>
      </div>

   );
}

export default OrderShow;