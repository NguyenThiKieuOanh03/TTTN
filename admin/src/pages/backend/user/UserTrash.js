import { FaTrashAlt, FaUndo } from "react-icons/fa";
import { useEffect, useState } from "react";
import UserService from "../../../services/UserService";
import { Link } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";

const UserTrash = () => {
   const [users, setUsers] = useState([]);
   const [load, setLoad] = useState(true);
   const [reload, setReLoad] = useState(0);

   useEffect(() => {
      (async () => {
         setLoad(false);
         const result = await UserService.trash();
         setUsers(result.users);
         setLoad(true);
      })();
   }, [reload]);
   const handDelete = (id) => {
      (async () => {
         const result = await UserService.destroy(id);
         alert(result.message);
         setReLoad(Date.now)
      })();
   };
   const handRestore = (id) => {
      (async () => {
         const result = await UserService.restore(id);
         alert(result.message);
         setReLoad(result.user.id)
      })();
   };


    return ( 
        <div className="content">
        <section className="content-header my-2">
           <h1 className="d-inline">Thùng rác thành viên</h1>
           <div className="text-end">
               <Link to={"/admin/user/index"} className="btn btn-sm btn-success">
                  <IoArrowBackSharp className="fa fa-arrow-left" /> Về danh sách
               </Link>
            </div>

        </section>
        <section className="content-body my-2">

           <table className="table table-bordered">
              <thead>
                 <tr>
                    <th className="text-center" style={{width:"30px"}}>
                       <input type="checkbox" id="checkAll" />
                    </th>
                    <th>Họ tên</th>
                    <th>Điện thoại</th>
                    <th>Email</th>
                    <th className="text-center" style={{width:"30px"}}>ID</th>
                 </tr>
              </thead>
              <tbody>
              {users && users.length > 0 && users.map((user, index) => {
                     return (
                 <tr className="datarow">
                    <td>
                       <input type="checkbox" id="checkId" />
                    </td>
                    
                    <td>
                       <div className="name">
                          <a href="user_edit.html">
                          {user.name}
                          </a>
                       </div>
                       <div className="function_style">
                                 <button onClick={() => handRestore(user.id)} className="border-0 fa fa-undo text-primary mx-1" >
                                    <FaUndo />
                                 </button>

                                 <button onClick={() => handDelete(user.id)} className="border-0 fa fa-trash text-danger mx-1" >
                                    <FaTrashAlt />
                                 </button>

                              </div>


                    </td>
                    <td>{user.phone}</td>
                    <td>{user.email}</td>
                    <td className="text-center">{user.id}</td>
                 </tr>
                 );
               })}
              </tbody>
           </table>

        </section>
     </div>

     );
}
 
export default UserTrash;