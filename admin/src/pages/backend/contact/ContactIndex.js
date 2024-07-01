import { FaEye, FaRegEdit, FaToggleOff, FaToggleOn, FaTrash, FaTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../../LoadingSpinner";
import { Link } from "react-router-dom";
import ContactService from "../../../services/ContactService";

const ContactIndex = () => {
   const [contacts, setContacts] = useState([]);
   const [load, setLoad] = useState(false);
   const [reload, setReload] = useState(0);

   useEffect(() => {
      const fetchContacts = async () => {
          try {
              setLoad(true);
              const result = await ContactService.index();
              setContacts(result.contacts);
          } catch (error) {
              console.error('Failed to fetch contacts.', error);
          } finally {
              setLoad(false);
          }
      };

      fetchContacts();
  }, []);

  const handDelete = async (id) => {
      try {
          await ContactService.delete(id);
          // Update the contacts list after deleting
          const updatedContacts = contacts.filter(contact => contact.id !== id);
          setContacts(updatedContacts);
      } catch (error) {
          console.error('Failed to delete contact.', error);
      }
  };

  const handleStatus = async (id) => {
      try {
          await ContactService.status(id);
          // Fetch contacts again to get updated status
          const result = await ContactService.index();
          setContacts(result.contacts);
      } catch (error) {
          console.error('Failed to update contact status.', error);
      }
  };


   return (
      <div className="content">
         <section className="content-header my-2">
            <h1 className="d-inline">Liên hệ</h1>
            <div className="col-md-12 text-end">
               <Link to="/admin/contact/trash" className="btn btn-sm btn-danger" ><FaTrash />  Thùng Rác</Link>
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
                     <th>Tiêu đề</th>
                     <th className="text-center" style={{ width: "30px" }}>ID</th>
                  </tr>
               </thead>
               <tbody>
                  {contacts && contacts.map((contact, index) => {
                     return (
                        <tr className="datarow" key={index}>
                           <td className="text-center">
                              <input type="checkbox" id="checkId" />
                           </td>
                           <td>
                              <div className="name">
                                 <a href="contact_reply.html">{contact.name}</a>
                              </div>
                              <div className="function_style">
                                 <button onClick={() => handleStatus(contact.id)}
                                    className={
                                       contact.status === 1
                                          ? "border-0 px-1 text-success"
                                          : "border-0 px-1 text-danger"

                                    }>
                                    {contact.status === 1 ? <FaToggleOn /> : <FaToggleOff />}
                                 </button>

                                 <Link to={"/admin/contact/reply/" + contact.id} className="px-1 text-primary">
                                    <FaRegEdit /> Trả lời
                                 </Link>
                                 <Link to={"/admin/contact/show/" + contact.id} className="px-1 text-info">
                                    <FaEye />
                                 </Link>
                                 <button onClick={() => handDelete(contact.id)}
                                    className="border-0 px-1 text-danger">
                                    <FaTrashAlt />
                                 </button>
                              </div>

                           </td>
                           <td>{contact.phone}</td>
                           <td>{contact.email}</td>
                           <td>{contact.title}</td>
                           <td className="text-center">{contact.id}</td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>

         </section>
      </div>

   );
}

export default ContactIndex;