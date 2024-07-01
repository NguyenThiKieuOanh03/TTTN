import { FaRegEdit, FaTrash } from "react-icons/fa";
import { IoArrowBackSharp } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PostService from "../../../services/PostService";

const PostShow = () => {

   const [reload, setReload] = useState(0);
   const { id } = useParams();
   const navigate = useNavigate();

   const [title, setTitle] = useState('');
   const [slug, setSlug] = useState('');
   const [description, setDescription] = useState('');
   const [topic_id, setTopicId] = useState(0);
   const [detail, setDetail] = useState('');
   const [type, setType] = useState('post');
   const [status, setStatus] = useState(1);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const result = await PostService.show(id);
            const post = result.post;
            setTitle(post.title);
            setSlug(post.slug);
            setDescription(post.description);
            setTopicId(post.topic_id);
            setDetail(post.detail);
            setStatus(post.status);
         } catch (error) {
            console.error("Error fetching post:", error);
         }
      };
      fetchData();
   }, [id, reload]);

   const handleDelete = async (id) => {
      try {
         const result = await PostService.destroy(id);
         setReload(reload + 1);
         navigate("/admin/post/index");
      } catch (error) {
         console.error("Error deleting post:", error);
      }
   };

   return (
      <div className="content">
         <section className="content-header my-2">
            <h1 className="d-inline">Chi tiết</h1>
            <div className="row mt-2 align-items-center">
               <div className="col-md-12 text-end">
                  <Link to={"/admin/post/index"} className="btn btn-primary btn-sm">
                     <IoArrowBackSharp /> Về danh sách
                  </Link>
                  <Link to={"/admin/post/edit/" + id} className="btn btn-success btn-sm">
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
                     <th className="text-center">Topic_Id</th>
                     <td className="text-center">{topic_id}</td>
                  </tr>
                  <tr>
                     <th className="text-center">Slug</th>
                     <td className="text-center">{slug}</td>
                  </tr>

                  <tr>
                     <th className="text-center">Tiêu đề</th>
                     <td className="text-center">{title}</td>
                  </tr>

                  <tr>
                     <th className="text-center">Chi tiết</th>
                     <td className="text-center">{detail}</td>
                  </tr>


                  <tr>
                     <th className="text-center">Mô tả</th>
                     <td className="text-center">{description}</td>
                  </tr>

                  <tr>
                     <th className="text-center">Kiểu</th>
                     <td className="text-center">{type}</td>
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

export default PostShow;