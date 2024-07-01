import { useEffect, useState } from "react";
import ProductService from "../../../services/ProductService";
import CategoryService from "../../../services/CategoryService";
import { useParams } from "react-router-dom";
import ProductItem from "../../../components/ProductItem";

function ProductCategory() {
    const { slug } = useParams();
    const [products, setProducts] = useState([]);
    const [limit, setLimit] = useState(4);
    const [title, setTitle] = useState("");

    document.title = title;
    useEffect(function () {
        (async function () {
            try {
                const infocategory = await CategoryService.show(slug);
                const catid = infocategory.category.id;
                setTitle(infocategory.category.name);
                const infoproduct = await ProductService.getProductByCategoryId(limit, catid);
                setProducts(infoproduct.products);
            } catch (error) {
                console.error(error);
            }

        })();
    }, [limit, slug]);
    return (
        <section className="maincontent">
            <div className="container my-4">
                <div className="row">
                    <h3 className="text-center">{title}</h3>
                    <div className="col-md-12">

                        {products && products.map((product, index) => {

                            return (
                                <div className="col-6 col-md-3 mb-4" key={index}>
                                    <ProductItem product={product} />
                                </div>

                            );
                        })}
                    </div>

                    <div className="row">
                        <div className="col-12 text-center my-3">
                            <button className="btn btn-success" onClick={() => setLimit(limit + 4)}>Xem thêm</button>
                        </div>
                    </div>
                    <br />
                    <br />

                </div>
            </div>

        </section>
    );
}

export default ProductCategory;