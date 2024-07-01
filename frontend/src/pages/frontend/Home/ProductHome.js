import { useEffect, useState } from "react";
import ProductService from "../../../services/ProductService";
import ProductItem from "../../../components/ProductItem";
function ProductHome(props) {
    const [products, setProducts] = useState([]);
    const [limit, setLimit] = useState(4);

    useEffect(function () {
        (async function () {
            const result = await ProductService.getProductHome(limit, props.category.id);
            setProducts(result.products);
        })();
    }, [limit, props.category.id]);

    if (products != null) {
    return (
        <>
            <div class="features_items">
                <h2 class="title text-center">{props.category.name}</h2>
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
}

export default ProductHome;

