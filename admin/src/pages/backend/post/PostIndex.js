import PostService from "../../../services/PostService";
import { useEffect, useState } from "react";
import { urlImage } from "../../../config";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../../LoadingSpinner";
import { FaEye, FaPlus, FaRegEdit, FaToggleOff, FaToggleOn, FaTrash, FaTrashAlt } from "react-icons/fa";
const PostIndex = () => {

   const [posts, setPosts] = useState([]);
   const [load, setLoad] = useState(false);
   const [reload, setReload] = useState(0);

   useEffect(() => {
      (async () => {
         setLoad(true);
         const result = await PostService.index();
         setPosts(result.posts);
         setLoad(false);
      })();
   }, [reload]);

   const handDelete = (id) => {
      (async () => {
         const result = await PostService.delete(id);
         setReload(Date.now);
      })();
   };
   const handleStatus = (id) => {
      (async () => {
         const result = await PostService.status(id);
         setReload(Date.now);

      })();
   };


   return (
      <div className="content">
         <section className="content-header my-2">
            <h1 className="d-inline">Quản lý bài viết</h1>
            <div className="col-md-12 text-end">
               <Link to="/admin/post/create" className="btn btn-sm btn-success" ><FaPlus />Thêm</Link>
               <Link to="/admin/post/trash" className="btn btn-sm btn-danger" ><FaTrash />  Thùng Rác</Link>
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
                     <th className="text-center" style={{ width: "130px" }}>Hình ảnh</th>
                     <th>Tiêu đề bài viết</th>
                     <th>Slug</th>
                     <th className="text-center" style={{ width: "30px" }}>ID</th>
                  </tr>
               </thead>
               <tbody>
                  {posts && posts.map((post, index) => {
                     return (


                        <tr className="datarow" key={index}>
                           <td>
                              <input type="checkbox" id="checkId" />
                           </td>
                           <td>
                              <img className="img-fluid" src={urlImage + "post/" + post.image} />
                           </td>
                           <td>
                              <div className="name">
                                 <a href="post_edit.html">
                                    {post.title}
                                 </a>
                              </div>
                              <div className="function_style">
                                 <button onClick={() => handleStatus(post.id)}
                                    className={
                                       post.status === 1
                                          ? "border-0 px-1 text-success"
                                          : "border-0 px-1 text-danger"

                                    }>
                                    {post.status === 1 ? <FaToggleOn /> : <FaToggleOff />}
                                 </button>

                                 <Link to={"/admin/post/edit/" + post.id} className="px-1 text-primary">
                                    <FaRegEdit />
                                 </Link>
                                 <Link to={"/admin/post/show/" + post.id} className="px-1 text-info">
                                    <FaEye />
                                 </Link>
                                 <button onClick={() => handDelete(post.id)}
                                    className="border-0 px-1 text-danger">
                                    <FaTrashAlt />
                                 </button>

                              </div>


                           </td>
                           <td>{post.slug}</td>
                           <td className="text-center">{post.id}</td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>

         </section>
      </div>

   );
}

export default PostIndex;