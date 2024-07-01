
import { useEffect, useState } from 'react';
import ProductService from '../../../services/ProductService';
import ProductItem from '../../../components/ProductItem';
import { useParams } from "react-router-dom";
import ListCategory from '../../../layouts/LayoutSite/ListCategory';

function Product() {
    const { slug } = useParams();
    const [products, setProducts] = useState([]);
    const [limit, setLimit] = useState(4);
    const [selectedPrices, setSelectedPrices] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const result = await ProductService.getProductAll(limit, 1);
            setProducts(result.products);
        };
        fetchProducts();
    }, [limit, slug]);

    const handlePriceFilterChange = (priceRange) => {
        setSelectedPrices((prevPrices) => {
            if (prevPrices.includes(priceRange)) {
                return prevPrices.filter((price) => price !== priceRange);
            } else {
                return [priceRange];
            }
        });
    };

    const filterProductsByPrice = (product) => {
        if (selectedPrices.length === 0) {
            return true;
        }

        const productPrice = parseFloat(product.pricesale !== null ? product.pricesale : product.price);
        return selectedPrices.some(
            (priceRange) => {
                const [min, max] = priceRange.split('-').map(parseFloat);
                return productPrice >= min && productPrice <= max;
            }
        );
    };

    // Filter products by price first, then divide them into rows of 4
    const filteredProducts = products.filter(filterProductsByPrice);
    const productsInRows = [];
    for (let i = 0; i < filteredProducts.length; i += 4) {
        productsInRows.push(filteredProducts.slice(i, i + 4));
    }

    return (
        <section className="maincontent">
            <div className="container my-4 text-center">
                <div className="row">
                    <div className="col-md-12">
                        <h2>Tất cả sản phẩm</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <div className="list-group">
                            <li
                                style={{ backgroundColor: '#fdb45e', color: 'black' }}
                                className="list-group-item"
                                aria-disabled="true"
                            >
                                Price
                            </li>
                            <div className="collapse show" id="widget-2">
                                <div className="list-group-item">
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input my-2"
                                            id="size-1"
                                            onChange={() => handlePriceFilterChange("1000-9999")}
                                            checked={selectedPrices.includes("1000-9999")}
                                        />
                                        <label className="custom-control-label" htmlFor="size-1" style={{ marginLeft: '5px' }}>1.000.000-10.000.000 VND</label>
                                    </div>
                                </div>
                                <div className="list-group-item">
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input my-2"
                                            id="size-1"
                                            onChange={() => handlePriceFilterChange("10000-19999")}
                                            checked={selectedPrices.includes("10000-19999")}
                                        />
                                        <label className="custom-control-label" htmlFor="size-1" style={{ marginLeft: '5px' }}>10.000.000-20.000.000 VND</label>
                                    </div>
                                </div>
                                <div className="list-group-item">
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="size-2"
                                            onChange={() => handlePriceFilterChange("20000-29999")}
                                            checked={selectedPrices.includes("20000-29999")}
                                        />
                                        <label className="custom-control-label" htmlFor="size-2" style={{ marginLeft: '5px' }}>20.000.000-30.000.000 VND</label>
                                    </div>
                                </div>
                                <div className="list-group-item">
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="size-3"
                                            onChange={() => handlePriceFilterChange("30000-39999")}
                                            checked={selectedPrices.includes("30000-39999")}
                                        />
                                        <label className="custom-control-label" htmlFor="size-3" style={{ marginLeft: '5px' }}>30.000.000-40.000.000 VND</label>
                                    </div>
                                </div>
                                <div className="list-group-item">
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="size-4"
                                            onChange={() => handlePriceFilterChange("40000-49999")}
                                            checked={selectedPrices.includes("40000-49999")}
                                        />
                                        <label className="custom-control-label" htmlFor="size-4" style={{ marginLeft: '5px' }}>40.000.000-50.000.000 VND</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ListCategory />

                    </div>
                    <div className="col-md-9">
                        <div className="row product-list">
                            {productsInRows.map((row, rowIndex) => (
                                <div className="row" key={rowIndex}>
                                    {row.filter(filterProductsByPrice)
                                    .map((product, index) => (
                                        <div className="col-6 col-md-3 mb-4" key={index}>
                                            <ProductItem product={product} />
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className="col-12 my-4 text-center" style={{ marginBottom: '50px' }}>
                            <button className="btn btn-success" onClick={() => setLimit(limit + 4)}>Xem thêm</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Product;
