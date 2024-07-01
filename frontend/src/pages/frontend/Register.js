import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerService from "../../services/CustomerService";


function Register() {
   const navigate = useNavigate();
   //
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [phone, setPhone] = useState('');
   const [username, setUsername] = useState('');
   const [gender, setGender] = useState(1);
   const [address, setAddress] = useState('');
   const [password, setPassword] = useState('');
   const [roles, setRoles] = useState(2);
   const [status, setStatus] = useState(1);


   const handleSubmit = (event) => {
      event.preventDefault();
      const customer = new FormData();
      customer.append("name", name);
      customer.append("email", email);
      customer.append("phone", phone);
      customer.append("address", address);
      customer.append("gender", gender);
      customer.append("username", username);
      customer.append("password", password);
      customer.append("roles", roles);
      customer.append("status", status);
      (async () => {
         const result = await CustomerService.store(customer);
         alert(result.message);
         navigate('/', { replace: true });
      })();
   };

   return (
      <div className="content d-flex align-items-center justify-content-center" style={{ height: '80vh' }}>
         <form onSubmit={handleSubmit} className="border p-4" style={{ width: '120%' }}>

            <section className="content-header my-2">
               <div className="container">
                  <div className="row">
                     <div className="col-md-9 text-center">
                        <h1 className="d-inline" style={{ color: '#fdb45e' }}>Đăng Ký</h1>
                     </div>
                  </div>
                  <div className="row">
                     <div className="col-md-4 ">
                        <div className="mb-3">
                           <label></label>
                           <input type="text" value={username}
                              onChange={(e) => setUsername(e.target.value)} className="form-control" placeholder="Tên đăng nhập" />
                        </div>
                        <div className="mb-3">
                           <label></label>
                           <input type="password" value={password}
                              onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Mật khẩu" />
                        </div>

                        <div className="mb-3">
                           <label></label>
                           <input type="text" value={email}
                              onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Email" />
                        </div>

                        <div className="mb-3">
                           <label></label>
                           <input type="text" value={address}
                              onChange={(e) => setAddress(e.target.value)} className="form-control" placeholder="Địa chỉ" />
                        </div>


                     </div>
                     <div className="col-md-4">
                        <div className="mb-3">
                           <label></label>
                           <input type="text" value={name}
                              onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Họ tên" />
                        </div>
                        <br/>
                        
                        <div className="mb-3">
                           <label></label>
                           <select value={gender}
                              onChange={(e) => setGender(e.target.value)} className="form-select">
                              <option>Chọn giới tinh</option>
                              <option value="1">Nam</option>
                              <option value="0">Nữ</option>
                           </select>
                        </div>
                        <div className="mb-3">
                           <label></label>
                           <input type="text" value={phone}
                              onChange={(e) => setPhone(e.target.value)} className="form-control" placeholder="Điện thoại" />
                        </div>
                        <br/>
                        <div className="row">
                           <div className="col-md-12 text-center">
                              <div className="form-group pb-2">
                                 <button type="submit" className="btn  py-2 px-4" style={{ backgroundColor: '#fdb45e', color: 'white' }}>Đăng Ký</button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

               </div>
            </section>

         </form>

      </div>
   );
}

export default Register;