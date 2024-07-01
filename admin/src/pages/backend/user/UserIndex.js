import { Link } from "react-router-dom";
import UserService from "../../../services/UserService";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../../LoadingSpinner";
import { FaEye, FaPlus, FaRegEdit, FaToggleOff, FaToggleOn, FaTrash, FaTrashAlt } from "react-icons/fa";
const UserIndex = () => {

   const[users,setUsers]=useState([]);
   const [load, setLoad] = useState(false);
   const [reload,setReload]=useState(0);

   useEffect(() => {
      (async () => {
         setLoad(true);
         const result = await UserService.index();
         setUsers(result.users);
         setLoad(false);
      })();
   }, [reload]);

   const handDelete = (id) => {
      (async () => {
         const result = await UserService.delete(id);
         setReload(result.user.id)
      })();
   };
   const handleStatus = (id) => {
      (async () => {
         const result = await UserService.status(id);
         setReload(Date.now);

      })();
   };



    return ( 
        <div className="content">
        <section className="content-header my-2">
           <h1 className="d-inline">Thành viên</h1>
           <div className="col-md-12 text-end">
           <Link to="/admin/user/create" className="btn btn-sm btn-success" ><FaPlus/>Thêm</Link>
           <Link to="/admin/user/trash" className="btn btn-sm btn-danger" ><FaTrash />  Thùng Rác</Link>
</div>
                   </section>
        <section className="content-body my-2">
        {load ? <LoadingSpinner /> : ""}
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
              {users && users.map((user, index) => {
               return (

                 <tr className="datarow"key={index}>
                    <td className="text-center">
                       <input type="checkbox" id="checkId" />
                    </td>
                    
                    <td>
                       <div className="name">
                          <a href="menu_index.html">
                          {user.name}
                          </a>
                       </div>
                       <div className="function_style">
                       <button onClick={()=>handleStatus(user.id)}
                                      className={
                                       user.status ===1
                                       ?"border-0 px-1 text-success"
                                       :"border-0 px-1 text-danger"

                                      }>
                                       {user.status===1?<FaToggleOn/>:<FaToggleOff/>}
                                      </button>

                                      <Link to ={"/admin/user/edit/" + user.id} className="px-1 text-primary">
                                          <FaRegEdit />
                                       </Link>
                                       <Link to={"/admin/user/show/"+user.id} className="px-1 text-info">
                                          <FaEye/>
                                       </Link>
                                       <button onClick={()=>handDelete(user.id)}
                                        className="border-0 px-1 text-danger">
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
 
export default UserIndex;