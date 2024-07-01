import { Link } from "react-router-dom";

const Footer = () => {
    return ( 
        <>
	<footer id="footer">
		<div class="footer-top">
			<div class="container">
				<div class="row">
					<div class="col-sm-2">
						<div class="companyinfo">
							<h2><span>e</span>-shopper</h2>
							<p>Công ty cổ phần Eshopper do sở KH & ĐT TP.HCM cấp ngày 02/01/20020, Bộ Thông Tin và Truyền Thông cấp ngày 04/06/2020.</p>
						</div>
					</div>
					<div class="col-sm-7">
						<div class="col-sm-3">
							<div class="video-gallery text-center">
								<a href="#">
									<div class="iframe-img">
										<img src="asset/images/home/canh-bao-lo-hong-bao-mat-nguy-hiem-theo-doi-mang-wi-fi-240520052129.jpg" alt="" />
									</div>
									<div class="overlay-icon">
										<i class="fa fa-play-circle-o"></i>
									</div>
								</a>
								<p>Cảnh báo lỗ hổng bảo mật nguy hiểm theo dõi mạng Wi-Fi</p>
							</div>
						</div>
						
						<div class="col-sm-3">
							<div class="video-gallery text-center">
								<a href="#">
									<div class="iframe-img">
										<img src="asset/images/home/nhung-cai-dat-can-thay-doi-sau-khi-cap-nhat-len-ios-17-5-240515021628.jpg" alt="" />
									</div>
									<div class="overlay-icon">
										<i class="fa fa-play-circle-o"></i>
									</div>
								</a>
								<p>Đánh giá thời lượng pin của iOS 17.5</p>
							</div>
						</div>
						
						<div class="col-sm-3">
							<div class="video-gallery text-center">
								<a href="#">
									<div class="iframe-img">
										<img src="asset/images/home/ios-17-5-gap-loi-anh-cu-da-xoa-bong-dung-hoi-sinh-240516100239.jpg" alt="" />
									</div>
									<div class="overlay-icon">
										<i class="fa fa-play-circle-o"></i>
									</div>
								</a>
								<p>iOS 17.5 gặp lỗi</p>
							</div>
						</div>
						
						<div class="col-sm-3">
							<div class="video-gallery text-center">
								<a href="#">
									<div class="iframe-img">
										<img src="asset/images/home/danh-gia-thoi-luong-pin-cua-ios-17-5-tren-cac-dong-iphone-cu-240517120240.jpg" alt="" />
									</div>
									<div class="overlay-icon">
										<i class="fa fa-play-circle-o"></i>
									</div>
								</a>
								<p>Những cài đặt cần thay đổi sau khi cập nhật lên iOS 17.5</p>
							</div>
						</div>
					</div>
					<div class="col-sm-3">
						<div class="address">
							<img src="asset/images/home/map.png" alt="" />
							<p>225 Nguyễn Đình Chiểu, Phường 5, Quận 3, Thành phố Hồ Chí Minh</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<div class="footer-widget">
			<div class="container">
				<div class="row">
					<div class="col-sm-2">
						<div class="single-widget">
							<h2>Liên hệ</h2>
							<li>
                                    <Link to="/">Trang chủ</Link>
                                </li>
                                <li>
                                    <Link to="/san-pham">Sản phẩm</Link>
                                </li>
								<li>
								<Link className="dropdown" to="/lien-he">Liên hệ</Link>
								</li>
						</div>
					</div>
					<div class="col-sm-2">
						<div class="single-widget">
							<h2>Danh mục</h2>
							<li><Link className="dropdown-item text-main" to="/danh-muc/iphone">Iphone</Link></li>
                            <li><Link className="dropdown-item text-main" to="/danh-muc/samsung">Samsung</Link></li>

						</div>
					</div>
					<div class="col-sm-2">
						<div class="single-widget">
							<h2>Tin tức</h2>
							<li>
                                    <Link className="dropdown" to="/bai-viet">Bài viết</Link>
                                </li>
                                <li>
                                    <Link className="dropdown" to="/chu-de-bai-viet/ios-gap-loi">Tin tức</Link>
                                </li>

						</div>
					</div>
					<div class="col-sm-3 col-sm-offset-1">
						<div class="single-widget">
							<h2>Liên lạc với EShopper</h2>
							<form action="#" class="searchform">
								<input type="text" placeholder="Địa chỉ email của bạn" />
								<button type="submit" class="btn btn-default"><i class="fa fa-arrow-circle-o-right"></i></button>
							</form>
						</div>
					</div>
					
				</div>
			</div>
		</div>
		
		<div class="footer-bottom">
			<div class="container">
				<div class="row">
					<p class="pull-left">Copyright © 2013 E-SHOPPER Inc. All rights reserved.</p>
					<p class="pull-right">Thiết kế bởi: <span>Nguyễn Thị Kiều Oanh - Phone: 0366780423</span></p>
					</div>
			</div>
		</div>
		
	</footer>

        </>
     );
}
 
export default Footer;