import { FaRegEdit, FaTrash } from "react-icons/fa";
import { IoArrowBackSharp } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UserService from "../../../services/UserService";

const UserShow = () => {
   const [reload, setReload] = useState(0);

   const { id } = useParams();
   const navigate = useNavigate();

   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [phone, setPhone] = useState('');
   const [username, setUsername] = useState('');
   const [gender, setGender] = useState('');
   const [address, setAddress] = useState('');
   const [roles, setRoles] = useState(1);
   const [status, setStatus] = useState(1);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const result = await UserService.show(id);
            const user = result.user;
            setName(user.name);
            setEmail(user.email);
            setPhone(user.phone);
            setAddress(user.address);
            setUsername(user.username);
            setGender(user.gender);
            setRoles(user.roles);
            setStatus(user.status);
         } catch (error) {
            console.error("Error fetching user:", error);
         }
      };
      fetchData();
   }, [id, reload]);

   const handleDelete = async (id) => {
      try {
         const result = await UserService.destroy(id);
         setReload(reload + 1);
         navigate("/admin/user/index");
      } catch (error) {
         console.error("Error deleting user:", error);
      }
   };



    return ( 
        <div className="content">
        <section className="content-header my-2">
           <h1 className="d-inline">Chi tiết</h1>
           <div className="row mt-2 align-items-center">
              <div className="col-md-12 text-end">
              <Link to={"/admin/user/index"} className="btn btn-primary btn-sm">
                     <IoArrowBackSharp /> Về danh sách
                  </Link>
                  <Link to={"/admin/user/edit/" + id} className="btn btn-success btn-sm">
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
                    <th style={{width:"180px"}}>Tên trường</th>
                    <th>Giá trị</th>
                 </tr>
              </thead>
              <tbody>
              <tr>
                     <th className="text-center">Id</th>
                     <td className="text-center">{id}</td>
                  </tr>

                  <tr>
                     <th className="text-center">Tên Người Dùng</th>
                     <td className="text-center">{name}</td>
                  </tr>

                  <tr>
                     <th className="text-center">Tên đăng nhập</th>
                     <td className="text-center">{username}</td>
                  </tr>


                  <tr>
                     <th className="text-center">Giới tính</th>
                     <td className="text-center">{gender}</td>
                  </tr>
                  <tr>
                     <th className="text-center">Địa chỉ</th>
                     <td className="text-center">{address}</td>
                  </tr>
                  <tr>
                     <th className="text-center">Điện thoại</th>
                     <td className="text-center">{phone}</td>
                  </tr>

                  <tr>
                     <th className="text-center">Email</th>
                     <td className="text-center">{email}</td>
                  </tr>

                  <tr>
                     <th className="text-center">Quyền Truy Cập</th>
                     <td className="text-center">{roles}</td>
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
 
export default UserShow;