import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import UserService from "../../../services/UserService";
import { IoArrowBackSharp } from "react-icons/io5";
import { FaSave } from "react-icons/fa";
const UserCreate = () => {

   const navigate = useNavigate();
   //
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [phone, setPhone] = useState('');
   const [username, setUsername] = useState('');
   const [address, setAddress] = useState('');
   const [gender, setGender] = useState('');
   const [password, setPassword] = useState('');
   const [roles, setRoles] = useState(1);
   const [status, setStatus] = useState(1);

   const handleSubmit = (event) => {
      event.preventDefault();
      const user = new FormData();
      user.append("name", name);
      user.append("email", email);
      user.append("phone", phone);
      user.append("gender", gender);
      user.append("address", address);

      user.append("username", username);
      user.append("password", password);
      user.append("roles", roles);
      user.append("status", status);
      (async () => {
         const result = await UserService.store(user);
         alert(result.message);
         navigate('/admin/user/index', { replace: true });
      })();
   };



    return ( 
        <div className="content">
                  <form onSubmit={handleSubmit}>

        <section className="content-header my-2">
           <h1 className="d-inline">Thêm thành viên</h1>
           <div className="row mt-2 align-items-center">
              <div className="col-md-12 text-end">
                 <button className="btn btn-success btn-sm" name="THEM">
                    <FaSave className="fa fa-save"/> Lưu [Thêm]
                 </button>
                 <Link to="/admin/user/index" className="btn btn-primary btn-sm">
                        <IoArrowBackSharp className="fa fa-arrow-left" /> Về danh sách
                     </Link>
              </div>
           </div>
        </section>
        <section className="content-body my-2">

        <div className="row">
                  <div className="col-md-6">
                     <div className="mb-3">
                        <label><strong>Tên đăng nhập(*)</strong></label>
                        <input type="text" value={username}
                           onChange={(e) => setUsername(e.target.value)} className="form-control" placeholder="Tên đăng nhập" />
                     </div>
                     <div className="mb-3">
                        <label><strong>Mật khẩu(*)</strong></label>
                        <input type="password" value={password}
                           onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Mật khẩu" />
                     </div>

                     <div className="mb-3">
                        <label><strong>Email(*)</strong></label>
                        <input type="text" value={email}
                           onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Email" />
                     </div>
                     <div className="mb-3">
                        <label><strong>Địa chỉ(*)</strong></label>
                        <input type="text" value={address}
                           onChange={(e) => setAddress(e.target.value)} className="form-control" placeholder="Address" />
                     </div>

                     <div className="mb-3">
                        <label><strong>Điện thoại(*)</strong></label>
                        <input type="text" value={phone}
                           onChange={(e) => setPhone(e.target.value)} className="form-control" placeholder="Điện thoại" />
                     </div>
                  </div>
                  <div className="col-md-6">
                     <div className="mb-3">
                        <label><strong>Họ tên (*)</strong></label>
                        <input type="text" value={name}
                           onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Họ tên" />
                     </div>

                     <div className="mb-3">
                        <label><strong>Giới tính</strong></label>
                        <select name="gender" value={gender}
                           onChange={(e) => setGender(e.target.value)} className="form-select">
                           <option>Chọn giới tinh</option>
                           <option value="1">Nam</option>
                           <option value="0">Nữ</option>
                        </select>
                     </div>
                     <div className="mb-3">
                        <label><strong>Trạng thái</strong></label>
                        <select value={status}
                           onChange={(e) => setStatus(e.target.value)} className="form-select">
                           <option value="1">Xuất bản</option>
                           <option value="2">Chưa xuất bản</option>
                        </select>
                     </div>
                     <div className="mb-3">
                        <label><strong>Quyền truy cập</strong></label>
                        <select value={roles}
                           onChange={(e) => setRoles(e.target.value)} className="form-select">
                           <option value="1">Được truy cập</option>
                           <option value="2">Không được truy cập</option>
                        </select>
                     </div>
                  </div>
               </div>

        </section>
        </form>
     </div>

     );
}
 
export default UserCreate;