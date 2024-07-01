import httpAxios from "../httpAxios";
const ConfigService = {
    index:()=>{
        return httpAxios.get(`config/index`);
    },
    store:(data)=>{
        return httpAxios.post(`config/store`,data);
    },
};
export default ConfigService;

