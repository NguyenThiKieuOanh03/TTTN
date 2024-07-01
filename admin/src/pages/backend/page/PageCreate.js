import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import PageService from "../../../services/PageService";
import { IoArrowBackSharp } from "react-icons/io5";
import { FaSave } from "react-icons/fa";
import TopicService from "../../../services/TopicService";
const PageCreate = () => {

   const navigate = useNavigate();
   //
   const [topics, setTopics] = useState([]);
   const [title, setTitle] = useState('');
   const [description, setDescription] = useState('');
   const [topic_id, setTopicId] = useState(0);
   const [detail, setDetail] = useState('');
   const [type, setType] = useState('page');
   const [status, setStatus] = useState(1);
   useEffect(function () {
      (async function () {
          await TopicService.index()
              .then(function (result) {
                  setTopics(result.topics)
              });
      })();
  }, []);
   const handleSubmit = (event) => {
      event.preventDefault();
      const image = document.getElementById("image");
      const page = new FormData();
      page.append("title", title);
      page.append("topic_id", topic_id);
      page.append("detail", detail);
      page.append("description", description);
      page.append("type", type);
      page.append("status", status);
      page.append("image", image.files.length === 0 ? "" : image.files[0]);
      (async () => {
         const result = await PageService.store(page);
         alert(result.message);
         navigate('/admin/page/index', { replace: true });
      })();
   };


   return (
      <div className="content">
         <section className="content-header my-2">
            <h1 className="d-inline">Thêm trang đơn</h1>
            <div className="text-end">
               <Link to="/admin/page/index" className="btn btn-sm btn-success">
                  <IoArrowBackSharp className="fa fa-arrow-left" /> Về danh sách
               </Link>
            </div>
         </section>
         <section className="content-body my-2">
            <form onSubmit={handleSubmit}>

               <div className="row">
                  <div className="col-md-9">
                     <div className="mb-3">
                        <label><strong>Tiêu đề bài viết (*)</strong></label>
                        <input type="text" value={title}
                           onChange={(e) => setTitle(e.target.value)} className="form-control" placeholder="Nhập tiêu đề" />
                     </div>
                     <div className="mb-3">
                        <label><strong>Chi tiết (*)</strong></label>
                        <textarea value={detail}
                           onChange={(e) => setDetail(e.target.value)} rows="7" className="form-control"
                           placeholder="Nhập chi tiết"></textarea>
                     </div>
                     <div className="mb-3">
                        <label><strong>Mô tả (*)</strong></label>
                        <textarea value={description}
                           onChange={(e) => setDescription(e.target.value)} rows="4" className="form-control" placeholder="Mô tả"></textarea>
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
                              onChange={(e) => setStatus(e.target.value)} className="form-select">
                              <option value="1">Xuất bản</option>
                              <option value="2">Chưa xuất bản</option>
                           </select>
                        </div>
                     </div>
                     <div className="mb-3">
                        <label htmlFor="topic_id">
                           <strong>Mã chủ đề</strong>
                        </label>
                        <select value={topic_id} onChange={(e) => setTopicId(e.target.value)} className='form-control'>
                                        <option value="0">None</option>
                                        {topics.map(function (topic, index) {
                                            return <option key={index} value={topic.id}>{topic.name}</option>
                                        })}
                                    </select>
                     </div>


                     <div className="box-container mt-2 bg-white">
                        <div className="box-header py-1 px-2 border-bottom">
                           <strong>Hình đại diện</strong>
                        </div>
                        <div className="box-body p-2 border-bottom">
                           <input type="file" id="image" className="form-control" />
                        </div>
                     </div>
                     <div className="box-footer text-end px-2 py-3">
                        <button type="submit" className="btn btn-success btn-sm text-end">
                           <FaSave className="fa fa-save" aria-hidden="true" /> Đăng
                        </button>
                     </div>
                  </div>
               </div>
            </form>

         </section>
      </div>

   );
}

export default PageCreate;