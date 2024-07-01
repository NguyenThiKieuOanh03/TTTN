import { urlImage } from "../config";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';

const ProductItem = (props) => {
    const [cart, setCart] = useState([]);

   useEffect(() => {
      const cartData = localStorage.getItem("cart");
      if (cartData) {
         setCart(JSON.parse(cartData));
      }
   }, []);

   const addToCart = () => {
      const product = props.product;
      const existingProduct = cart.find(item => item.id === product.id);
      if (existingProduct) {
          // Nếu sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng lên thêm 1
          const updatedCart = cart.map(item =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
          setCart(updatedCart);
          localStorage.setItem("cart", JSON.stringify(updatedCart));
      } else {
          // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm sản phẩm mới vào giỏ hàng
          const productCopy = { ...product, quantity: 1 };
          const updatedCart = [...cart, productCopy];
          setCart(updatedCart);
          localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
      Swal.fire({
          title: "Thêm vào giỏ hàng!",
          text: "Thêm vào giỏ hàng thành công!",
          icon: "success"
      });
   
  };

  const product = props.product;
  const handleProductClick = () => {
    window.scrollTo(0, 0);
};
 const hasSale = product.pricesale !== null && product.pricesale !== undefined;
    return ( 
        <div class="product-image-wrapper">
        <div class="single-products">
            <div class="productinfo text-center">
                <Link to={"/chi-tiet-san-pham/" + props.product.slug}onClick={handleProductClick}>
                <img className="product-image" src={urlImage + "product/" + product.image} alt="" />
                </Link>
                <div className=" fs-12 p-2">
                <p><Link to={"/chi-tiet-san-pham/"+ props.product.slug }onClick={handleProductClick} style={{ color: 'black', fontWeight: 'bold' }}>{product.name}</Link></p>

               <div className=" price-wrapper fs-6 p-2 d-flex">
                  {hasSale ? (
                     <>
                        <span className=" sale-price flex-fill text-danger">{product.pricesale.toFixed(3)}<sup>đ</sup></span>
                        {product.price !== product.pricesale && (
                           <span className="flex-fill original-price ">{product.price.toFixed(3)}<sup>đ</sup></span>
                        )}
                     </>
                  ) : (
                     <span style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{product.price.toFixed(3)}<sup>đ</sup></span>
                  )}
               </div>
            </div>
                <Link to="#" onClick={addToCart} class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Thêm vào giỏ hàng</Link>
            </div>
        </div>
        <div class="choose">
            <ul class="nav nav-pills nav-justified">
                <li><a href="#"><i class="fa fa-plus-square"></i>Đặt hàng</a></li>
            </ul>
        </div>
    </div>

     );
}
 
export default ProductItem;