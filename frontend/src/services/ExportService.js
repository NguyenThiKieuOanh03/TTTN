import httpAxios from "../httpAxios";
const ExportService = {
    getList:(status)=>{
        return httpAxios.get(`export/index/${status}`);
    },
    getById:(id)=>{
        return httpAxios.get(`export/show/${id}`);
    },
    store:(data)=>{
        return httpAxios.post(`export/store`,data);
    },
    update:(data,id)=>{
        return httpAxios.post(`export/update/${id}`,data);
    },
    destroy:(id)=>{
        return httpAxios.delete(`export/destroy/${id}`);
    },

};
 
export default ExportService;

