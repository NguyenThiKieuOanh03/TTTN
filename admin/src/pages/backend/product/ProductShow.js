import { FaRegEdit, FaTrash } from "react-icons/fa";
import { IoArrowBackSharp } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductService from "../../../services/ProductService";

const ProductShow = () => {

   const [reload, setReload] = useState(0);
   const { id } = useParams();
   const navigate = useNavigate();

   const [category_id, setCategoryId] = useState(1);
   const [brand_id, setBrandId] = useState(1);
   const [name, setName] = useState('');
   const [slug, setSlug] = useState('');
   const [detail, setDetail] = useState('');
   const [description, setDescription] = useState('');
   const [price, setPrice] = useState('');
   const [status, setStatus] = useState(1);

   useEffect(() => {
      const fetchData = async () => {
         try {
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
         } catch (error) {
            console.error("Error fetching product:", error);
         }
      };
      fetchData();
   }, [id, reload]);

   const handleDelete = async (id) => {
      try {
         const result = await ProductService.destroy(id);
         setReload(reload + 1);
         navigate("/admin/product/index");
      } catch (error) {
         console.error("Error deleting product:", error);
      }
   };



   return (
      <div className="content">
         <section className="content-header my-2">
            <h1 className="d-inline">Chi tiết</h1>
            <div className="row mt-2 align-items-center">
               <div className="col-md-12 text-end">
                  <Link to={"/admin/product/index"} className="btn btn-primary btn-sm">
                     <IoArrowBackSharp /> Về danh sách
                  </Link>
                  <Link to={"/admin/product/edit/" + id} className="btn btn-success btn-sm">
                     <FaRegEdit /> Sửa
                  </Link>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(id)}>
                     <FaTrash /> Xóa
                  </button>
               </div>
            </div>
         </section>
         <section className="content-body my-2">

            <table className="table table-bordered">
               <thead>
                  <tr>
                     <th style={{ width: "180px" }}>Tên trường</th>
                     <th className="text-center">Giá trị</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <th className="text-center">Id</th>
                     <td className="text-center">{id}</td>
                  </tr>
                  <tr>
                     <th className="text-center">Category_Id</th>
                     <td className="text-center">{category_id}</td>
                  </tr>
                  <tr>
                     <th className="text-center">Brand_Id</th>
                     <td className="text-center">{brand_id}</td>
                  </tr>
                  <tr>
                     <th className="text-center">Tên Sản Phẩm</th>
                     <td className="text-center">{name}</td>
                  </tr>

                  <tr>
                     <th className="text-center">Slug</th>
                     <td className="text-center">{slug}</td>
                  </tr>

                  <tr>
                     <th className="text-center">Chi tiết</th>
                     <td className="text-center">{detail}</td>
                  </tr>

                  <tr>
                     <th className="text-center">Mô tả</th>
                     <td className="text-center">{description}</td>
                  </tr>

                  <tr>
                     <th className="text-center">Giá</th>
                     <td className="text-center">{price}</td>
                  </tr>

                  <tr>
                     <th className="text-center">Trạng Thái</th>
                     <td className="text-center">{status}</td>
                  </tr>



               </tbody>
            </table>

         </section>
      </div>

   );
}

export default ProductShow;