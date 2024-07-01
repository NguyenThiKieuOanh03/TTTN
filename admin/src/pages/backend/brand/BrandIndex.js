import { useEffect, useState } from "react";
import BrandService from "../../../services/BrandService";
import { FaEye, FaRegEdit, FaSave, FaToggleOff, FaToggleOn, FaTrash, FaTrashAlt } from "react-icons/fa";
import { urlImage } from "../../../config";
import LoadingSpinner from "../../../LoadingSpinner";
import { Link } from "react-router-dom";
const BrandIndex = () => {
   const [brands, setBrands] = useState([]);
   const [load, setLoad] = useState(false);
   const [reload, setReload] = useState(0);

   const [name, setName] = useState('');
   const [description, setDescription] = useState('');
   const [sort_order, setSortOrder] = useState(1);
   const [status, setStatus] = useState(1);

   useEffect(() => {
      setLoad(true);
      (async () => {
         const result = await BrandService.index();
         setBrands(result.brands);
         setLoad(false);
      })();
   }, [reload]);

   //ham them 
   const handleSubmit = (e) => {
      e.preventDefault();
      const image = document.getElementById("image");
      const brand = new FormData();
      brand.append("name", name);
      brand.append("description", description);
      brand.append("sort_order", sort_order);
      brand.append("status", status);
      brand.append("image", image.files.length === 0 ? "" : image.files[0]);
      (async () => {
         const result = await BrandService.store(brand);
         alert(result.message);
         setReload(result.brand.id);
      })();
   };

   const handDelete = (id) => {
      (async () => {
         const result = await BrandService.delete(id);
         setReload(Date.now);
      })();
   };
   const handleStatus = (id) => {
      (async () => {
         const result = await BrandService.status(id);
         setReload(Date.now);

      })();
   };

   return (
      <div className="content">
         <section className="content-header my-2">
            <h1 className="d-inline">Thương hiệu</h1>
            <div className="col-md-12 text-end">
               <Link to="/admin/brand/trash" className="btn btn-sm btn-danger" ><FaTrash />  Thùng Rác</Link>
            </div>
            <hr style={{ border: "none" }} />
         </section>
         <section className="content-body my-2">

            <div className="row">
               <div className="col-md-4">
                  <form onSubmit={handleSubmit}>
                     <div className="mb-3">
                        <label>
                           <strong>Tên thương hiệu (*)</strong>
                        </label>
                        <input type="text"
                           onChange={(e) => setName(e.target.value)}
                           value={name}
                           placeholder="Nhập tên danh mục"
                           className="form-control" required />
                     </div>
                     <div className="mb-3">
                        <label><strong>Mô tả</strong></label>
                        <textarea
                           onChange={(e) => setDescription(e.target.value)}
                           value={description}
                           rows="4" className="form-control" placeholder="Mô tả"></textarea>
                     </div>
                     <div className="mb-3">
                        <label><strong>Sắp xếp</strong></label>
                        <select onChange={(e) => setSortOrder(e.target.value)}
                           value={sort_order}
                           className="form-select">
                           <option value="0">None</option>
                           {brands && brands.length > 0 && brands.map((brand, index) => {
                              return (<option key={index} value={brand.id}>Sau:{brand.name}</option>
                              )
                           })}
                        </select>
                     </div>
                     <div className="mb-3">
                        <label><strong>Hình đại diện</strong></label>
                        <input type="file" id="image" className="form-control" />
                     </div>
                     <div className="mb-3">
                        <label><strong>Trạng thái</strong></label>
                        <select onChange={(e) => setStatus(e.target.value)}
                           value={status}
                           className="form-select">
                           <option value="1">Xuất bản</option>
                           <option value="2">Chưa xuất bản</option>
                        </select>
                     </div>
                     <div className="mb-3 text-end">
                        <button type="submit" className="btn btn-success" name="THEM">
                           <FaSave className="fa fa-save" /> Lưu[Thêm]
                        </button>
                     </div>
                  </form>
               </div>
               <div className="col-md-8">
                  {load ? <LoadingSpinner /> : ""}
                  <table className="table table-bordered">
                     <thead>
                        <tr>
                           <th className="text-center" style={{ width: "30px" }}>
                              <input type="checkbox" id="checkboxAll" />
                           </th>
                           <th className="text-center" style={{ width: "90px" }}>Hình ảnh</th>
                           <th>Tên thương hiệu</th>
                           <th>Tên slug</th>
                           <th className="text-center" style={{ width: "30px" }}>ID</th>
                        </tr>
                     </thead>
                     <tbody>
                        {brands && brands.map((brand, index) => {
                           return (
                              <tr className="datarow" key={index}>
                                 <td className="text-center">
                                    <input type="checkbox" />
                                 </td>
                                 <td>
                                    <img className="img-fluid" src={urlImage + "brand/" + brand.image} alt={brand.image} />
                                 </td>
                                 <td>
                                    <div className="name">
                                       <a href="brand_index.html">
                                          {brand.name}
                                       </a>
                                    </div>
                                    <div className="function_style">
                                       <button onClick={() => handleStatus(brand.id)}
                                          className={
                                             brand.status === 1
                                                ? "border-0 px-1 text-success"
                                                : "border-0 px-1 text-danger"

                                          }>
                                          {brand.status === 1 ? <FaToggleOn /> : <FaToggleOff />}
                                       </button>

                                       <Link to={"/admin/brand/edit/" + brand.id} className="px-1 text-primary">
                                          <FaRegEdit />
                                       </Link>
                                       <Link to={"/admin/brand/show/" + brand.id} className="px-1 text-info">
                                          <FaEye />
                                       </Link>
                                       <button onClick={() => handDelete(brand.id)}
                                          className="border-0 px-1 text-danger">
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
               </div>
            </div>

         </section>
      </div>

   );
}
export default BrandIndex;