import httpAxios from "../httpAxios";
const MenuService = {
    getList: (status) => {
        return httpAxios.get(`menu/index/${status}`);
    },
    getById: (id) => {
        return httpAxios.get(`menu/show/${id}`);
    },
    store:(data)=>{
        return httpAxios.post(`menu/store`,data);
    },
    update:(data,id)=>{
        return httpAxios.post(`menu/update/${id}`,data);
    },
    show:(id)=>{
        return httpAxios.get(`menu/show/${id}`);
    },
    destroy:(id)=>{
        return httpAxios.delete(`menu/destroy/${id}`);
    },
    status:(id)=>{
        return httpAxios.get(`menu/status/${id}`);
    },
    trash: () => {
        return httpAxios.get(`menu/trash`);
    },
    delete: (id) => {
        return httpAxios.get(`menu/delete/${id}`);
    },
    restore: (id) => {
        return httpAxios.get(`menu/restore/${id}`);
    },
    // menuParentId: (id) => {
    //     return httpAxios.get(`menu_parentid/${id}`);
    // },

    getByParentId:(position,parent_id) =>
    {
        return httpAxios.get(`menu/menu_list/${position}/${parent_id}`);   
    }
    
};
export default MenuService;


