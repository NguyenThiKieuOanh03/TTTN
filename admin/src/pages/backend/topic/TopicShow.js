import { FaRegEdit, FaTrash} from "react-icons/fa";
import { IoArrowBackSharp } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TopicService from "../../../services/TopicService";
const TopicShow = () => {

   const [reload, setReload] = useState(0);
   const { id } = useParams();
   const navigate = useNavigate();

   const [name, setName] = useState('');
   const [slug, setSlug] = useState('');
   const [description, setDescription] = useState('');
   const [sort_order, setSortOrder] = useState(1);
   const [status, setStatus] = useState(1);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const result = await TopicService.show(id);
            const topic = result.topic;
            setName(topic.name);
            setDescription(topic.description);
            setSortOrder(topic.sort_order);
            setStatus(topic.status);
            setSlug(topic.slug);
         } catch (error) {
            console.error("Error fetching topic:", error);
         }
      };
      fetchData();
   }, [id, reload]);

   const handleDelete = async (id) => {
      try {
         const result = await TopicService.destroy(id);
         setReload(reload + 1);
         navigate("/admin/topic/index");
      } catch (error) {
         console.error("Error deleting topic:", error);
      }
   };



    return ( 
        <div className="content">
        <section className="content-header my-2">
           <h1 className="d-inline">Chi tiết</h1>
           <div className="row mt-2 align-items-center">
              <div className="col-md-12 text-end">
              <Link to={"/admin/topic/index"} className="btn btn-primary btn-sm">
                     <IoArrowBackSharp /> Về danh sách
                  </Link>
                  <Link to={"/admin/topic/edit/" + id} className="btn btn-success btn-sm">
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
                    <th style={{width:"180px"}}>Tên trường</th>
                    <th className="text-center">Giá trị</th>
                 </tr>
              </thead>
              <tbody>
                  <tr>
                     <th className="text-center">Id</th>
                     <td className="text-center">{id}</td>
                  </tr>

                  <tr>
                     <th className="text-center">Tên thương hiệu</th>
                     <td className="text-center">{name}</td>
                  </tr>

                  <tr>
                     <th className="text-center">Slug</th>
                     <td className="text-center">{slug}</td>
                  </tr>


                  <tr>
                     <th className="text-center">Mô tả</th>
                     <td className="text-center">{description}</td>
                  </tr>

                  <tr>
                     <th className="text-center">Sắp xếp</th>
                     <td className="text-center">{sort_order}</td>
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
 
export default TopicShow;