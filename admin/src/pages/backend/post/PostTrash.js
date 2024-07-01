import { FaTrashAlt, FaUndo } from "react-icons/fa";
import { useEffect, useState } from "react";
import PostService from "../../../services/PostService";
import { urlImage } from "../../../config";
import { Link } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";

const PostTrash = () => {
   const [posts, setPosts] = useState([]);
   const [load, setLoad] = useState(true);
   const [reload, setReLoad] = useState(0);

   useEffect(() => {
      (async () => {
         setLoad(false);
         const result = await PostService.trash();
         setPosts(result.posts);
         setLoad(true);
      })();
   }, [reload]);
   const handDelete = (id) => {
      (async () => {
         const result = await PostService.destroy(id);
         alert(result.message);
         setReLoad(Date.now)
      })();
   };
   const handRestore = (id) => {
      (async () => {
         const result = await PostService.restore(id);
         alert(result.message);
         setReLoad(result.post.id)
      })();
   };

   return (
      <div class="content">
         <section class="content-header my-2">
            <h1 class="d-inline">Thùng rác bài viết</h1>
            <div className="text-end">
               <Link to={"/admin/post/index"} className="btn btn-sm btn-success">
                  <IoArrowBackSharp className="fa fa-arrow-left" /> Về danh sách
               </Link>
            </div>
         </section>
         <section class="content-body my-2">

            <table class="table table-bordered">
               <thead>
                  <tr>
                     <th class="text-center" style={{ width: "30px" }}>
                        <input type="checkbox" id="checkboxAll" />
                     </th>
                     <th class="text-center" style={{ width: "130px" }}>Hình ảnh</th>
                     <th>Tiêu đề bài viết</th>
                     <th>Tên danh mục</th>
                     <th class="text-center" style={{ width: "30px" }}>ID</th>
                  </tr>
               </thead>
               <tbody>
                  {posts && posts.length > 0 && posts.map((post, index) => {
                     return (

                        <tr class="datarow">
                           <td>
                              <input type="checkbox" id="checkId" />
                           </td>
                           <td>
                              <img class="img-fluid" src={urlImage + "post/" + post.image} />
                           </td>
                           <td>
                              <div class="name">
                                 <a href="post_edit.html">
                                    {post.title}
                                 </a>
                              </div>
                              <div className="function_style">
                                 <button onClick={() => handRestore(post.id)} className="border-0 fa fa-undo text-primary mx-1" >
                                    <FaUndo />
                                 </button>

                                 <button onClick={() => handDelete(post.id)} className="border-0 fa fa-trash text-danger mx-1" >
                                    <FaTrashAlt />
                                 </button>

                              </div>

                           </td>
                           <td>{post.slug}</td>
                           <td class="text-center">{post.id}</td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>

         </section>
      </div>

   );
}

export default PostTrash;