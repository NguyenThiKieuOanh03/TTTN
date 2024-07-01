import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoryService from "../../services/CategoryService";

function ListCategory() {
    const[categorys,setCategory]=useState([]);
    useEffect(function(){
        (async function(){
            try{
            const result = await CategoryService.getCategoryByParentId(0);
            setCategory(result.categorys);
            }catch(error){
                console.error(error);
            }
        })();
    },[])
    return (
      <div className="listcategory mb-5">
        <div className="list-group">
          <li
           style={{ backgroundColor: '#fdb45e', color: 'black' }}
            className="list-group-item "
            aria-disabled="true"
          >
            Danh mục
          </li>
          {categorys.map(function (cat, index) {
            return (
              <Link
                key={index}
                className="nav-link text-black list-group-item list-group-item-action"
                to={"/danh-muc/" + cat.slug}
              >
                {cat.name}
              </Link>
            );
          })}
        </div>
      </div>
    );
}

export default ListCategory;