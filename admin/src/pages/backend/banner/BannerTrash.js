import { FaTrashAlt, FaUndo } from "react-icons/fa";
import { useEffect, useState } from "react";
import BannerService from "../../../services/BannerService";
import { urlImage } from "../../../config";
import { Link } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";

const BannerTrash = () => {
   const [banners, setBanners] = useState([]);
   const [load, setLoad] = useState(true);
   const [reload, setReLoad] = useState(0);

   useEffect(() => {
      (async () => {
         setLoad(false);
         const result = await BannerService.trash();
         setBanners(result.banners);
         setLoad(true);
      })();
   }, [reload]);
   const handDelete = (id) => {
      (async () => {
         const result = await BannerService.destroy(id);
         alert(result.message);
         setReLoad(Date.now)
      })();
   };
   const handRestore = (id) => {
      (async () => {
         const result = await BannerService.restore(id);
         alert(result.message);
         setReLoad(result.banner.id)
      })();
   };

   return (
      <div className="content">
         <section className="content-header my-2">
            <h1 className="d-inline">Thùng rác Banner</h1>
            <div className="text-end">
               <Link to={"/admin/banner/index"} className="btn btn-sm btn-success">
                  <IoArrowBackSharp className="fa fa-arrow-left" /> Về danh sách
               </Link>
            </div>
         </section>
         <section className="content-body my-2">

            <table className="table table-bordered">
               <thead>
                  <tr>
                     <th className="text-center" style={{ width: "30px" }}>
                        <input type="checkbox" id="checkboxAll" />
                     </th>
                     <th className="text-center" style={{ width: "90px" }}>Hình ảnh</th>
                     <th>Tên banner</th>
                     <th>Liên kết</th>
                     <th>Vị trí</th>
                     <th className="text-center" style={{ width: "30px" }}>ID</th>
                  </tr>
               </thead>
               <tbody>
                  {banners && banners.length > 0 && banners.map((banner, index) => {
                     return (

                        <tr className="datarow">
                           <td className="text-center">
                              <input type="checkbox" />
                           </td>
                           <td>
                              <img className="img-fluid" src={urlImage + "banner/" + banner.image}
                                 alt={banner.image} />
                           </td>
                           <td>
                              <div className="name">
                                 <a href="banner_edit.html">
                                    {banner.name}
                                 </a>
                              </div>
                              <div className="function_style">
                                 <button onClick={() => handRestore(banner.id)} className="border-0 fa fa-undo text-primary mx-1" >
                                    <FaUndo />
                                 </button>

                                 <button onClick={() => handDelete(banner.id)} className="border-0 fa fa-trash text-danger mx-1" >
                                    <FaTrashAlt />
                                 </button>

                              </div>
                           </td>
                           <td>{banner.link}</td>
                           <td>{banner.position}</td>
                           <td className="text-center">{banner.id}</td>
                        </tr>

                     );
                  })}
               </tbody>
            </table>

         </section>
      </div>

   );
}

export default BannerTrash;