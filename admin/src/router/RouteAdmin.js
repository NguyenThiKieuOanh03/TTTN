// banner
import BannerCreate from "../pages/backend/banner/BannerCreate";
import BannerEdit from "../pages/backend/banner/BannerEdit";
import BannerIndex from "../pages/backend/banner/BannerIndex";
import BannerShow from "../pages/backend/banner/BannerShow";
import BannerTrash from "../pages/backend/banner/BannerTrash";
//brand
import BrandIndex from "../pages/backend/brand/BrandIndex";
import BrandEdit from "../pages/backend/brand/BrandEdit";
import BrandShow from "../pages/backend/brand/BrandShow";
import BrandTrash from "../pages/backend/brand/BrandTrash";
//category
import CategoryEdit from "../pages/backend/category/CategoryEdit";
import CategoryIndex from "../pages/backend/category/CategoryIndex";
import CategoryShow from "../pages/backend/category/CategoryShow";
import CategoryTrash from "../pages/backend/category/CategoryTrash";
//config
import ConfigIndex from "../pages/backend/config/ConfigIndex";
//contact
import ContactReply from "../pages/backend/contact/ContactReply";
import ContactIndex from "../pages/backend/contact/ContactIndex";
import ContactShow from "../pages/backend/contact/ContactShow";
import ContactTrash from "../pages/backend/contact/ContactTrash";
//customer
import CustomerCreate from "../pages/backend/customer/CustomerCreate";
import CustomerEdit from "../pages/backend/customer/CustomerEdit";
import CustomerIndex from "../pages/backend/customer/CustomerIndex";
import CustomerShow from "../pages/backend/customer/CustomerShow";
import CustomerTrash from "../pages/backend/customer/CustomerTrash";
//menu
import MenuEdit from "../pages/backend/menu/MenuEdit";
import MenuIndex from "../pages/backend/menu/MenuIndex";
import MenuShow from "../pages/backend/menu/MenuShow";
import MenuTrash from "../pages/backend/menu/MenuTrash";
//order
import OrderExport from "../pages/backend/order/OrderExport";
import OrderIndex from "../pages/backend/order/OrderIndex";
import OrderShow from "../pages/backend/order/OrderShow";
//page
import PageCreate from "../pages/backend/page/PageCreate";
import PageEdit from "../pages/backend/page/PageEdit";
import PageIndex from "../pages/backend/page/PageIndex";
import PageShow from "../pages/backend/page/PageShow";
import PageTrash from "../pages/backend/page/PageTrash";
//post
import PostCreate from "../pages/backend/post/PostCreate";
import PostEdit from "../pages/backend/post/PostEdit";
import PostIndex from "../pages/backend/post/PostIndex";
import PostShow from "../pages/backend/post/PostShow";
import PostTrash from "../pages/backend/post/PostTrash";
//product
import ProductCreate from "../pages/backend/product/ProductCreate";
import ProductEdit from "../pages/backend/product/ProductEdit";
import ProductImport from "../pages/backend/product/ProductImport";
import ProductIndex from "../pages/backend/product/ProductIndex";
import ProductSale from "../pages/backend/product/ProductSale";
import ProductShow from "../pages/backend/product/ProductShow";
import ProductTrash from "../pages/backend/product/ProductTrash";
//topic
import TopicEdit from "../pages/backend/topic/TopicEdit";
import TopicIndex from "../pages/backend/topic/TopicIndex";
import TopicShow from "../pages/backend/topic/TopicShow";
import TopicTrash from "../pages/backend/topic/TopicTrash";
//user
import UserCreate from "../pages/backend/user/UserCreate";
import UserEdit from "../pages/backend/user/UserEdit";
import UserIndex from "../pages/backend/user/UserIndex";
import UserShow from "../pages/backend/user/UserShow";
import UserTrash from "../pages/backend/user/UserTrash";

const RouteAdmin =[
    //banner
    {path:'/admin/banner/create',component:BannerCreate},
    {path:'/admin/banner/edit/:id',component:BannerEdit},
    {path:'/admin/banner/index',component:BannerIndex},
    {path:'/admin/banner/show/:id',component:BannerShow},
    {path:'/admin/banner/trash',component:BannerTrash},
    //brand
    {path:'/admin/brand/edit/:id',component:BrandEdit},
    {path:'/admin/brand/index',component:BrandIndex},
    {path:'/admin/brand/show/:id',component:BrandShow},
    {path:'/admin/brand/trash',component:BrandTrash},
    //category
    {path:'/admin/category/edit/:id',component:CategoryEdit},
    {path:'/admin/category/index',component:CategoryIndex},
    {path:'/admin/category/show/:id',component:CategoryShow},
    {path:'/admin/category/trash',component:CategoryTrash},
    //config
    {path:'/admin/config/index',component:ConfigIndex},
    //contact
    {path:'/admin/contact/reply/:id',component:ContactReply},
    {path:'/admin/contact/index',component:ContactIndex},
    {path:'/admin/contact/show/:id',component:ContactShow},
    {path:'/admin/contact/trash',component:ContactTrash},
    //customer
    {path:'/admin/customer/create',component:CustomerCreate},
    {path:'/admin/customer/edit/:id',component:CustomerEdit},
    {path:'/admin/customer/index',component:CustomerIndex},
    {path:'/admin/customer/show/:id',component:CustomerShow},
    {path:'/admin/customer/trash',component:CustomerTrash},
    //menu
    {path:'/admin/menu/edit/:id',component:MenuEdit},
    {path:'/admin/menu/index',component:MenuIndex},
    {path:'/admin/menu/show/:id',component:MenuShow},
    {path:'/admin/menu/trash',component:MenuTrash},
    //order
    {path:'/admin/order/export',component:OrderExport},
    {path:'/admin/order/index',component:OrderIndex},
    {path:'/admin/order/show/:id',component:OrderShow},
    //page
    {path:'/admin/page/create',component:PageCreate},
    {path:'/admin/page/edit/:id',component:PageEdit},
    {path:'/admin/page/index',component:PageIndex},
    {path:'/admin/page/show/:id',component:PageShow},
    {path:'/admin/page/trash',component:PageTrash},
    // //post
    {path:'/admin/post/create',component:PostCreate},
    {path:'/admin/post/edit/:id',component:PostEdit},
    {path:'/admin/post/index',component:PostIndex},
    {path:'/admin/post/show/:id',component:PostShow},
    {path:'/admin/post/trash',component:PostTrash},
    //product
    {path:'/admin/product/create',component:ProductCreate},
    {path:'/admin/product/edit/:id',component:ProductEdit},
    {path:'/admin/product/import',component:ProductImport},
    {path:'/admin/product/index',component:ProductIndex},
    {path:'/admin/product/sale',component:ProductSale},
    {path:'/admin/product/show/:id',component:ProductShow},
    {path:'/admin/product/trash',component:ProductTrash},
    //topic
    {path:'/admin/topic/edit/:id',component:TopicEdit},
    {path:'/admin/topic/index',component:TopicIndex},
    {path:'/admin/topic/show/:id',component:TopicShow},
    {path:'/admin/topic/trash',component:TopicTrash},
    //user
    {path:'/admin/user/create',component:UserCreate},
    {path:'/admin/user/edit/:id',component:UserEdit},
    {path:'/admin/user/index',component:UserIndex},
    {path:'/admin/user/show/:id',component:UserShow},
    {path:'/admin/user/trash',component:UserTrash},
 
];
export default RouteAdmin;