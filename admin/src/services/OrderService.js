import httpAxios from "../httpAxios";
const OrderService = {
    // getList:(status)=>{
    //     return httpAxios.get(`order/index/${status}`);
    // },
    // getById:(id)=>{
    //     return httpAxios.get(`order/show/${id}`);
    // },
    index:()=>{
        return httpAxios.get(`order/index`);
    },
    store:(data)=>{
        return httpAxios.post(`order/store`,data);
    },
    update:(data,id)=>{
        return httpAxios.post(`order/update/${id}`,data);
    },
    destroy:(id)=>{
        return httpAxios.delete(`order/destroy/${id}`);
    },
    status:(id)=>{
        return httpAxios.get(`order/status/${id}`);
    },
    show: (id) => {
        return httpAxios.get(`order/show/${id}`);
    },
    trash: () => {
        return httpAxios.get(`order/trash`);
    },
    delete: (id) => {
        return httpAxios.get(`order/delete/${id}`);
    },
    restore: (id) => {
        return httpAxios.get(`order/restore/${id}`);
    },
};
export default OrderService;


