import { useEffect,useState } from "react";
import { useParams,useNavigate, Link } from "react-router-dom";
import TopicService from "../../../services/TopicService";
import {toast} from "react-toastify";
import { IoArrowBackSharp } from "react-icons/io5";
import { FaSave } from "react-icons/fa";
const TopicEdit = () => {

   const {id}=useParams();
   const navigate = useNavigate();

   const [name, setName] = useState('');
   const [slug, setSlug] = useState('');
   const [description, setDescription] = useState('');
   const [sort_order, setSortOrder] = useState(1);
   const [status, setStatus] = useState(1);

   useEffect(()=>{
      (async ()=>{
         const result = await TopicService.show(id);
         const topic = result.topic;
         setName(topic.name);
         setDescription(topic.description);
         setSortOrder(topic.sort_order);
         setStatus(topic.status);
         setSlug(topic.slug);
      })();
   },[id]);

   const handleSubmit = (e)=>{
      e.preventDefault();
      const topic = new FormData();
      topic.append("name", name);
      topic.append("slug", slug);
      topic.append("description", description);
      topic.append("sort_order", sort_order);
      topic.append("status", status);
      (async()=>{
         const result= await TopicService.update(topic,id);
         toast.success(result.message);
         navigate("/admin/topic/index",{replace:true});
      })();

   };

    return ( 
      <form onSubmit={handleSubmit}>
        <div className="content">
        <section className="content-header my-2">
           <h1 className="d-inline">Cập nhật chủ đề</h1>
           <div className="text-end">
           <Link to={"/admin/topic/index"} className="btn btn-sm btn-success">
                 <IoArrowBackSharp className="fa fa-arrow-left"/> Về danh sách
              </Link>
           </div>
        </section>
        <section className="content-body my-2">

           <div className="row">
              <div className="col-md-9">
                 <div className="mb-3">
                    <label><strong>Tên chủ đề (*)</strong></label>
                    <input type="text" onChange={(e) => setName(e.target.value)}
                           value={name} placeholder="Nhập tên chủ đề"
                       className="form-control" required />
                 </div>
                 <div className="mb-3">
                    <label><strong>Slug</strong></label>
                    <input type="text" onChange={(e) => setSlug(e.target.value)}
                           value={slug} placeholder="Nhập slug" className="form-control" />
                 </div>
                 <div className="mb-3">
                    <label><strong>Mô tả</strong></label>
                    <textarea onChange={(e) => setDescription(e.target.value)}
                           value={description} rows="6" className="form-control"
                       placeholder="Nhập mô tả"></textarea>
                 </div>
              </div>
              <div className="col-md-3">
                 <div className="box-container mt-4 bg-white">
                    <div className="box-header py-1 px-2 border-bottom">
                       <strong>Đăng</strong>
                    </div>
                    <div className="box-body p-2 border-bottom">
                       <p>Chọn trạng thái đăng</p>
                       <select onChange={(e) => setStatus(e.target.value)}
                           value={status} className="form-select">
                          <option value="1">Xuất bản</option>
                          <option value="2">Chưa xuất bản</option>
                       </select>
                    </div>
                 </div>
                 <div className="box-container mt-4 bg-white">
                    <div className="box-header py-1 px-2 border-bottom">
                       <strong>Thứ tự</strong>
                    </div>
                    <div className="box-body p-2 border-bottom">
                       <select onChange={(e) => setSortOrder(e.target.value)}
                           value={sort_order} className="form-select">
                          <option value="">Sau</option>
                          <option value="2">sau</option>
                       </select>
                    </div>
                 </div>
                 <div className="box-footer text-end px-2 py-3">
                       <button type="submit" className="btn btn-success btn-sm text-end">
                          <FaSave className="fa fa-save" aria-hidden="true"/> Đăng
                       </button>
                    </div>
              </div>
           </div>

        </section>
     </div>
</form>
     );
}
 
export default TopicEdit;