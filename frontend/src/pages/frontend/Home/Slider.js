import { useEffect, useState } from "react";
import BannerService from "../../../services/BannerService";
import { urlImage } from "../../../config";

const Slider = () => {
	const [banners, setBanners] = useState([]);
   useEffect(() => {
      (async () => {
         const result = await BannerService.banner_list('slideshow');
         setBanners(result.banners);
      })();

   }, []);
	return (
		<section id="slider">
			<div class="container">
				<div class="row">
					<div class="col-sm-12">
						<div id="slider-carousel" class="carousel slide" data-ride="carousel">
							<ol class="carousel-indicators">
								<li data-target="#slider-carousel" data-slide-to="0" class="active"></li>
								<li data-target="#slider-carousel" data-slide-to="1"></li>
								<li data-target="#slider-carousel" data-slide-to="2"></li>
							</ol>

							<div class="carousel-inner">
								{banners.map(function (banner, index) {
									if (index === 0) {
										return (
											<div class="item active">
												<div class="col-sm-6">
													<h1><span>E</span>-SHOPPER</h1>
													<h2>{banner.name}</h2>
													<p>{banner.link} </p>
													<button type="button" class="btn btn-default get">Truy cập ngay</button>
												</div>
												<div class="col-sm-6">
													<img src={urlImage + "banner/" + banner.image} class="girl img-responsive" alt={banner.image} />
												</div>
											</div>
										);
									} else {
										return (
											<div class="item">
												<div class="col-sm-6">
													<h1><span>E</span>-SHOPPER</h1>
													<h2>{banner.name}</h2>
													<p>{banner.link} </p>
													<button type="button" class="btn btn-default get">Truy cập ngay</button>
												</div>
												<div class="col-sm-6">
													<img src={urlImage + "banner/" + banner.image} class="girl img-responsive" alt={banner.image} />
												</div>
											</div>
										);
									}
								})}

							</div>

							<a href="#slider-carousel" class="left control-carousel hidden-xs" data-slide="prev">
								<i class="fa fa-angle-left"></i>
							</a>
							<a href="#slider-carousel" class="right control-carousel hidden-xs" data-slide="next">
								<i class="fa fa-angle-right"></i>
							</a>
						</div>

					</div>
				</div>
			</div>
		</section>

	);
}

export default Slider;