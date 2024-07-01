import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { urlImage } from "../../../config";

function Checkout({ items }) {
    const [cart, setCart] = useState([]);
    const [shippingCost, setShippingCost] = useState(0);
    const [selectedShippingMethod, setSelectedShippingMethod] = useState(null);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cartData = localStorage.getItem("cart");
        const storedShippingCost = localStorage.getItem("shippingCost");
        const storedSelectedShippingMethod = localStorage.getItem("selectedShippingMethod");

        if (cartData) {
            setCart(JSON.parse(cartData));
        }

        if (storedShippingCost) {
            setShippingCost(parseFloat(storedShippingCost));
        }

        if (storedSelectedShippingMethod) {
            setSelectedShippingMethod(storedSelectedShippingMethod);
        }
    }, []);

    useEffect(() => {
        const cartTotal = calculateCartTotal();
        const finalTotal = cartTotal + shippingCost;
        setTotal(finalTotal);
    }, [cart, shippingCost]);

    const calculateTotal = (price, quantity) => {
        return price * quantity;
    };

    const calculateCartTotal = () => {
        let total = 0;
        cart.forEach(product => {
            total += calculateTotal(product.price, product.quantity);
        });
        return total;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const [formData, setFormData] = useState({
        delivery_name: '',
        delivery_phone: '',
        delivery_email: '',
        delivery_address: '',
        delivery_gender: '',
        note: '',
    });

    const handleCheckout = async (e) => {
        e.preventDefault();
        try {
            if (!formData.delivery_name || !formData.delivery_phone || !formData.delivery_address) {
                throw new Error('Xin vui lòng điền đầy đủ thông tin vào các ô bắt buộc');
            }

            if (/^\s*$/.test(formData.delivery_name) || /^\s*$/.test(formData.delivery_phone) || /^\s*$/.test(formData.delivery_address)) {
                throw new Error('Vui lòng điền vào tất cả các trường bắt buộc với các giá trị hợp lệ.');
            }
            setLoading(true);

            const url = 'http://localhost/backend/public/api/export/storeonline';
            let listcart = [];

            // Chọn tất cả các phần tử có class 'productid'
            document.querySelectorAll(".productid").forEach((element) => {
                const productId = element.value;
                // Lấy giá trị qty từ phần tử có class 'qty' tương ứng
                const qtyElement = element.closest("tr").querySelector(".qty");
                const qtyValue = qtyElement ? qtyElement.getAttribute("data-qty") : 0;

                // Thêm vào listcart
                listcart = [...listcart, { id: productId, qty: qtyValue }];
            });

            const response = await axios.post(url, {
                user_id: 1,
                status: 1,
                delivery_name: formData.delivery_name,
                delivery_phone: formData.delivery_phone,
                delivery_address: formData.delivery_address,
                delivery_gender: "avc",
                delivery_email: formData.delivery_email,
                note: formData.note,
                listcart: listcart
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status !== 200) {
                throw new Error('Lỗi xử lý đơn hàng. Vui lòng thử lại.');
            }

            Swal.fire(
                'Thanh toán thành công!',
                'Bạn đã hoàn tất thanh toán thành công!',
                'success'
            );

            // Clear form data
            setFormData({
                delivery_name: '',
                delivery_phone: '',
                delivery_email: '',
                delivery_address: '',
                delivery_gender: '',
                note: '',
            });

            // Clear cart state
            setCart([]);
            setShippingCost(0);
            setSelectedShippingMethod(null);
            // Remove cart data from localStorage
            localStorage.removeItem('cart');
            localStorage.removeItem('shippingCost');
            localStorage.removeItem('selectedShippingMethod');

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="main">
            <div
                className="page-header text-center"
                style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
            >
                <div className="container">
                    <h1 className="page-title">
                        Thanh <span>Toán </span>
                    </h1>
                </div>
            </div>
            <div className="page-content">
                <div className="checkout">
                    <div className="container">

                        <form onSubmit={handleCheckout}>
                            <div className="row">
                                <div className="col-lg-9">
                                    <h2 className="checkout-title">Chi tiết thanh toán</h2>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <label>Họ Tên </label>
                                            <input type="text" name="delivery_name" className="form-control" value={formData.delivery_name} onChange={handleInputChange} required />
                                        </div>
                                        <div className="col-sm-6">
                                            <label>Số Điện Thoại</label>
                                            <input type="tel" name="delivery_phone" className="form-control" value={formData.delivery_phone} onChange={handleInputChange} required />
                                        </div>
                                    </div>
                                    <label>Email</label>
                                    <input type="email" name="delivery_email" className="form-control" value={formData.delivery_email} onChange={handleInputChange} required />
                                    <label>Địa Chỉ</label>
                                    <textarea type="text" name="delivery_address" cols={20} rows={3} className="form-control" value={formData.delivery_address} onChange={handleInputChange} required />

                                    {/* <label>Order notes *</label>
                                    <textarea name="note" className="form-control" cols={30} rows={4} value={formData.note} onChange={handleInputChange} /> */}
                                </div>
                                <aside className="col-lg-3">
                                    <div className="summary">
                                        <h3 className="summary-title">Đơn hàng của bạn</h3>
                                        <table className="table table-summary">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Hình ảnh</th>
                                                    <th>Sản Phẩm </th>
                                                    <th>Giá</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cart.map((product, index) => (
                                                    <tr key={index}>
                                                        <td class="d-none">
                                                            {product.id}
                                                            <input class="productid" value={product.id} type="hidden" />
                                                        </td>
                                                        <td>
                                                            <div className="d-flex align-items-center mt-2">
                                                                <img src={urlImage + "product/" + product.image} className="img-fluid rounded-circle" style={{ width: "90px", height: "90px" }} alt="" />
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <a href="#">{product.name}</a>
                                                            <div class="qty" data-qty={product.quantity}>x{product.quantity}</div>
                                                        </td>
                                                        <td>{product.price.toFixed(3)}đ</td>
                                                    </tr>
                                                ))}
                                                <tr>
                                                    <td>Vận chuyển:</td>
                                                    <td>{shippingCost.toFixed(3)}đ</td>
                                                </tr>
                                                <tr className="summary-total">
                                                    <td>Tổng:</td>
                                                    <td>{total.toFixed(3)}đ</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <button
                                            style={{ backgroundColor: '#fdb45e', color: 'black' }}
                                            type="submit"
                                            className="btn btn-outline-primary-2 btn-order btn-block "
                                            onClick={handleCheckout}
                                        >
                                            Proceed to Checkout
                                        </button>
                                    </div>
                                </aside>
                            </div>
                        </form>
                        <br />
                        <br />
                        <br />

                    </div>
                </div>
            </div>
        </main>
    );
}

export default Checkout;
