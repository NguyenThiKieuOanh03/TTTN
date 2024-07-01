import ProductService from "../../../services/ProductService";
import { useEffect, useState } from "react";
import { urlImage } from "../../../config";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../../LoadingSpinner";
import { FaEye, FaPlus, FaRegEdit, FaToggleOff, FaToggleOn, FaTrash, FaTrashAlt } from "react-icons/fa";

const ProductIndex = () => {

   const[products,setProducts]=useState([]);
   const [load, setLoad] = useState(false);
   const [reload,setReload]=useState(0);

   useEffect(() => {
      (async () => {
         setLoad(true);
         const result = await ProductService.index();
         setProducts(result.products);
         setLoad(false);
      })();
   }, [reload]);

   const handDelete = (id) => {
      (async () => {
         const result = await ProductService.delete(id);
         setReload(Date.now);
      })();
   };
   const handleStatus = (id) => {
      (async () => {
         const result = await ProductService.status(id);
         setReload(Date.now);

      })();
   };


    return ( 
        <div className="content">
        <section className="content-header my-2">
           <h1 className="d-inline">Sản phẩm</h1>
           <div className="col-md-12 text-end">
           <Link to="/admin/product/create" className="btn btn-sm btn-success" ><FaPlus/>Thêm</Link>
           <Link to="/admin/product/trash" className="btn btn-sm btn-danger" ><FaTrash />  Thùng Rác</Link>
</div>
        </section>
        <section className="content-body my-2">
        {load ? <LoadingSpinner /> : ""}

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
                    <th>ID</th>
                 </tr>
              </thead>
              <tbody>
              {products && products.map((product, index) => {
                return (

                 <tr className="datarow" key={index}>
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
                       <button onClick={()=>handleStatus(product.id)}
                                      className={
                                       product.status ===1
                                       ?"border-0 px-1 text-success"
                                       :"border-0 px-1 text-danger"

                                      }>
                                       {product.status===1?<FaToggleOn/>:<FaToggleOff/>}
                                      </button>

                                      <Link to ={"/admin/product/edit/" + product.id} className="px-1 text-primary">
                                          <FaRegEdit />
                                       </Link>
                                       <Link to={"/admin/product/show/"+product.id} className="px-1 text-info">
                                          <FaEye/>
                                       </Link>
                                       <button onClick={()=>handDelete(product.id)}
                                        className="border-0 px-1 text-danger">
                                          <FaTrashAlt />
                                       </button>

                       </div>



                    </td>
                    <td>{product.catname}</td>
                    <td>{product.brname}</td>
                    <td className="text-center" style={{width:"30px"}}>{product.id}</td>
                 </tr>
                  );
               })}
              </tbody>
           </table>

        </section>
     </div>

     );
}
 
export default ProductIndex;