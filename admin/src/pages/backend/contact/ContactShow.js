import { FaRegEdit, FaTrash } from "react-icons/fa";
import { IoArrowBackSharp } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ContactService from "../../../services/ContactService";

const ContactShow = () => {

   const [reload, setReload] = useState(0);

   const { id } = useParams();
   const navigate = useNavigate();

   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [phone, setPhone] = useState('');
   const [title, setTitle] = useState('');
   const [content, setContent] = useState('');
   const [status, setStatus] = useState(1);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const result = await ContactService.show(id);
            const contact = result.contact;
            setName(contact.name);
            setEmail(contact.email);
            setPhone(contact.phone);
            setStatus(contact.status);
            setTitle(contact.title);
            setContent(contact.content);

         } catch (error) {
            console.error("Error fetching contact:", error);
         }
      };
      fetchData();
   }, [id, reload]);

   const handleDelete = async (id) => {
      try {
         const result = await ContactService.destroy(id);
         setReload(reload + 1);
         navigate("/admin/contact/index");
      } catch (error) {
         console.error("Error deleting contact:", error);
      }
   };

   return (
      <div className="content">
         <section className="content-header my-2">
            <h1 className="d-inline">Chi tiết</h1>
            <div className="row mt-2 align-items-center">
               <div className="col-md-12 text-end">
                  <Link to={"/admin/brand/index"} className="btn btn-primary btn-sm">
                     <IoArrowBackSharp /> Về danh sách
                  </Link>
                  <Link to={"/admin/brand/edit/" + id} className="btn btn-success btn-sm">
                     <FaRegEdit /> Sửa
                  </Link>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(id)}>
                     <FaTrash /> Xóa
                  </button>
               </div>
            </div>
         </section>
         <section className="content-body my-2">

            <table className="table table-bordered">
               <thead>
                  <tr>
                     <th style={{ width: "180px" }}>Tên trường</th>
                     <th className="text-center">Giá trị</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <th className="text-center">Id</th>
                     <td className="text-center">{id}</td>
                  </tr>

                  <tr>
                     <th className="text-center">Tên liên hệ</th>
                     <td className="text-center">{name}</td>
                  </tr>

                  <tr>
                     <th className="text-center">Email</th>
                     <td className="text-center">{email}</td>
                  </tr>


                  <tr>
                     <th className="text-center">Điện Thoại</th>
                     <td className="text-center">{phone}</td>
                  </tr>

                  <tr>
                     <th className="text-center">Tiêu đề</th>
                     <td className="text-center">{title}</td>
                  </tr>

                  <tr>
                     <th className="text-center">Nội dung</th>
                     <td className="text-center">{content}</td>
                  </tr>

                  <tr>
                     <th className="text-center">Trạng Thái</th>
                     <td className="text-center">{status}</td>
                  </tr>

               </tbody>
            </table>

         </section>
      </div>

   );
}

export default ContactShow;