import Slider from "./Slider";

import { useEffect, useState } from "react";
import ProductHotBuy from "./ProductHotBuy";
import CategoryService from "../../../services/CategoryService";
import ProductHome from "./ProductHome";
import ProductNew from "./ProductNew";
import ProductSale from "./ProductSale";

const Home = () => {
    const [categorys, setCategorys] = useState([]);
    useEffect(function () {
        (async function () {
            const result = await CategoryService.getCategoryByParentId(0);
            setCategorys(result.categorys);
        })();
    }, []);
    return (
        <>
            <Slider />
            <section>
                <div class="container">
                    <div class="row">
                        {categorys.map(function (category, index) {
                            return (
                                <div key={index}>
                                    <ProductHome category={category} />
                                    &nbsp;
                                </div>
                            );
                        })}
                        <ProductHotBuy />
                        <ProductNew/>
                        <ProductSale/>
                        <br/>
                        <br/>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;

