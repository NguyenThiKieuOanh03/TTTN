import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const LayoutSite = () => {
   return (
      <>
         <Header />
         <Outlet/>
         <Footer/>
         {/* <section className="dhl-copyright bg-dark py-3">
            <div className="container text-center text-white">
               Thiết kế bởi: Nguyễn Thị Kiều Oanh - Phone: 0366780423
            </div>
         </section> */}
      </>
   );
}
export default LayoutSite;