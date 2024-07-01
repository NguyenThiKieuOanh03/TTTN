import httpAxios from "../httpAxios";
const PostService = {
    index: () => {
        return httpAxios.get(`post/index`);
    },
    show: (id) => {
        return httpAxios.get(`post/show/${id}`);
    },
    store: (data) => {
        return httpAxios.post(`post/store`, data);
    },
    update: (data, id) => {
        return httpAxios.post(`post/update/${id}`, data);
    },
    destroy: (id) => {
        return httpAxios.delete(`post/destroy/${id}`);
    },
    status: (id) => {
        return httpAxios.get(`post/status/${id}`);
    },
    trash: () => {
        return httpAxios.get(`post/trash`);
    },
    delete: (id) => {
        return httpAxios.get(`post/delete/${id}`);
    },
    restore: (id) => {
        return httpAxios.get(`post/restore/${id}`);
    },

    getPostAll: (limit, page = 1) => {
        return httpAxios.get(`post_all/${limit}/${page}`);
    },
    ById: (id) => {
        return httpAxios.get("post/show/" + id);
    },
    PostByTopicId: (limit, topic_id) => {
        return httpAxios.get(`post_topic/${limit}/${topic_id}`);
    },

    getPostBySlug: (slug) => {
        return httpAxios.get(`post_detail/${slug}`);
    },
    

};
export default PostService;


