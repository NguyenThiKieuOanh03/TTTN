import { FaTrashAlt, FaUndo } from "react-icons/fa";
import { useEffect, useState } from "react";
import TopicService from "../../../services/TopicService";
import { urlImage } from "../../../config";
import { Link } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";

const TopicTrash = () => {

   const [topics, setTopics] = useState([]);
   const [load, setLoad] = useState(true);
   const [reload, setReLoad] = useState(0);

   useEffect(() => {
      (async () => {
         setLoad(false);
         const result = await TopicService.trash();
         setTopics(result.topics);
         setLoad(true);
      })();
   }, [reload]);
   const handDelete = (id) => {
      (async () => {
         const result = await TopicService.destroy(id);
         alert(result.message);
         setReLoad(Date.now)
      })();
   };
   const handRestore = (id) => {
      (async () => {
         const result = await TopicService.restore(id);
         alert(result.message);
         setReLoad(result.topic.id)
      })();
   };

    return ( 
        <div className="content">
        <section className="content-header my-2">
           <h1 className="d-inline">Thùng rác chủ đề</h1>
           <div className="text-end">
               <Link to={"/admin/topic/index"} className="btn btn-sm btn-success">
                  <IoArrowBackSharp className="fa fa-arrow-left" /> Về danh sách
               </Link>
            </div>

        </section>
        <section className="content-body my-2">

           <table className="table table-bordered">
              <thead>
                 <tr>
                    <th className="text-center" style={{width:"30px"}}>
                       <input type="checkbox" id="checkboxAll" />
                    </th>
                    <th>Tên chủ đề</th>
                    <th>Tên slug</th>
                    <th className="text-center" style={{width:"30px"}}>ID</th>
                 </tr>
              </thead>
              <tbody>
              {topics && topics.length > 0 && topics.map((topic, index) => {
                     return (
                 <tr className="datarow">
                    <td>
                       <input type="checkbox" id="checkId" />
                    </td>
                    <td>
                       <div className="name">
                          <a href="topic_edit.html">
                          {topic.name}
                          </a>
                       </div>
                       <div className="function_style">
                                 <button onClick={() => handRestore(topic.id)} className="border-0 fa fa-undo text-primary mx-1" >
                                    <FaUndo />
                                 </button>

                                 <button onClick={() => handDelete(topic.id)} className="border-0 fa fa-trash text-danger mx-1" >
                                    <FaTrashAlt />
                                 </button>
                              </div>
                    </td>
                    <td>{topic.slug}</td>
                    <td className="text-center">{topic.id}</td>
                 </tr>
                  );
               })}
              </tbody>
           </table>

        </section>
     </div>

     );
}
 
export default TopicTrash;