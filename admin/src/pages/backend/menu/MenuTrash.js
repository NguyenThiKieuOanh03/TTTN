import { FaTrashAlt, FaUndo } from "react-icons/fa";
import { useEffect, useState } from "react";
import MenuService from "../../../services/MenuService";
import { Link } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";

const MenuTrash = () => {

   const [menus, setMenus] = useState([]);
   const [load, setLoad] = useState(true);
   const [reload, setReLoad] = useState(0);

   useEffect(() => {
      (async () => {
         setLoad(false);
         const result = await MenuService.trash();
         setMenus(result.menus);
         setLoad(true);
      })();
   }, [reload]);
   const handDelete = (id) => {
      (async () => {
         const result = await MenuService.destroy(id);
         alert(result.message);
         setReLoad(Date.now)
      })();
   };
   const handRestore = (id) => {
      (async () => {
         const result = await MenuService.restore(id);
         alert(result.message);
         setReLoad(result.menu.id)
      })();
   };



   return (
      <div className="content">
         <section className="content-header my-2">
            <h1 className="d-inline">Thùng rác menu</h1>
            <div className="text-end">
               <Link to={"/admin/menu/index"} className="btn btn-sm btn-success">
                  <IoArrowBackSharp className="fa fa-arrow-left" /> Về danh sách
               </Link>
            </div>
         </section>
         <section className="content-body my-2">

            <table className="table table-bordered">
               <thead>
                  <tr>
                     <th className="text-center" style={{ width: "30px" }}>
                        <input type="checkbox" id="checkboxAll" />
                     </th>
                     <th>Tên menu</th>
                     <th>Liên kết</th>
                     <th>Vị trí</th>
                  </tr>
               </thead>
               <tbody>
               {menus && menus.length > 0 && menus.map((menu, index) => {
                     return (


                  <tr className="datarow">
                     <td>
                        <input type="checkbox" id="checkId" />
                     </td>
                     <td>
                        <div className="name">
                           <a href="menu_show.html">
                           {menu.name}
                           </a>
                        </div>
                        <div className="function_style">
                        <button onClick={() => handRestore(menu.id)} className="border-0 fa fa-undo text-primary mx-1" >
                                    <FaUndo />
                                 </button>

                                 <button onClick={() => handDelete(menu.id)} className="border-0 fa fa-trash text-danger mx-1" >
                                    <FaTrashAlt />
                                 </button>


                        </div>
                     </td>
                     <td>{menu.link}</td>
                     <td>{menu.position}</td>
                  </tr>

);
})}
               </tbody>
            </table>

         </section>
      </div>

   );
}

export default MenuTrash;