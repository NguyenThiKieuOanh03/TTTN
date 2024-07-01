import { FaTrashAlt, FaUndo } from "react-icons/fa";
import { useEffect, useState } from "react";
import BrandService from "../../../services/BrandService";
import { urlImage } from "../../../config";
import { Link } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";

const BrandTrash = () => {

   const [brands, setBrands] = useState([]);
   const [load, setLoad] = useState(true);
   const [reload, setReLoad] = useState(0);


   useEffect(() => {
      (async () => {
         setLoad(false);
         const result = await BrandService.trash();
         setBrands(result.brands);
         setLoad(true);
      })();
   }, [reload]);
   const handDelete = (id) => {
      (async () => {
         const result = await BrandService.destroy(id);
         alert(result.message);
         setReLoad(Date.now)
      })();
   };
   const handRestore = (id) => {
      (async () => {
         const result = await BrandService.restore(id);
         alert(result.message);
         setReLoad(result.brand.id)
      })();
   };

   return (
      <div className="content">
         <section className="content-header my-2">
            <h1 className="d-inline">Thùng rác thương hiệu</h1>
            <div className="text-end">
               <Link to={"/admin/brand/index"} className="btn btn-sm btn-success">
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
                     <th className="text-center" style={{ width: "130px" }}>Hình ảnh</th>
                     <th>Tên thương hiệu</th>
                     <th>Tên slug</th>
                     <th className="text-center" style={{ width: "30px" }}>ID</th>
                  </tr>
               </thead>
               <tbody>
                  {brands && brands.length > 0 && brands.map((brand, index) => {
                     return (

                        <tr className="datarow">
                           <td className="text-center">
                              <input type="checkbox" id="checkId" />
                           </td>
                           <td>
                              <img
                                 className="img-fluid"
                                 src={urlImage + "brand/" + brand.image}
                                 alt={brand.image}
                              />
                           </td>
                           <td>
                              <div className="name">
                                 <a href="brand_index.html">
                                    {brand.name}
                                 </a>
                              </div>
                              <div className="function_style">
                                 <button onClick={() => handRestore(brand.id)} className="border-0 fa fa-undo text-primary mx-1" >
                                    <FaUndo />
                                 </button>

                                 <button onClick={() => handDelete(brand.id)} className="border-0 fa fa-trash text-danger mx-1" >
                                    <FaTrashAlt />
                                 </button>
                              </div>
                           </td>
                           <td>{brand.slug}</td>
                           <td className="text-center">{brand.id}</td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>

         </section>
      </div>

   );
}

export default BrandTrash;