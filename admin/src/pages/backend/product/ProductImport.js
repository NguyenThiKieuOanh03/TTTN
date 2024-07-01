import { useEffect, useState } from "react";
import LoadingSpinner from "../../../LoadingSpinner";
import ProductService from "../../../services/ProductService";
import { FaPlus } from "react-icons/fa";
import { urlImage } from "../../../config";


const ProductImport = () => {
   const [products, setProducts] = useState([]);
   const [load, setLoad] = useState(false);

   useEffect(function () {
      setLoad(true);
      (async function () {
         const result = await ProductService.getStore();
         setProducts(result.products);
         setLoad(false);
      })();
   }, []);
   const handleImportProductById = (id) => {
      const qty = document.getElementById("qty" + id).value;
      const priceroot = document.getElementById("price" + id).value;
      const productstore = {
         id: id,
         qty: qty,
         priceroot: priceroot,
      };
      (async function () {
         const result = await ProductService.storeStore(productstore);
      })();
      alert("Thêm dữ liệu thành công");
   }
   return (
      <div className="content">
         <section className="content-header my-2">
            <h1 className="d-inline">Nhập sản phẩm</h1>
            <div className="col-md-12 text-end">
            <button
               type="button"
               className="btn btn-sm btn-success"
               data-bs-toggle="modal"
               data-bs-target="#staticBackdrop">Nhập hàng</button>
            </div>
            <div
               className="modal fade"
               id="staticBackdrop"
               data-bs-backdrop="static"
               data-bs-keyboard="false"
               tabIndex="-1"
               aria-labelledby="staticBackdropLabel"
               aria-hidden="true"
            >
               <div className="modal-dialog modal-xl">
                  <div className="modal-content">
                     <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">
                           TẤT CẢ SẢN PHẨM
                        </h1>
                        <button
                           type="button"
                           className="btn-close"
                           data-bs-dismiss="modal"
                           aria-label="Close"
                        ></button>
                     </div>
                     <div className="modal-body">
                        <table className="table table-bordered table-striped table-hover">
                           <thead>
                              <tr>
                                 <th className="text-center" style={{ width: "130px" }}>Hình ảnh</th>
                                 <th>Tên sản phẩm</th>
                                 <th style={{ width: "90px" }} className="text-center">Số lượng</th>
                                 <th style={{ width: "180px" }} className="text-center">Giá nhập</th>
                                 <th style={{ width: "60px" }}></th>
                              </tr>
                           </thead>
                           <tbody>
                              {products && products.map(function (product, index) {
                                 return (
                                    <tr className="datarow" key={index}>
                                       <td>
                                          <img className="img-fluid" src={urlImage + "product/" + product.image} alt="Hinh" />
                                       </td>
                                       <td>{product.name}</td>
                                       <td>
                                          <input type="number" id={"qty" + product.id} style={{ width: 60 }} min="0" />
                                       </td>
                                       <td>
                                          <input type="number" id={"price" + product.id} step="1000" max={product.price} />
                                       </td>
                                       <td className="text-center">
                                          <button
                                             type="button"
                                             onClick={() => handleImportProductById(product.id)}
                                             className="btn btn-sm btn-success">
                                             <FaPlus />
                                          </button>
                                       </td>
                                    </tr>
                                 )
                              })}
                           </tbody>
                        </table>
                     </div>
                     <div className="modal-footer">
                        <button
                           type="button"
                           className="btn btn-secondary"
                           data-bs-dismiss="modal"
                        >
                           Close
                        </button>
                        <button type="button" className="btn btn-primary">
                           Understood
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <section className="content-body my-2">
            {load ? <LoadingSpinner /> : ""}

            <table className="table table-bordered table-striped" id="mytable">
               <thead>
                  <tr>
                     <th className="text-center" style={{ width: "50px" }}>Hình</th>
                     <th>Tên sản phẩm</th><th>Tên danh mục</th>
                     <th>Tên thương hiệu</th>
                     <th>Số lượng</th>
                     <th>Giá nhập</th>
                     <th></th>
                  </tr>
               </thead>
               <tbody>
                  {products && products.map((product, index) => {
                     return (
                        <tr className="datarow" key={index}>
                           <td>
                              <img src={urlImage + "product/" + product.image} className="img-fluid"
                                 alt="Hinh" />
                           </td>
                           <td>{product.name}</td>
                           <td>{product.categoryname}</td>
                           <td>{product.brandname}</td>
                           <td>{product.sum_qty || 0}</td>
                           <td>{product.avg_priceroot}</td>
                           <td className="text-center">
                              <button
                                 type="button"
                                 className="btn btn-sm btn-success"
                                 data-bs-toggle="modal"
                                 data-bs-target="#staticBackdrop"
                              >
                                 <FaPlus />
                              </button>
                           </td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>
         </section>
      </div>

   );
}

export default ProductImport;