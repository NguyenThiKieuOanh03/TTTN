import httpAxios from "../httpAxios";
const ProductService = {
    index: () => {
        return httpAxios.get(`product/index`);
    },
    show: (id) => {
        return httpAxios.get(`product/show/${id}`);
    },
    store: (data) => {
        return httpAxios.post(`product/store`, data);
    },
    update: (data, id) => {
        return httpAxios.post(`product/update/${id}`, data);
    },
    destroy: (id) => {
        return httpAxios.delete(`product/destroy/${id}`);
    },
    status: (id) => {
        return httpAxios.get(`product/status/${id}`);
    },
    trash: () => {
        return httpAxios.get(`product/trash`);
    },
    delete: (id) => {
        return httpAxios.get(`product/delete/${id}`);
    },
    restore: (id) => {
        return httpAxios.get(`product/restore/${id}`);
    },
    getSale: () => {
        return httpAxios.get(`product/sale`);
    },
    storeSale: (data) => {
        return httpAxios.post(`product/storesale`, data);
    },

    getStore: () => {
        return httpAxios.get(`product/import`);
    },
    storeStore: (data) => {
        return httpAxios.post(`product/storeimport`, data);
    },

    productnew: (limit) => {
        return httpAxios.get(`product/productnew/${limit}`);
    },

    productsale: (limit) => {
        return httpAxios.get(`product/productsale/${limit}`);
    },

    producthotbuy: (limit) => {
        return httpAxios.get(`product/producthotbuy/${limit}`);
    },

    getProductByBrandId: (limit, brand_id) => {
        return httpAxios.get(`product/product_brand/${limit}/${brand_id}`);
    },

    getProductByCategoryId: (limit, category_id) => {
        return httpAxios.get(`product/product_category/${limit}/${category_id}`);
    },
    getProductHome: (limit, category_id) => {
        return httpAxios.get(`product_home/${limit}/${category_id}`);
    },

    getProductAll: (limit, page = 1) => {
        return httpAxios.get(`product_all/${limit}/${page}`);
    },
    getProductBySlug: (slug) => {
        return httpAxios.get(`product_detail/${slug}`);
    },
    getProductSearch: (key) => {
        return httpAxios.get(`product_search/${key}`);
    },
};
export default ProductService;



