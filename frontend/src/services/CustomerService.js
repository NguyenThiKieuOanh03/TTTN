import httpAxios from "../httpAxios";
const CustomerService = {
    index:()=>{
        return httpAxios.get(`customer/index`);
    },
    getById:(id)=>{
        return httpAxios.get(`customer/show/${id}`);
    },
    show:(id)=>{
        return httpAxios.get(`customer/show/${id}`);
    },
    store:(data)=>{
        return httpAxios.post(`customer/store`,data);
    },
    update:(data,id)=>{
        return httpAxios.post(`customer/update/${id}`,data);
    },
    destroy:(id)=>{
        return httpAxios.delete(`customer/destroy/${id}`);
    },
    status:(id)=>{
        return httpAxios.get(`customer/status/${id}`);
    },
    trash: () => {
        return httpAxios.get(`customer/trash`);
    },
    delete: (id) => {
        return httpAxios.get(`customer/delete/${id}`);
    },
    restore: (id) => {
        return httpAxios.get(`customer/restore/${id}`);
    },
};
export default CustomerService;


