import BannerService from "../../../services/BannerService";
import { useEffect, useState } from "react";
import { FaEye, FaPlus, FaRegEdit, FaToggleOff, FaToggleOn, FaTrash, FaTrashAlt } from "react-icons/fa";
import { urlImage } from "../../../config";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../../LoadingSpinner";
const BannerIndex = () => {
   const [banners, setBanners] = useState([]);
   const [load, setLoad] = useState(false);
   const [reload, setReload] = useState(0);

   useEffect(() => {
      (async () => {
         setLoad(true);
         const result = await BannerService.index();
         setBanners(result.banners);
         setLoad(false);
      })();
   }, [reload]);

   const handDelete = (id) => {
      (async () => {
         const result = await BannerService.delete(id);
         setReload(Date.now);
      })();
   };
   const handleStatus = (id) => {
      (async () => {
         const result = await BannerService.status(id);
         setReload(Date.now);

      })();
   };

   return (
      <div className="content">
         <section className="content-header my-2">
            <h1 className="d-inline">Banner</h1>
            <div className="col-md-12 text-end">
               <Link to="/admin/banner/create" className="btn btn-sm btn-success" ><FaPlus />Thêm</Link>
               <Link to="/admin/banner/trash" className="btn btn-sm btn-danger" ><FaTrash />  Thùng Rác</Link>
            </div>
         </section>
         <section className="content-body my-2">
            {load ? <LoadingSpinner /> : ""}

            <table className="table table-bordered">
               <thead>
                  <tr>
                     <th className="text-center" style={{ width: "30px" }}>
                        <input type="checkbox" id="checkboxAll" />
                     </th>
                     <th className="text-center" style={{ width: "90px" }}>Hình ảnh</th>
                     <th>Tên banner</th>
                     <th>Vị trí</th>
                     <th>Liên kết</th>
                     <th className="text-center" style={{ width: "30px" }}>ID</th>
                  </tr>
               </thead>
               <tbody>
                  {banners && banners.map((banner, index) => {
                     return (
                        <tr className="datarow" key={index}>
                           <td className="text-center">
                              <input type="checkbox" />
                           </td>
                           <td>
                              <img className="img-fluid" src={urlImage + "banner/" + banner.image} alt={banner.image} />
                           </td>
                           <td>
                              <div className="name">
                                 <a href="banner_edit.html">
                                    {banner.name}
                                 </a>
                              </div>
                              <div className="function_style">
                                 <button onClick={() => handleStatus(banner.id)}
                                    className={
                                       banner.status === 1
                                          ? "border-0 px-1 text-success"
                                          : "border-0 px-1 text-danger"

                                    }>
                                    {banner.status === 1 ? <FaToggleOn /> : <FaToggleOff />}
                                 </button>


                                 <Link to={"/admin/banner/edit/" + banner.id} className="px-1 text-primary">
                                    <FaRegEdit />
                                 </Link>
                                 <Link to={"/admin/banner/show/" + banner.id} className="px-1 text-info">
                                    <FaEye />
                                 </Link>
                                 <button onClick={() => handDelete(banner.id)}
                                    className="border-0 px-1 text-danger">
                                    <FaTrashAlt />
                                 </button>


                              </div>
                           </td>
                           <td>{banner.position}</td>
                           <td>{banner.link}</td>
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

export default BannerIndex;