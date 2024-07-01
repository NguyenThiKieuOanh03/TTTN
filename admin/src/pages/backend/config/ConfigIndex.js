import { useState } from "react";
import ConfigService from "../../../services/ConfigService";
import { FaSave } from "react-icons/fa";
const ConfigIndex = () => {


   //
   const [author, setAuthor] = useState('');
   const [email, setEmail] = useState('');
   const [phone, setPhone] = useState('');
   const [zalo, setZalo] = useState('');
   const [facebook, setFacebook] = useState('');
   const [address, setAddress] = useState('');
   const [youtube, setYoutube] = useState('');
   const [metadesc, setMetadesc] = useState('');
   const [metakey, setMetakey] = useState('');
   const [status, setStatus] = useState(1);

   const handleSubmit = (event) => {
      event.preventDefault();
      const config = new FormData();
      config.append("author", author);
      config.append("phone", phone);
      config.append("email", email);
      config.append("zalo", zalo);
      config.append("facebook", facebook);
      config.append("address", address);
      config.append("youtube", youtube);
      config.append("metadesc", metadesc);
      config.append("metadesc", metadesc);
      config.append("status", status);
      (async () => {
         const result = await ConfigService.store(config);
         alert(result.message);
      })();
   };




    return ( 
        <div className="content">
        <section className="content-header my-2">
           <h1 className="d-inline">Cấu hình website</h1>
        </section>
        <section className="content-body my-3">
        <form onSubmit={handleSubmit}>

           <form action="" method="post">
              <input type="hidden" name="id" value=""/>
              <div className="mb-3">
                 <label for="author"><strong>Tác giả(*)</strong></label>
                 <input type="text" value={author}
                           onChange={(e) => setAuthor(e.target.value)} className="form-control" />
              </div>
              <div className="mb-3">
                 <label for="email"><strong>Email(*)</strong></label>
                 <input type="text" value={email}
                           onChange={(e) => setEmail(e.target.value)} className="form-control" />
              </div>
              <div className="mb-3">
                 <label for="phone"><strong>Điện thoại(*)</strong></label>
                 <input type="text" value={phone}
                           onChange={(e) => setPhone(e.target.value)} className="form-control" />
              </div>
              <div className="mb-3">
                 <label for="zalo"><strong>Zalo(*)</strong></label>
                 <input type="text" value={zalo}
                           onChange={(e) => setZalo(e.target.value)} className="form-control" />
              </div>

              <div className="mb-3">
                 <label for="facebook"><strong>Facebook cá nhân(*)</strong></label>
                 <input type="text" value={facebook}
                           onChange={(e) => setFacebook(e.target.value)} className="form-control" />
              </div>

              <div className="mb-3">
                 <label for="address"><strong>Địa chỉ(*)</strong></label>
                 <input type="text" value={address}
                           onChange={(e) => setAddress(e.target.value)} className="form-control" />
              </div>

              <div className="mb-3">
                 <label for="youtube"><strong>Kênh Youtube(*)</strong></label>
                 <input type="text" value={youtube}
                           onChange={(e) => setYoutube(e.target.value)} className="form-control" />
              </div>

              <div className="mb-3">
                 <label for="metadesc"><strong>Mô tả seo(*)</strong></label>
                 <textarea name="metadesc" value={metadesc}
                           onChange={(e) => setMetadesc(e.target.value)} className="form-control"></textarea>
              </div>
              <div className="mb-3">
                 <label for="metakey"><strong>Từ khoa seo(*)</strong></label>
                 <textarea name="metakey" value={metakey}
                           onChange={(e) => setMetakey(e.target.value)} className="form-control"></textarea>
              </div>
              <div className="mb-3">
                 <label for="status"><strong>Trạng thái</strong></label>
                 <select value={status}
                              onChange={(e) => setStatus(e.target.value)} className="form-select">
                    <option value="1">Online
                    </option>
                    <option value="2">Offline
                    </option>
                 </select>
              </div>
              <div className="mb-3">
                 <button type="submit" className="btn btn-success">
                    <FaSave className="fa fa-save" aria-hidden="true"/> Lưu cấu hình
                 </button>
              </div>
           </form>
</form>
        </section>
     </div>

     );
}
 
export default ConfigIndex;