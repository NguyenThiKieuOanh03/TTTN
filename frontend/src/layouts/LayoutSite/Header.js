import { Link, useNavigate } from "react-router-dom";
import MainMenu from "../../components/MainMenu";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";

const Header = () => {
	const [cart, setCart] = useState([]);

	useEffect(() => {
	  const cartData = localStorage.getItem("cart");
	  if (cartData) {
		try {
			const parsedCart = JSON.parse(cartData);
			if (Array.isArray(parsedCart)) {
				setCart(parsedCart);
			}
		} catch (error) {
			console.error("Error parsing cart data:", error);
		}
	  }
	}, []);

	const [username, setUsername] = useState(null);
	useEffect(() => {
		const email = Cookies.get('login');
		if (email) {
			setUsername(email);
		}
	}, []);
	
	const navigate = useNavigate();
	const Logout = () => {
		Cookies.remove("login");
		window.location.reload();
		navigate('/dang-nhap');
	};

	const totalQuantityInCart = cart.reduce((total, item) => {
		const quantity = parseInt(item.quantity, 10);
		return total + (isNaN(quantity) ? 0 : quantity);
	}, 0);

	return (
		<>
			<header id="header">
				<div className="header_top">
					<div className="container">
						<div className="row">
							<div className="col-sm-6">
								<div className="contactinfo">
									<ul className="nav nav-pills">
										<li><a href="#"><i className="fa fa-phone"></i> +84 366780423</a></li>
										<li><a href="#"><i className="fa fa-envelope"></i> kieuoanh@gmail.com</a></li>
									</ul>
								</div>
							</div>
							<div className="col-sm-6">
								<div className="social-icons pull-right">
									<ul className="nav navbar-nav">
										<li><a href="#"><i className="fa fa-facebook"></i></a></li>
										<li><a href="#"><i className="fa fa-twitter"></i></a></li>
										<li><a href="#"><i className="fa fa-linkedin"></i></a></li>
										<li><a href="#"><i className="fa fa-dribbble"></i></a></li>
										<li><a href="#"><i className="fa fa-google-plus"></i></a></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="header-middle">
					<div className="container">
						<div className="row">
							<div className="col-sm-4">
								<div className="logo pull-left">
									<Link to="/"><img src="asset/images/home/logo.png" alt="" /></Link>
								</div>
							</div>
							<div className="col-sm-8">
								<div className="shop-menu pull-right">
									<ul className="nav navbar-nav">
										<li><Link to="/dang-ky"><i className="fa fa-user"></i> Đăng Ký </Link></li>
										<li> <Link to="/gio-hang"><i className="fa fa-shopping-cart"></i> Giỏ hàng ({totalQuantityInCart}) </Link></li>
										<li>
											{
												(username !== null && username !== "") ? (
													<div className="widget-header mr-3">
														<p className="mb-0 mr-2">Hi, {username}!</p>
														<Link onClick={Logout} className="bi bi-door-open"> Logout</Link>
													</div>
												) : (
													<Link to="/dang-nhap" data-toggle="modal">
														<i className="icon-user" />
														Login
													</Link>
												)
											}
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
				<MainMenu />
			</header>
		</>
	);
}

export default Header;
