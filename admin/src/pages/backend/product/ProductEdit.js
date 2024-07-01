import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ProductService from "../../../services/ProductService";
import BrandService from "../../../services/BrandService";
import CategoryService from "../../../services/CategoryService";
import { toast } from "react-toastify";
import { IoArrowBackSharp } from "react-icons/io5";
import { FaSave } from "react-icons/fa";
const ProductEdit = () => {

   const { id } = useParams();
   const navigate = useNavigate();
   const [products, setProducts] = useState([]);

   const [category_id, setCategoryId] = useState(1);
   const [brand_id, setBrandId] = useState(1);
   const [name, setName] = useState('');
   const [slug, setSlug] = useState('');
   const [detail, setDetail] = useState('');
   const [description, setDescription] = useState('');
   const [price, setPrice] = useState('');
   const [status, setStatus] = useState(1);

   useEffect(() => {
      (async () => {
         const result = await ProductService.show(id);
         const product = result.product;
         setCategoryId(product.category_id);
         setBrandId(product.brand_id);
         setName(product.name);
         setSlug(product.slug);
         setDescription(product.description);
         setDetail(product.detail);
         setPrice(product.price);
         setStatus(product.status);
      })();
   }, [id]);

   const handleSubmit = (e) => {
      e.preventDefault();
      const image = document.getElementById("image");
      const product = new FormData();
      product.append("category_id", category_id);
      product.append("brand_id", brand_id);
      product.append("name", name);
      product.append("slug", slug);
      product.append("detail", detail);
      product.append("description", description);
      product.append("price", price);
      product.append("status", status);
      product.append("image", image.files.length === 0 ? "" : image.files[0]);
      (async () => {
         const result = await ProductService.update(product, id);
         toast.success(result.message);
         navigate("/admin/product/index", { replace: true });
      })();

   };
   useEffect(() => {
      (async () => {
         const result = await ProductService.index();
         setProducts(result.products);
      })();
   }, []);

   const [brands, setBrands] = useState([]);
   useEffect( ()=> {
       (async  () =>{
         const result = await BrandService.index();
         setBrands(result.brands);
       })();
   }, []);

   const [categorys, setCategorys] = useState([]);
   useEffect( ()=> {
       (async  () =>{
         const result = await CategoryService.index();
         setCategorys(result.categorys);
       })();
   }, []);


   return (
      <form onSubmit={handleSubmit}>

         <div className="content">
            <section className="content-header my-2">
               <h1 className="d-inline">Cập nhập sản phẩm</h1>
               <div className="mt-1 text-end">
                  <Link to={"/admin/product/index"} className="btn btn-sm btn-success">
                     <IoArrowBackSharp className="fa fa-arrow-left" /> Về danh sách
                  </Link>
               </div>
            </section>
            <section className="content-body my-2">

               <div className="row">
                  <div className="col-md-9">
                     <div className="mb-3">
                        <label><strong>Tên sản phẩm (*)</strong></label>
                        <input type="text" placeholder="Nhập tên sản phẩm" value={name} onChange={(e) => setName(e.target.value)} className="form-control" />
                     </div>
                     <div className="mb-3">
                        <label><strong>Slug (*)</strong></label>
                        <input type="text" placeholder="Slug"
                           value={slug} onChange={(e) => setSlug(e.target.value)}
                           className="form-control" />
                     </div>
                     <div className="mb-3">
                        <label><strong>Chi tiết (*)</strong></label>
                        <textarea value={detail} onChange={(e) => setDetail(e.target.value)} placeholder="Nhập chi tiết sản phẩm" rows="7"
                           className="form-control"></textarea>
                     </div>
                     <div className="mb-3">
                        <label><strong>Mô tả (*)</strong></label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="3" className="form-control"
                           placeholder="Nhập mô tả"></textarea>
                     </div>
                  </div>
                  <div className="col-md-3">
                     <div className="box-container mt-4 bg-white">
                        <div className="box-header py-1 px-2 border-bottom">
                           <strong>Đăng</strong>
                        </div>
                        <div className="box-body p-2 border-bottom">
                           <select value={status} onChange={(e) => setStatus(e.target.value)} className="form-select">
                              <option value="1">Xuất bản</option>
                              <option value="2">Chưa xuất bản</option>
                           </select>
                        </div>

                     </div>
                     <div className="box-container mt-2 bg-white">
                        <div className="box-header py-1 px-2 border-bottom">
                           <strong>Danh mục(*)</strong>
                        </div>
                        <div className="box-body p-2 border-bottom">
                           <select value={category_id} onChange={(e) => setCategoryId(e.target.value)} className="form-select">
                           <option value="">None</option>
                                    {categorys.map(function(cat,index){
                                        return ( <option key={index} value={cat.id}>{cat.name}</option>)
                                    })}                           </select>
                        </div>
                     </div>
                     <div className="box-container mt-2 bg-white">
                        <div className="box-header py-1 px-2 border-bottom">
                           <strong>Thương hiệu(*)</strong>
                        </div>
                        <div className="box-body p-2 border-bottom">
                           <select value={brand_id} onChange={(e) => setBrandId(e.target.value)} className="form-select">
                           <option value="">None</option>
                                    {brands.map(function(pr,index){
                                        return ( <option key={index} value={pr.id}>{pr.name}</option>)
                                    })}
                           </select>
                        </div>
                     </div>
                     <div className="box-container mt-2 bg-white">
                        <div className="mb-3">
                           <label><strong>Giá bán (*)</strong></label>
                           <textarea value={price} onChange={(e) => setPrice(e.target.value)}
                              rows="3" className="form-control"
                              placeholder="Nhập giá"></textarea>
                        </div>
                     </div>
                     <div className="box-container mt-2 bg-white">
                        <div className="box-header py-1 px-2 border-bottom">
                           <strong>Hình đại diện(*)</strong>
                        </div>
                        <div className="box-body p-2 border-bottom">
                           <input type="file" id="image" className="form-control" />
                        </div>
                     </div>
                     <div className="box-footer text-end px-2 py-2">
                        <button type="submit" className="btn btn-success btn-sm text-end">
                           <FaSave className="fa fa-save" aria-hidden="true" /> Cập nhật
                        </button>
                     </div>
                  </div>
               </div>

            </section>
         </div>
      </form>
   );
}

export default ProductEdit;