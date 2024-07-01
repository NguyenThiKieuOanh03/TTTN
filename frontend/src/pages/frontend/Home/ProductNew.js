import { useEffect, useState } from "react";
import ProductService from "../../../services/ProductService";
import ProductItem from "../../../components/ProductItem";

const ProductNew = () => {
   const [limit, setLimit] = useState(4);

   const [products, setProducts] = useState([]);
   useEffect(() => {
      (async () => {
         const result = await ProductService.productnew(limit,4);
         setProducts(result.products);
      })();

   }, [limit]);
   return (
        <>
        <div class="features_items">
            <h2 class="title text-center">Sản Phẩm Mới</h2>
        </div>
        <div class="col-sm-12">
            {products && products.map((product, index) => {

                return (
                    <div className="col-6 col-md-3 mb-4" key={index}>
                        <ProductItem product={product} />
                    </div>

                );
            })}
        </div>
        <div className="text-center my-3">
            <button className="btn btn-success" onClick={() => setLimit(limit + 4)}>Xem thêm</button>
        </div>
    </>

     );
}
 
export default ProductNew;