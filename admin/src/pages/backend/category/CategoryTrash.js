import { FaTrashAlt, FaUndo } from "react-icons/fa";
import { useEffect, useState } from "react";
import CategoryService from "../../../services/CategoryService";
import { urlImage } from "../../../config";
import { Link } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
const CategoryTrash = () => {

   const [categorys, setCategorys] = useState([]);
   const [load, setLoad] = useState(true);
   const [reload, setReLoad] = useState(0);

   useEffect(() => {
      (async () => {
         setLoad(false);
         const result = await CategoryService.trash();
         setCategorys(result.categorys);
         setLoad(true);
      })();
   }, [reload]);
   const handDelete = (id) => {
      (async () => {
         const result = await CategoryService.destroy(id);
         alert(result.message);
         setReLoad(Date.now)
      })();
   };
   const handRestore = (id) => {
      (async () => {
         const result = await CategoryService.restore(id);
         alert(result.message);
         setReLoad(result.category.id)
      })();
   };

   return (
      <div className="content">
         <section className="content-header my-2">
            <h1 className="d-inline">Thùng rác danh mục</h1>
            <div className="text-end">
               <Link to={"/admin/category/index"} className="btn btn-sm btn-success">
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
                     <th>Tên danh mục</th>
                     <th>Tên slug</th>
                  </tr>
               </thead>
               <tbody>
                  {categorys && categorys.length > 0 && categorys.map((category, index) => {
                     return (
                        <tr className="datarow">
                           <td className="text-center">
                              <input type="checkbox" id="checkId" />
                           </td>
                           <td>
                              <img className="img-fluid" src={urlImage + "category/" + category.image} alt={category.image} />
                           </td>
                           <td>
                              <div className="name">
                                 <a href="category_index.html">
                                    {category.name}
                                 </a>
                              </div>
                              <div className="function_style">
                                 <button onClick={() => handRestore(category.id)} className="border-0 fa fa-undo text-primary mx-1" >
                                    <FaUndo />
                                 </button>

                                 <button onClick={() => handDelete(category.id)} className="border-0 fa fa-trash text-danger mx-1" >
                                    <FaTrashAlt />
                                 </button>
                              </div>

                           </td>
                           <td>{category.slug}</td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>

         </section>
      </div>

   );
}

export default CategoryTrash;