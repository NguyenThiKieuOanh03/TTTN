import httpAxios from "../httpAxios";
const TopicService = {
    index:()=>{
        return httpAxios.get(`topic/index`);
    },
    show:(id)=>{
        return httpAxios.get(`topic/show/${id}`);
    },
    store:(data)=>{
        return httpAxios.post(`topic/store`,data);
    },
    update:(data,id)=>{
        return httpAxios.post(`topic/update/${id}`,data);
    },
    destroy:(id)=>{
        return httpAxios.delete(`topic/destroy/${id}`);
    },
    status:(id)=>{
        return httpAxios.get(`topic/status/${id}`);
    },
    trash: () => {
        return httpAxios.get(`topic/trash`);
    },
    delete: (id) => {
        return httpAxios.get(`topic/delete/${id}`);
    },
    restore: (id) => {
        return httpAxios.get(`topic/restore/${id}`);
    },
    TopicByParentId: (sort_order) => {
        return httpAxios.get(`topic_list/${sort_order}`);
    },
    TopicBySlug: (slug) => {
        return httpAxios.get("topic/show/"+slug);
    },
};
export default TopicService;



