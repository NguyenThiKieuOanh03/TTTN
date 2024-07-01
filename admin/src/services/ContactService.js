import httpAxios from "../httpAxios";
const ContactService = {
    index:()=>{
        return httpAxios.get(`contact/index`);
    },
    show:(id)=>{
        return httpAxios.get(`contact/show/${id}`);
    },
    store:(data)=>{
        return httpAxios.post(`contact/store`,data);
    },
    reply: (data, id) => {
        return httpAxios.post(`contact/reply/${id}`, data);
    },
    update:(data,id)=>{
        return httpAxios.post(`contact/update/${id}`,data);
    },
    destroy:(id)=>{
        return httpAxios.delete(`contact/destroy/${id}`);
    },
    status:(id)=>{
        return httpAxios.get(`contact/status/${id}`);
    },
    trash: () => {
        return httpAxios.get(`contact/trash`);
    },
    delete: (id) => {
        return httpAxios.get(`contact/delete/${id}`);
    },
    restore: (id) => {
        return httpAxios.get(`contact/restore/${id}`);
    },
};
export default ContactService;


