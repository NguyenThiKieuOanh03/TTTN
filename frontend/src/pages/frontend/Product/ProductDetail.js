import { useEffect, useState } from "react";
import ProductService from "../../../services/ProductService";
import { useParams } from "react-router-dom";
import { urlImage } from "../../../config";
import ProductItem from "../../../components/ProductItem";

function ProductDetail() {
    const { slug } = useParams();
    const [limit, setLimit] = useState(4);

    const [product, setProduct] = useState([]);
    const [product_other, setProductOther] = useState([]);
    useEffect(function () {
        (function () {
            ProductService.getProductBySlug(slug)
                .then(function (result) {
                    if (result.success === true) {
                        setProduct(result.product)
                        setProductOther(result.product_other)
                    }
                });
        })();
    }, [slug]);

    return (
        <>
        <section className="maincontent ">
            <div className="container my-4 ">
                <div className="row">
                    <div className="col-md-6">
                        <img className="img-fluid fixed-image" src={`${urlImage}product/${product.image}`}
                                alt="Product" />
                    </div>
                    <div className="col-md-6">
                        <h3>{product.name}</h3>
                        <hr className="Horizontal" />
                        <div className="product-price clearfix">
                            <h4 className="ProductPrice text-danger d-inline">{product.price}<sup>đ</sup></h4>
                            <hr className="Horizontal" />
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <h5>Chi tiết sản phẩm:</h5>
                                <h7>{product.detail}</h7>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <h5>Mô tả:</h5>
                                <h7>{product.description}</h7>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
        <div className="container-fluid p-2 ">
        <h3 className="text-center">Sản Phẩm Cùng Loại</h3>

        <div className="row product-list">
            {product_other.map((product, index) => {

                return (
                    <div key={index} className="col-3 col-md-2 mb-4" >
                        <ProductItem product={product} />
                    </div>

                );
            })}
        </div>
        <div className="text-center my-3">
                    <button className="btn btn-success" onClick={() => setLimit(limit + 4)}>Xem thêm</button>

                </div>
    </div>
    </>
    );
}

export default ProductDetail;