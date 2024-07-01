import { FaTrashAlt, FaUndo } from "react-icons/fa";
import { useEffect, useState } from "react";
import ProductService from "../../../services/ProductService";
import { urlImage } from "../../../config";
import { Link } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";

const ProductTrash = () => {

   const [products, setProducts] = useState([]);
   const [load, setLoad] = useState(true);
   const [reload, setReLoad] = useState(0);

   useEffect(() => {
      (async () => {
         setLoad(false);
         const result = await ProductService.trash();
         setProducts(result.products);
         setLoad(true);
      })();
   }, [reload]);
   const handDelete = (id) => {
      (async () => {
         const result = await ProductService.destroy(id);
         alert(result.message);
         setReLoad(Date.now)
      })();
   };
   const handRestore = (id) => {
      (async () => {
         const result = await ProductService.restore(id);
         alert(result.message);
         setReLoad(result.product.id)
      })();
   };


    return ( 
        <div className="content">
        <section className="content-header my-2">
           <h1 className="d-inline">Thùng rác sản phẩm</h1>
           <div className="text-end">
               <Link to={"/admin/product/index"} className="btn btn-sm btn-success">
                  <IoArrowBackSharp className="fa fa-arrow-left" /> Về danh sách
               </Link>
               </div>
        </section>
        <section className="content-body my-2">

           <table className="table table-bordered">
              <thead>
                 <tr>
                    <th className="text-center" style={{width:"30px"}}>
                       <input type="checkbox" id="checkboxAll" />
                    </th>
                    <th className="text-center" style={{width:"130px"}}>Hình ảnh</th>
                    <th>Tên sản phẩm</th>
                    <th>Tên danh mục</th>
                    <th>Tên thương hiệu</th>
                    <th className="text-center" style={{width:"30px"}}>ID</th>
                 </tr>
              </thead>
              <tbody>
              {products && products.length > 0 && products.map((product, index) => {
                     return (
                 <tr className="datarow">
                    <td>
                       <input type="checkbox" id="checkId" />
                    </td>
                    <td>
                       <img className="img-fluid" src={urlImage + "product/" + product.image} alt={product.image}/>
                    </td>
                    <td>
                       <div className="name">
                          <a href="product_edit.html">
                          {product.name}
                          </a>
                       </div>
                       <div className="function_style">
                                 <button onClick={() => handRestore(product.id)} className="border-0 fa fa-undo text-primary mx-1" >
                                    <FaUndo />
                                 </button>

                                 <button onClick={() => handDelete(product.id)} className="border-0 fa fa-trash text-danger mx-1" >
                                    <FaTrashAlt />
                                 </button>
                              </div>

                    </td>
                    <td>{product.category_id}</td>
                    <td>{product.brand_id}</td>
                    <td className="text-center">{product.id}</td>
                 </tr>
                  );
               })}
              </tbody>
           </table>

        </section>
     </div>

     );
}
 
export default ProductTrash;