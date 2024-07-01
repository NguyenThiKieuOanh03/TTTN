import Contact from "../pages/frontend/Contact";
import Home from"../pages/frontend/Home";
import Product from "../pages/frontend/Product";
import ProductDetail from "../pages/frontend/Product/ProductDetail";
import ProductCategory from "../pages/frontend/ProductCategory";
import Register from "../pages/frontend/Register";
import Cart from "../pages/frontend/Cart";
import Post from "../pages/frontend/Post";
import PostDetail from "../pages/frontend/Post/PostDetail";
import PostTopic from "../pages/frontend/Post/PostTopic";
import Search from "../layouts/LayoutSite/Search";
import Login from "../pages/frontend/Login";
import Checkout from "../pages/frontend/Cart/Checkout";

const RouteSite =[
    {path:'/',component:Home},
    { path: "/san-pham", component: Product },
    { path: "/lien-he", component: Contact },
    { path: "/chi-tiet-san-pham/:slug", component: ProductDetail },
    { path: "/danh-muc/:slug", component: ProductCategory },
    { path: "/dang-ky", component: Register },
    { path: "/dang-nhap", component: Login },
    { path: "/gio-hang", component: Cart },
    { path: "/dat-hang", component: Checkout },
    { path: "/bai-viet", component: Post },
    { path: "/chi-tiet-bai-viet/:slug", component: PostDetail },
    { path: "/chu-de-bai-viet/:slug", component: PostTopic },
    {path:'/tim-kiem/:key',component:Search},
];
export default RouteSite;