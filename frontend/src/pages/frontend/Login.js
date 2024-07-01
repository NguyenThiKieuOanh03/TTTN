import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerService from '../../services/CustomerService';
import Swal from "sweetalert2";
import Cookies from 'universal-cookie';

const Login = ({ GetUser }) => {
  const navigator = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const cookies = new Cookies();
  useEffect(() => {
    CustomerService.index()
      .then(response => {
        if (response.success && response.customers && Array.isArray(response.customers)) {
          console.log('Data from API:', response.customers);
          setCustomers(response.customers);
        } else {
          console.error('Invalid data format from API. Expected "success" and "customers" array.');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const doLogin = (event) => {
    event.preventDefault();
    const customer = customers.find((customer) => customer.email === email && customer.password === password);

    if (customer) {
        const email = customer.username;
        console.log('Login successful');
        cookies.set('login', email);
        Swal.fire(
            'Sign in Successfully!',
            'You have successfully logged into your account!',
            'success'
        ).then((result) => {
            if (result.isConfirmed) {
                window.location.reload();
            }
        });

        console.log("customer", customer);
        navigator('/');

    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#">Why do I have this issue?</a>'
        });
    }
}
console.log(GetUser)

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="border p-4" style={{ width: '35%' }}>
        <section className="content-header my-2">
          <div className="container">
            <div className="row">
              <div className="col-md-15 text-center">
                <h1 className="d-inline" style={{ color: '#fdb45e' }}>Đăng Nhập</h1>
              </div>
            </div>
          </div>
        </section>
        <section className="content-body my-2">
          <div class="col-sm-8 col-sm-offset-8">
                     <div class="login-form">
                        <h2>Đăng nhập tài khoản của bạn</h2>
                        <form onSubmit={doLogin}>
                        <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    placeholder="Email"
                  />
                           <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Mật khẩu"
                  />
                           <span>
                              <input type="checkbox" class="checkbox" />
                              Lưu mật khẩu
                           </span>
                           <button type="submit" class="btn btn-default">Đăng nhập</button>
                        </form>
                     </div>
                  </div>
          <div className="row">
            <div className="col-md-12 text-center">
              {/* Add any additional elements here if needed */}
            </div>
          </div>
        </section>
        <br/>
        <br/>
        <br/>

      </div>
    </div>
  );
};

export default Login;
