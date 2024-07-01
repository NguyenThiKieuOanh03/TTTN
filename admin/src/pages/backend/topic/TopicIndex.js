import { useEffect, useState } from "react";
import TopicService from "../../../services/TopicService";
import LoadingSpinner from "../../../LoadingSpinner";
import { FaEye, FaRegEdit, FaSave, FaToggleOff, FaToggleOn, FaTrash, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
const TopicIndex = () => {

   const [topics, setTopics] = useState([]);
   const [load, setLoad] = useState(false);
   const [reload,setReload]=useState(0);

   const [name, setName] = useState('');
   const [description, setDescription] = useState('');
   const [sort_order, setSortOrder] = useState(1);
   const [status, setStatus] = useState(1);

   useEffect(() => {
      (async () => {
         setLoad(true);
         const result = await TopicService.index();
         setTopics(result.topics);
         setLoad(false);
      })();
   }, [reload]);

   //ham them 
   const handleSubmit = (e) => {
      e.preventDefault();
      const topic = new FormData();
      topic.append("name", name);
      topic.append("description", description);
      topic.append("sort_order", sort_order);
      topic.append("status", status);
      (async()=>{
         const result= await TopicService.store(topic);
         alert(result.message);
         setReload(result.topic.id);
      })();
   };

   const handDelete = (id) => {
      (async () => {
         const result = await TopicService.delete(id);
         setReload(result.topic.id)
      })();
   };
   const handleStatus = (id) => {
      (async () => {
         const result = await TopicService.status(id);
         setReload(Date.now);

      })();
   };

    return ( 
        <div className="content">
        <section className="content-header my-2">
           <h1 className="d-inline">Chủ đề bài viết</h1>
           <div className="col-md-12 text-end">
               <Link to="/admin/topic/trash" className="btn btn-sm btn-danger" ><FaTrash />  Thùng Rác</Link>
            </div>

           <hr style={{border: "none"}} />
        </section>
        <section className="content-body my-2">

           <div className="row">
              <div className="col-md-4">
              <form onSubmit={handleSubmit}>

                 <div className="mb-3">
                    <label><strong>Tên chủ đề (*)</strong></label>
                    <input type="text" onChange={(e) => setName(e.target.value)}
                           value={name} className="form-control" placeholder="Tên chủ đề"/>
                 </div>
                 <div className="mb-3">
                    <label><strong><strong>Mô tả</strong></strong></label>
                    <textarea onChange={(e) => setDescription(e.target.value)}
                           value={description} rows="6" className="form-control" placeholder="Mô tả"></textarea>
                 </div>
                 <div className="mb-3">
                    <label><strong>Trạng thái</strong></label>
                    <select  onChange={(e) => setStatus(e.target.value)}
                           value={status} className="form-control">
                       <option value="1">Xuất bản</option>
                       <option value="2">Chưa xuất bản</option>
                    </select>
                 </div>
                 <div className="mb-3">
                        <label><strong>Sắp xếp</strong></label>
                        <select onChange={(e) => setSortOrder(e.target.value)}
                           value={sort_order}
                           className="form-select">
                           <option value="0">None</option>
                           {topics && topics.length > 0 && topics.map((topic, index) => {
                              return (<option key={index} value={topic.id}>Sau:{topic.name}</option>
                              )
                           })}
                        </select>
                     </div>
                 <div className="mb-3 text-end">
                    <button className="btn btn-sm btn-success" type="submit" name="THEM">
                       <FaSave className="fa fa-save"/> Lưu[Thêm]
                    </button>
                 </div>
                 </form>

              </div>
              <div className="col-md-8">
              {load ? <LoadingSpinner /> : ""}

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
                    {topics && topics.map((topic, index) => {
                           return (

                       <tr className="datarow"key={index}>
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
                                      <button onClick={()=>handleStatus(topic.id)}
                                      className={
                                       topic.status ===1
                                       ?"border-0 px-1 text-success"
                                       :"border-0 px-1 text-danger"

                                      }>
                                       {topic.status===1?<FaToggleOn/>:<FaToggleOff/>}
                                      </button>
                                          
                                       <Link to ={"/admin/topic/edit/" + topic.id} className="px-1 text-primary">
                                          <FaRegEdit />
                                       </Link>
                                       <Link to={"/admin/topic/show/"+topic.id} className="px-1 text-info">
                                          <FaEye/>
                                       </Link>
                                       <button onClick={()=>handDelete(topic.id)}
                                        className="border-0 px-1 text-danger">
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
              </div>
           </div>

        </section>
     </div>

     );
}
 
export default TopicIndex;