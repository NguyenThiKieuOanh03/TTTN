import httpAxios from "../httpAxios";
const OrderDetailService = {
    showOrderid:(order_id)=>{
        return httpAxios.get(`orderdetail/showOrder_id/${order_id}`);
    },
};
export default OrderDetailService;

