import { FaPlus, FaProductHunt, FaRegCircle  } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Menu = () => {
    function handleItemClick(item) {
        const ntkoitem = document.getElementById(item);
        ntkoitem.classList.toggle("active");
     }
    return ( 
        <ul class="main">
        <li class="ntkoitem item-sub" id="item1" onClick={() => handleItemClick('item1')}>
           <FaProductHunt class="icon-left"/>
           <Link to="#">Sản phẩm</Link>
           <FaPlus class="fa-solid fa-plus icon-right"/>
           <ul class="submenu">
              <li>
                 <Link to="/admin/product/index">Tất cả sản phẩm</Link>
              </li>
              <li>
                 <Link to="/admin/product/import">Nhập hàng</Link>
              </li>
              <li>
                 <Link to="/admin/category/index">Danh mục</Link>
              </li>
              <li>
                 <Link to="/admin/brand/index">Thương hiệu</Link>
              </li>
              <li>
                 <Link to="/admin/product/sale">Khuyến mãi</Link>
              </li>
           </ul>
        </li>
        <li class="ntkoitem item-sub" id="item2" onClick={() => handleItemClick('item2')}>
        <FaProductHunt class="icon-left"/>
           <Link to="#">Bài viết</Link>
           <FaPlus class="fa-solid fa-plus icon-right"/>
           <ul class="submenu">
              <li>
                 <Link to="/admin/post/index">Tất cả bài viết</Link>
              </li>
              <li>
                 <Link to="/admin/topic/index">Chủ đề</Link>
              </li>
              <li>
                 <Link to="/admin/page/index">Trang đơn</Link>
              </li>
           </ul>
        </li>
        <li class="ntkoitem item-sub" id="item3" onClick={() => handleItemClick('item3')}>
        <FaProductHunt class="icon-left"/>
           <Link to="#">Quản lý bán hàng</Link>
           <FaPlus class="fa-solid fa-plus icon-right"/>
           <ul class="submenu">
              <li>
                 <Link to="/admin/order/index">Tất cả đơn hàng</Link>
              </li>
              <li>
                 <Link to="/admin/order/export">Xuất hàng</Link>
              </li>
           </ul>
        </li>
        <li class="ntkoitem">
        <FaRegCircle class="icon-left"/>
           <Link to="/admin/customer/index">Khách hàng</Link>
        </li>
        <li class="ntkoitem">
        <FaRegCircle class="icon-left"/>
           <Link to="/admin/contact/index">Liên hệ</Link>
        </li>
        <li class="ntkoitem item-sub" id="item4" onClick={() => handleItemClick('item4')}>
        <FaProductHunt class="icon-left"/>
           <Link to="#">Giao diện</Link>
           <FaPlus class="fa-solid fa-plus icon-right"/>
           <ul class="submenu">
              <li>
                 <Link to="/admin/menu/index">Menu</Link>
              </li>
              <li>
                 <Link to="/admin/banner/index">Banner</Link>
              </li>
           </ul>
        </li>
        <li class="ntkoitem item-sub" id="item5" onClick={() => handleItemClick('item5')}>
        <FaProductHunt class="icon-left"/>
           <Link to="#">Hệ thống</Link>
           <FaPlus class="fa-solid fa-plus icon-right"/>
           <ul class="submenu">
              <li>
                 <Link to="/admin/user/index">Thành viên</Link>
              </li>
              <li>
                 <Link to="/admin/config/index">Cấu hình</Link>
              </li>
           </ul>
        </li>
     </ul>

     );
}
 
export default Menu;