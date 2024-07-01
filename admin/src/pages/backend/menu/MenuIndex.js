import { useEffect, useState } from "react";
import MenuService from "../../../services/MenuService";
import LoadingSpinner from "../../../LoadingSpinner";
import { FaEye, FaRegEdit, FaToggleOff, FaToggleOn, FaTrash, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const MenuIndex = () => {
   const [reload, setReload] = useState(0);

   const [menus, setMenus] = useState([]);
   const [categorys, setCategorys] = useState([]);
   const [brands, setBrands] = useState([]);
   const [topics, setTopics] = useState([]);
   const [pages, setPages] = useState([]);

   const [load, setLoad] = useState(false);

   const [position, setPosition] = useState('mainmenu');
   const [name, setName] = useState('');
   const [link, setLink] = useState('');


   useEffect(function() {
      (async function () {
         setLoad(true);
         const result = await MenuService.getList('index');
         setMenus(result.menus);
         setCategorys(result.categorys);
         setBrands(result.brands);
         setTopics(result.topics);
         setPages(result.pages);
         setLoad(false);
      })();
   }, [reload]);

   const handDelete = (id) => {
      (async function () {
         const result = await MenuService.delete(id);
         if (result.status === true){
         setReload(Date.now());
         toast.success(result.message);}
      })();
   };
   const handleStatus = (id) => {
      (async function() {
         const result = await MenuService.status(id);
         if (result.status === true){
            setReload(Date.now());
            toast.success(result.message);
         }
      })();
   }

   const handleSubmit = (event) => {
      event.preventDefault();
      const nameBtn = event.nativeEvent.submitter.name;
      const menu = {
         position:position
      }
//add category
      if (nameBtn === "ADDCATEGORY"){
         const categoryid = [];
         const categoryidchecked = document.querySelectorAll(".categoryid");
         categoryidchecked.forEach(function (item){
            if (item.checked){
               categoryid.push(item.value);
            }
         });
         menu['ADDCATEGORY'] = nameBtn;
         menu['categoryid'] = categoryid;
      };

//add brand
      if (nameBtn === "ADDBRAND"){
         const brandid = [];
         const brandidchecked = document.querySelectorAll(".brandid");
         brandidchecked.forEach(function(item){
            if (item.checked){
               brandid.push(item.value);
            }
         });
         menu['ADDBRAND'] = nameBtn;
         menu['brandid'] = brandid;
      };

//add topic
      if (nameBtn === "ADDTOPIC"){
         const topicid = [];
         const topicidchecked = document.querySelectorAll(".topicid");
         topicidchecked.forEach(function(item){
            if (item.checked){
               topicid.push(item.value);
            }
         });
         menu['ADDTOPIC'] = nameBtn;
         menu['topicid'] = topicid;
      };

//add page
if (nameBtn === "ADDPAGE"){
   const pageid = [];
   const pageidchecked = document.querySelectorAll(".pageid");
   pageidchecked.forEach(function(item){
      if (item.checked){
         pageid.push(item.value);
      }
   });
   menu['ADDPAGE'] = nameBtn;
   menu['pageid'] = pageid;
};


// add

if (nameBtn === "ADDCUSTOM"){
   menu['ADDCUSTOM'] = nameBtn;
   menu['name'] = name;
   menu['link'] = link;
};

(async function() {
   const result = await MenuService.store(menu);
   if (result.status===true){
      setReload(Date.now());
      toast.success(result.message);

   }
})();
   }


   return (
      <form onSubmit={handleSubmit}>
      <div className="content">
         <section className="content-header my-2">
            <h1 className="d-inline">Quản lý menu</h1>
            <div className="col-md-12 text-end">
               <Link to="/admin/menu/trash" className="btn btn-sm btn-danger" ><FaTrash />  Thùng Rác</Link>
            </div>
         </section>
         <section className="content-body my-2">
            <div className="row">
               <div className="col-md-3">

                  <ul className="list-group">
                     <li className="list-group-item mb-2">
                        <select onChange={(e) => setPosition(e.target.value)}
                           value={position} className="form-control">
                           <option value="mainmenu">Main Menu</option>
                           <option value="footermenu">Footer Menu</option>
                        </select>
                     </li>
                     <li className="list-group-item mb-2 border">
                        <a className="d-block" href="#multiCollapseCategory" data-bs-toggle="collapse">
                           Danh mục sản phẩm
                        </a>
                        <div className="collapse multi-collapse border-top mt-2" id="multiCollapseCategory">
                        {categorys && categorys.map((category, index) => {
                           return (

                           <div className="form-check" key={index}>
                              <input value={category.id}
                             className="form-check-input categoryid" type="checkbox" id = {"categoryid" + category.id} />
                              <label className="form-check-label" htmlFor={"categoryid" + category.id}>
                                 {category.name}
                              </label>
                           </div>
                             );
                           })}
   
                           <div className="my-3">
                              <button name="ADDCATEGORY" type="submit"
                                 className="btn btn-sm btn-success form-control">Thêm</button>
                           </div>
                        </div>
                     </li>
                     <li className="list-group-item mb-2 border">
                        <a className="d-block" href="#multiCollapseBrand" data-bs-toggle="collapse">
                           Thương hiệu
                        </a>
                        <div className="collapse multi-collapse border-top mt-2" id="multiCollapseBrand">
                        {brands && brands.map((brand, index) => {
                           return (

                           <div className="form-check" key={index}>
                              <input value={brand.id}
                             className="form-check-input brandid" type="checkbox" id = {"brandid"+brand.id} />
                              <label className="form-check-label" htmlFor={"brandid" + brand.id}>
                                 {brand.name}
                              </label>
                           </div>
                             );
                           })}

                           <div className="my-3">
                              <button name="ADDBRAND" type="submit"
                                 className="btn btn-sm btn-success form-control">Thêm</button>
                           </div>
                        </div>
                     </li>
                     <li className="list-group-item mb-2 border">
                        <a className="d-block" href="#multiCollapseTopic" data-bs-toggle="collapse">
                           Chủ đề bài viết
                        </a>
                        <div className="collapse multi-collapse border-top mt-2" id="multiCollapseTopic">
                        {topics && topics.map((topic, index) => {
                           return (

                           <div className="form-check" key={index}>
                              <input value={topic.id}
                             className="form-check-input topicid" type="checkbox" id = {"topicid"+topic.id} />
                              <label className="form-check-label" htmlFor={"topicid" + topic.id}>
                                 {topic.name}
                              </label>
                           </div>
                             );
                           })}

                           <div className="my-3">
                              <button name="ADDTOPIC" type="submit"
                                 className="btn btn-sm btn-success form-control">Thêm</button>
                           </div>
                        </div>
                     </li>
                     <li className="list-group-item mb-2 border">
                        <a className="d-block" href="#multiCollapsePage" data-bs-toggle="collapse">
                           Trang đơn
                        </a>
                        <div className="collapse multi-collapse border-top mt-2" id="multiCollapsePage">
                        {pages && pages.map((page, index) => {
                           return (

                           <div className="form-check" key={index}>
                              <input value={page.id}
                             className="form-check-input pageid" type="checkbox" id = {"pageid"+page.id} />
                              <label className="form-check-label" htmlFor={"pageid" + page.id}>
                                 {page.title}
                              </label>
                           </div>
                             );
                           })}

                           <div className="my-3">
                              <button name="ADDPAGE" type="submit"
                                 className="btn btn-sm btn-success form-control">Thêm</button>
                           </div>
                        </div>
                     </li>
                     <li className="list-group-item mb-2 border">
                        <a className="d-block" href="#multiCollapseCustom" data-bs-toggle="collapse">
                           Tùy biến liên kết
                        </a>
                        <div className="collapse multi-collapse border-top mt-2" id="multiCollapseCustom">
                           <div className="mb-3">
                              <label>Tên menu</label>
                              <input type="text"  onChange={(e) => setName(e.target.value)}
                           value={name} className="form-control" />
                           </div>
                           <div className="mb-3">
                              <label>Liên kết</label>
                              <input type="text"  onChange={(e) => setLink(e.target.value)}
                           value={link} className="form-control" />
                           </div>
                           <div className="my-3">
                              <button name="ADDCUSTOM" type="submit"
                                 className="btn btn-sm btn-success form-control">Thêm</button>
                           </div>
                        </div>
                     </li>
                  </ul>
               </div>
               <div className="col-md-9">
                  {load ? <LoadingSpinner /> : ""}
                  <table className="table table-bordered">
                     <thead>
                        <tr>
                           <th className="text-center" style={{ width: "30px" }}>
                              <input type="checkbox" id="checkboxAll" />
                           </th>
                           <th>Tên menu</th>
                           <th>Liên kết</th>
                           <th>Vị trí</th>
                           <th className="text-center" style={{ width: "30px" }}>ID</th>
                        </tr>
                     </thead>
                     <tbody>
                        {menus && menus.map((menu, index) => {
                           return (
                              <tr className="datarow" key={index}>
                                 <td className="text-center">
                                    <input type="checkbox"/>
                                 </td>
                                 <td>
                                    <div className="name">
                                       <Link to={'/admin/menu/edit/'+menu.id}>
                                       {menu.name}
                                       </Link>
                                    </div>
                                    <div className="function_style">
                                       <button onClick={() => handleStatus(menu.id)}
                                          className={
                                             menu.status === 1
                                                ? "border-0 px-1 text-success"
                                                : "border-0 px-1 text-danger"

                                          }>
                                          {menu.status === 1 ? <FaToggleOn /> : <FaToggleOff />}
                                       </button>

                                       <Link to={"/admin/menu/edit/" + menu.id} className="px-1 text-primary">
                                          <FaRegEdit />
                                       </Link>
                                       <Link to={"/admin/menu/show/" + menu.id} className="px-1 text-info">
                                          <FaEye />
                                       </Link>
                                       <button onClick={() => handDelete(menu.id)}
                                          className="border-0 px-1 text-danger">
                                          <FaTrashAlt />
                                       </button>
                                    </div>

                                 </td>
                                 <td>{menu.link}</td>
                                 <td>{menu.position}</td>
                                 <td className="text-center">{menu.id}</td>
                              </tr>
                           );
                        })}
                     </tbody>
                  </table>
               </div>
            </div>

         </section>
      </div>
</form>
   );
}

export default MenuIndex;