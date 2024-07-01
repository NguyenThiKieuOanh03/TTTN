import { FaRegEdit, FaTrash } from "react-icons/fa";
import { IoArrowBackSharp } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BannerService from "../../../services/BannerService";
const BannerShow = () => {

   const [reload, setReload] = useState(0);

   const { id } = useParams();
   const navigate = useNavigate();

   const [name, setName] = useState('');
   const [link, setLink] = useState('');
   const [description, setDescription] = useState('');
   const [position, setPosition] = useState('');
   const [status, setStatus] = useState(1);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const result = await BannerService.show(id);
            const banner = result.banner;
            setName(banner.name);
            setDescription(banner.description);
            setPosition(banner.position);
            setStatus(banner.status);
            setLink(banner.link);
         } catch (error) {
            console.error("Error fetching banner:", error);
         }
      };
      fetchData();
   }, [id, reload]);

   const handleDelete = async (id) => {
      try {
         const result = await BannerService.destroy(id);
         setReload(reload + 1);
         navigate("/admin/banner/index");
      } catch (error) {
         console.error("Error deleting banner:", error);
      }
   };


   return (
      <div className="content">
         <section className="content-header my-2">
            <h1 className="d-inline">Chi tiết</h1>
            <div className="row mt-2 align-items-center">
               <div className="col-md-12 text-end">
                  <Link to={"/admin/banner/index"} className="btn btn-primary btn-sm">
                     <IoArrowBackSharp /> Về danh sách
                  </Link>
                  <Link to={"/admin/banner/edit/" + id} className="btn btn-success btn-sm">
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
                     <th style={{ width: "180px" }}>Tên trường</th>
                     <th className="text-center">Giá trị</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <th className="text-center">Id</th>
                     <td className="text-center">{id}</td>
                  </tr>

                  <tr>
                     <th className="text-center">Tên Banner</th>
                     <td className="text-center">{name}</td>
                  </tr>

                  <tr>
                     <th className="text-center">Link</th>
                     <td className="text-center">{link}</td>
                  </tr>

                  <tr>
                     <th className="text-center">Vị Trí</th>
                     <td className="text-center">{position}</td>
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

export default BannerShow;