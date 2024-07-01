import { useEffect, useState } from "react";
import { urlImage } from "../../../config";
import ProductService from "../../../services/ProductService";

const ProductSale = () => {

   const [reload, setReload] = useState(0);
   const [products, setProducts] = useState([]);
   const [productsales, setProductSales] = useState([]);

   useEffect(function () {

      (async function () {
         const result = await ProductService.index();
         setProducts(result.products);
      })();
   }, []);

   useEffect(function () {
      (async function () {
         const result = await ProductService.getSale();
         setProductSales(result.products);
      })();
   }, [reload]);

   const handleSale = (id) => {
      (async function () {
         const datebegin = document.querySelector("#datebegin" + id);
         const dateend = document.querySelector("#dateend" + id);
         const pricesale = document.querySelector("#pricesale" + id);
         const productsale = {
            product_id: id,
            pricesale: pricesale.value,
            date_begin: datebegin.value,
            date_end: dateend.value
         };
         await ProductService.storeSale(productsale);
      })();
   };
   return (
      <div className="content">
         <section className="content-header my-2">
            <h1 className="d-inline">Khuyến mãi</h1>
            <div className="col-md-12 text-end">

            <button
               type="button"
               className="btn btn-sm btn-success"
               data-bs-toggle="modal"
               data-bs-target="#staticBackdrop"
            >
               Thêm khuyến mãi
            </button>
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
                                 <th style={{ width: "30px" }} className="text-center">#</th>
                                 <th className="text-center" style={{ width: "130px" }}>Hình ảnh</th>
                                 <th>Tên sản phẩm</th>
                                 <th>Ngày bắt đầu</th>
                                 <th>Ngày kết thúc</th>
                                 <th>Giá khuyến mãi</th>
                                 <th style={{ width: "120px" }} className="text-center"></th>
                              </tr>
                           </thead>
                           <tbody>
                              {products && products.map(function (product, index) {
                                 return (
                                    <tr key={index} className="dataitem">
                                       <td className="text-center align-middle">
                                          <input type="checkbox" id="checkId" />
                                       </td>
                                       <td className="text-center align-middle">
                                          <img
                                             src={urlImage + "product/" + product.image}
                                             className="img-fluid"
                                             alt="Hinh"
                                          />
                                       </td>
                                       <td className="align-middle">{product.name}</td>
                                       <td className="text-center align-middle">
                                          <input type="date" id={"datebegin" + product.id} />
                                       </td>
                                       <td className="text-center align-middle">
                                          <input type="date" id={"dateend" + product.id} />
                                       </td>
                                       <td className="text-center align-middle">
                                          <input type="text" id={"pricesale" + product.id} />
                                       </td>
                                       <td className="text-center align-middle">
                                          <button
                                             onClick={() => handleSale(product.id)}
                                             className="btn btn-sm btn-success"
                                             type="button"
                                          >
                                             Thêm Khuyến Mãi
                                          </button>
                                       </td>
                                    </tr>
                                 );
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

            <table className="table table-bordered" id="mytable2">
               <thead>
                  <tr>
                     <th className="text-center" style={{ width: "30px" }}>
                        <input type="checkbox" id="checkboxAll" />
                     </th>
                     <th className="text-center" style={{ width: "90px" }}>Hình ảnh</th>
                     <th>Tên sản phẩm</th>
                     <th>Giá bán</th>
                     <th>Ngày BĐ</th>
                     <th>Ngày kết thúc</th>
                     <th>Giá sale</th>
                  </tr>
               </thead>
               <tbody>
                  {productsales && productsales.map((productsale, index) => {
                     return (
                        <tr className="datarow">
                           <td className="text-center">
                              <input type="checkbox" id="checkId" />
                           </td>
                           <td>
                              <img className="img-fluid" src={urlImage + "product/" + productsale.image} alt="Hinh" />
                           </td>
                           <td>
                              <div className="name">
                                 {productsale.name}
                              </div>
                           </td>
                           <td>{productsale.price}</td>
                           <td>{productsale.date_begin}</td>
                           <td>{productsale.date_end}</td>
                           <td>{productsale.pricesale}</td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>

         </section>
      </div>

   );
}

export default ProductSale;