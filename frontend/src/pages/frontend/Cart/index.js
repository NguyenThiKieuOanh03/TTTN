import { useEffect, useState } from "react";
import { urlImage } from "../../../config";
import { Link } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    console.log("jj", cartData)
    if (cartData) {
      setCart(JSON.parse(cartData));

    }
  }, []);
  useEffect(() => {
  }, [cart]);

  const updateQuantity = (index, newQuantity) => {
    const updatedCart = cart.map((item, idx) => {
      if (idx === index) {
        return {
          ...item,
          quantity: newQuantity,
          total: calculateTotal(item.price, newQuantity)
        };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.location.reload();
  };
  const removeProduct = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

  };

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

  useEffect(() => {
    const cartTotal = calculateCartTotal();
    const finalTotal = cartTotal + shippingCost;
    setTotal(finalTotal);
  }, [cart, shippingCost, selectedShippingMethod]);


  const handleFreeShippingChange = () => {
    setSelectedShippingMethod('Free Shipping');
    setShippingCost(0);
    localStorage.setItem('shippingCost', 0);
    localStorage.setItem('selectedShippingMethod', 'Free Shipping');
  };

  const handleStandardShippingChange = () => {
    setSelectedShippingMethod('Standard');
    setShippingCost(10);
    localStorage.setItem('shippingCost', 10);
    localStorage.setItem('selectedShippingMethod', 'Standard');
  };

  const handleExpressShippingChange = () => {
    setSelectedShippingMethod('Express');
    setShippingCost(20);
    localStorage.setItem('shippingCost', 20);
    localStorage.setItem('selectedShippingMethod', 'Express');
  };


  return (
    <>
      <h4 style={{ textAlign: "center", fontSize: "30px", padding: "20px" }}>
        Giỏ hàng
      </h4>
      <section id="cart_items">
        <div class="container">
          <div class="table-responsive cart_info">
            <table class="table table-condensed">
              <thead>
                <tr class="cart_menu">
                  <td class="image">Hình </td>
                  <td class="description">Tên sản phẩm</td>
                  <td class="price">Giá</td>
                  <td class="quantity">Số Lượng</td>
                  <td class="total">Tổng</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {cart.map((product, index) => (
                  <tr key={index}>
                    <td class="cart_product">
                      <a href="">
                        <img
                          className="img-fluid"
                          src={urlImage + "product/" + product.image}
                          alt="hinh"
                          style={{ width: "100px", height: "100px" }}
                        />    </a>
                    </td>
                    <td class="cart_description">
                      <h4><a href="">{product.name}</a></h4>
                    </td>
                    <td class="cart_price">
                      <p>{product.price.toFixed(3)}</p>
                    </td>
                    <td class="cart_quantity">
                      <div class="cart_quantity_button">
                        <input type="number" className="form-control"
                          value={product.quantity || 1}
                          min={1}
                          max={10}
                          step={1}
                          data-decimals={0}
                          onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                          required />
                      </div>
                    </td>
                    <td class="cart_total">
                      <p class="cart_total_price">{calculateTotal(product.price, product.quantity || 1).toFixed(3)}</p>
                    </td>
                    <td class="cart_delete">
                      <button
                        className="btn-remove btn btn-sm btn-danger"
                        onClick={() => removeProduct(index)}
                      >
                        X
                      </button>
                    </td>

                  </tr>

                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="do_action">
        <div className="container">
          <div className="heading">
            <h3>Bạn có muốn tiếp tục không?</h3>
            <p>Chọn xem bạn có mã giảm giá hoặc điểm thưởng mà bạn muốn sử dụng hay muốn ước tính chi phí giao hàng của mình.</p>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="total_area">
                <table className="table">
                  <tbody>
                    <tr>
                      <td><strong>Tổng sản phẩm:</strong></td>
                      <td>{calculateCartTotal().toFixed(3)}</td>
                    </tr>
                    <tr>
                      <td><strong>Vận chuyển:</strong></td>
                      <td>&nbsp;</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="custom-control custom-radio">
                          <input type="radio" id="free-shipping" name="shipping" className="custom-control-input" onChange={handleFreeShippingChange} />
                          <label className="custom-control-label" htmlFor="free-shipping">Miễn phí giao hàng:</label>
                        </div>
                      </td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="custom-control custom-radio">
                          <input type="radio" id="standard-shipping" name="shipping" className="custom-control-input" onChange={handleStandardShippingChange} />
                          <label className="custom-control-label" htmlFor="standard-shipping">Tiết Kiệm:</label>
                        </div>
                      </td>
                      <td>10</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="custom-control custom-radio">
                          <input type="radio" id="express-shipping" name="shipping" className="custom-control-input" onChange={handleExpressShippingChange} />
                          <label className="custom-control-label" htmlFor="express-shipping">Nhanh:</label>
                        </div>
                      </td>
                      <td>20</td>
                    </tr>
                    <tr>
                      <td><strong>Tổng:</strong></td>
                      <td>{total.toFixed(3)}</td>
                    </tr>
                  </tbody>
                </table>
                <Link className="btn btn-default check_out text-right" href="#" to="/dat-hang">Thanh Toán</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Cart;
