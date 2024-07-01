import PageService from "../../../services/PageService";
import { useEffect, useState } from "react";
import { urlImage } from "../../../config";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../../LoadingSpinner";
import { FaEye, FaPlus, FaRegEdit, FaToggleOff, FaToggleOn, FaTrash, FaTrashAlt } from "react-icons/fa";
const PageIndex = () => {

   const [pages, setPages] = useState([]);
   const [load, setLoad] = useState(false);
   const [reload, setReload] = useState(0);

   useEffect(() => {
      (async () => {
         setLoad(true);
         const result = await PageService.index();
         setPages(result.pages);
         setLoad(false);
      })();
   }, [reload]);

   const handDelete = (id) => {
      (async () => {
         const result = await PageService.delete(id);
         setReload(result.page.id)
      })();
   };
   const handleStatus = (id) => {
      (async () => {
         const result = await PageService.status(id);
         setReload(Date.now);

      })();
   };


   return (
      <div className="content">
         <section className="content-header my-2">
            <h1 className="d-inline">Quản lý trang đơn</h1>
            <div className="col-md-12 text-end">
               <Link to="/admin/page/create" className="btn btn-sm btn-success" ><FaPlus />Thêm</Link>
               <Link to="/admin/page/trash" className="btn btn-sm btn-danger" ><FaTrash />  Thùng Rác</Link>
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
                     <th>Tên trang đơn</th>
                     <th>slug</th>
                     <th className="text-center" style={{ width: "30px" }}>ID</th>
                  </tr>
               </thead>
               <tbody>
                  {pages && pages.map((page, index) => {
                     return (


                        <tr className="datarow" key={index}>
                           <td>
                              <input type="checkbox" id="checkId" />
                           </td>
                           <td>
                              <img className="img-fluid" src={urlImage + "post/" + page.image} alt={page.image} />
                           </td>
                           <td>
                              <div className="name">
                                 <a href="page_index.html">
                                    {page.title}
                                 </a>
                              </div>
                              <div className="function_style">
                                 <button onClick={() => handleStatus(page.id)}
                                    className={
                                       page.status === 1
                                          ? "border-0 px-1 text-success"
                                          : "border-0 px-1 text-danger"

                                    }>
                                    {page.status === 1 ? <FaToggleOn /> : <FaToggleOff />}
                                 </button>

                                 <Link to={"/admin/page/edit/" + page.id} className="px-1 text-primary">
                                    <FaRegEdit />
                                 </Link>
                                 <Link to={"/admin/page/show/" + page.id} className="px-1 text-info">
                                    <FaEye />
                                 </Link>
                                 <button onClick={() => handDelete(page.id)}
                                    className="border-0 px-1 text-danger">
                                    <FaTrashAlt />
                                 </button>

                              </div>

                           </td>
                           <td>{page.slug}</td>
                           <td className="text-center">{page.id}</td>

                        </tr>
                     );
                  })}
               </tbody>
            </table>

         </section>
      </div>

   );
}

export default PageIndex;