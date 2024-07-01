import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import BannerService from "../../../services/BannerService";
import { IoArrowBackSharp } from "react-icons/io5";
import { FaSave } from "react-icons/fa";
const BannerCreate = () => {
   const navigate = useNavigate();
   const [banners, setBanners] = useState([]);

   //
   const [name, setName] = useState('');
   const [link, setLink] = useState('');
   const [position, setPosition] = useState('');
   const [status, setStatus] = useState(1);
   const [sort_order, setSortOrder] = useState(1);


   const handleSubmit = (event) => {
      event.preventDefault();
      const image = document.getElementById("image");
      const banner = new FormData();
      banner.append("name", name);
      banner.append("link", link);
      banner.append("position", position);
      banner.append("sort_order", sort_order);
      banner.append("status", status);
      banner.append("image", image.files.length === 0 ? "" : image.files[0]);
      (async () => {
         const result = await BannerService.store(banner);
         alert(result.message);
         navigate('/admin/banner/index', { replace: true });
      })();
   };

   useEffect(() => {
      (async () => {
         const result = await BannerService.index();
         setBanners(result.banners);
      })();
   }, []);

   return (
      <div className="content">
         <section className="content-header my-2">
            <h1 className="d-inline">Thêm banner</h1>
            <div className="text-end">
               <Link to="/admin/banner/index" className="btn btn-sm btn-success">
                  <IoArrowBackSharp className="fa fa-arrow-left" /> Về danh sách
               </Link>
            </div>
         </section>
         <section className="content-body my-2">
            <form onSubmit={handleSubmit}>

               <div className="row">
                  <div className="col-md-9">
                     <div className="mb-3">
                        <label><strong>Tên banner (*)</strong></label>
                        <input type="text" value={name}
                           onChange={(e) => setName(e.target.value)}
                           className="form-control" placeholder="Nhập tên banner" />
                     </div>
                     <div className="mb-3">
                        <label><strong>Liên kết</strong></label>
                        <input type="text" value={link}
                           onChange={(e) => setLink(e.target.value)}
                           className="form-control" placeholder="Nhập liên kết" />
                     </div>
                  
                  </div>
                  <div className="col-md-3">
                     <div className="box-container mt-4 bg-white">
                        <div className="box-header py-1 px-2 border-bottom">
                           <strong>Đăng</strong>
                        </div>
                        <div className="box-body p-2 border-bottom">
                           <p>Chọn trạng thái đăng</p>
                           <select value={status}
                              onChange={(e) => setStatus(e.target.value)}
                              className="form-select">
                              <option value="1">Xuất bản</option>
                              <option value="2">Chưa xuất bản</option>
                           </select>
                        </div>
                     <div className="box-container mt-4 bg-white">
                        <div className="box-header py-1 px-2 border-bottom">
                           <strong>Thứ tự</strong>
                        </div>
                        <div className="box-body p-2">
                           <select
                              onChange={(e) => setSortOrder(e.target.value)}
                              value={sort_order} className="form-control">
                              <option value="0">None</option>
                              {banners && banners.length > 0 && banners.map((banner, index) => {
                                 return (<option key={index} value={banner.id}>Sau:{banner.name}</option>
                                 )
                              })}                           </select>

                        </div>
                     </div>
                     </div>
                     <div className="box-container mt-4 bg-white">
                        <div className="box-header py-1 px-2 border-bottom">
                           <strong>Vị trí (*)</strong>
                        </div>
                        <div className="box-body p-2 border-bottom">
                           <select value={position}
                              onChange={(e) => setPosition(e.target.value)}
                              className="form-select">
                              <option value="0">None</option>
                              {banners && banners.length > 0 && banners.map((banner, index) => {
                                 return (<option key={index} value={banner.position}>Sau:{banner.position}</option>
                                 )
                              })}                           </select>

                           <p className="pt-2">Vị trí hiển thị banner</p>
                        </div>
                     </div>
                     <div className="box-container mt-4 bg-white">
                        <div className="box-header py-1 px-2 border-bottom">
                           <strong>Hình (*)</strong>
                        </div>
                        <div className="box-body p-2 border-bottom">
                           <input type="file" id="image" className="form-control" />
                        </div>
                        <div className="box-footer text-end px-2 py-3">
                           <button type="submit" className="btn btn-success btn-sm text-end">
                              <FaSave className="fa fa-save" /> Đăng
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </form>

         </section>
      </div>
   );
}
export default BannerCreate;