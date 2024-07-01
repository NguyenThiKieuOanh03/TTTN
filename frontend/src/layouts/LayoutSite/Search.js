import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductService from "../../services/ProductService"
import ProductItem from "../../components/ProductItem";

function Search() {
    const { key } = useParams();
    const [products, setProducts] = useState([]);
    document.title = "Kết quả tìm kiếm";
    useEffect(function () {
        (async function () {
            const resultp = await ProductService.getProductSearch(key);
            setProducts(resultp.products)
        })();
    }, [key]);
    if (products != null) {
        return (
            <section className="maincontent">
                <div className="container my-4">
                    <div className="row">
                        <div className="col-md-3">
                        </div>
                        <div className="col-md-12">
                            <h1 style={{  color: '#fdb45e' }}>Kết quả bạn tìm </h1>


                            <div className="row product-list">
                                {products && products.map((product, index) => {

                                    return (
                                        <div className="col-6 col-md-3 mb-4" key={index}>
                                            <ProductItem product={product} />
                                        </div>

                                    );
                                })}

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
    else {
        return (
            <section className="maincontent">
                <div className="container my-4">
                    <div className="row">
                        <div className="col-md-3">
                        </div>
                        <div className="col-md-12">
                        <h1 style={{  color: '#fdb45e' }}>Kết quả bạn tìm </h1>
                            <div className="row">
                                <p>Không tìm thấy {key} </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

}

export default Search;