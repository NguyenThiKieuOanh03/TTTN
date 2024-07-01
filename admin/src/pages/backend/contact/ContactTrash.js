import { FaTrashAlt, FaUndo } from "react-icons/fa";
import { useEffect, useState } from "react";
import ContactService from "../../../services/ContactService";
import { Link } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";

const ContactTrash = () => {

   const [contacts, setContacts] = useState([]);
   const [load, setLoad] = useState(true);
   const [reload, setReLoad] = useState(0);

   useEffect(() => {
      (async () => {
         setLoad(false);
         const result = await ContactService.trash();
         setContacts(result.contacts);
         setLoad(true);
      })();
   }, [reload]);
   const handDelete = (id) => {
      (async () => {
         const result = await ContactService.destroy(id);
         alert(result.message);
         setReLoad(Date.now)
      })();
   };
   const handRestore = (id) => {
      (async () => {
         const result = await ContactService.restore(id);
         alert(result.message);
         setReLoad(result.contact.id)
      })();
   };

   return (
      <div className="content">
         <section className="content-header my-2">
            <h1 className="d-inline">Thùng rác liên hệ</h1>
            <div className="text-end">
               <Link to={"/admin/contact/index"} className="btn btn-sm btn-success">
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
                     <th>Tiêu đề</th>
                  </tr>
               </thead>
               <tbody>
                  {contacts && contacts.length > 0 && contacts.map((contact, index) => {
                     return (


                        <tr className="datarow">
                           <td>
                              <input type="checkbox" id="checkId" />
                           </td>
                           <td>
                              <div className="name">
                                 <a href="contact_reply.html">{contact.name}</a>
                              </div>
                              <div className="function_style">
                                 <button onClick={() => handRestore(contact.id)} className="border-0 fa fa-undo text-primary mx-1" >
                                    <FaUndo />
                                 </button>

                                 <button onClick={() => handDelete(contact.id)} className="border-0 fa fa-trash text-danger mx-1" >
                                    <FaTrashAlt />
                                 </button>

                              </div>


                           </td>
                           <td>{contact.phone}</td>
                           <td>{contact.email}</td>
                           <td>{contact.title}</td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>

         </section>
      </div>

   );
}

export default ContactTrash;