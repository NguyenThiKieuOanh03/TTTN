import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContactService from '../../../services/ContactService';
const Contact = () => {
	const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
	const [status, setStatus] = useState(1);

    const handleSubmit = (event) => {
        event.preventDefault();
        const contact = new FormData();
        contact.append("name", name);
        contact.append("email", email);
        contact.append("phone", phone);
        contact.append("title", title);
        contact.append("content", content);
        contact.append("status", status);

        (async () => {
            const result = await ContactService.store(contact);
            alert(result.message);
            navigate('/lien-he', { replace: true });
        })();
    };
    useEffect(() => {
        (async () => {
            const result = await ContactService.index();
            setContacts(result.contacts);
        })();
    }, []);
    return ( 
        <div id="contact-page" class="container">
    	<div class="bg">
	    	<div class="row">    		
	    		<div class="col-sm-12">    			   			
					<h2 class="title text-center"> Địa Điểm <strong> Liên Hệ </strong></h2>    			    				    				
					<div id="gmap" class="contact-map">
					<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.487667640671!2d106.6834132749078!3d10.
                        773912089374667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f249c8318e3%3A0xa5e4a576dde9fab3!2zMjI1IE5ndXnhu4VuIMSQw6xua
                        CBDaGnhu4N1LCBQaMaw4budbmcgNSwgUXXhuq1uIDMsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1686993999370!5m2!1svi!2s"
                            width="1150" height="400" style={{ border: 0 }} > allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"</iframe>
					</div>
				</div>			 		
			</div>    	
    		<div class="row">  	
	    		<div class="col-sm-8">
	    			<div class="contact-form">
	    				<h2 class="title text-center">Liên Hệ </h2>
	    				<div class="status alert alert-success" style={{display: "none"}}></div>
				    	<form id="main-contact-form" class="contact-form row" name="contact-form" method="post" onSubmit={handleSubmit}>
				            <div class="form-group col-md-6">
				                <input type="text" name="name" class="form-control" required="required" placeholder="Name"
								value={name} onChange={(e) => setName(e.target.value)} />
				            </div>
				            <div class="form-group col-md-6">
				                <input type="email" name="email" class="form-control" required="required" placeholder="Email"
								value={email} onChange={(e) => setEmail(e.target.value)}/>
				            </div>
				            <div class="form-group col-md-12">
				                <input type="text" name="phone" class="form-control" required="required" placeholder="Phone"
								value={phone} onChange={(e) => setPhone(e.target.value)}/>
				            </div>
							<div class="form-group col-md-12">
				                <input type="text" name="phone" class="form-control" required="required" placeholder="Title"
								value={title} onChange={(e) => setTitle(e.target.value)} />
				            </div>
				            <div class="form-group col-md-12">
				                <textarea name="message" id="message" required="required" class="form-control" rows="8" placeholder="Your Message Here"
								value={content} onChange={(e) => setContent(e.target.value)}></textarea>
				            </div>                        
				            <div class="form-group col-md-12">
				                <input type="submit" name="submit" class="btn btn-primary pull-right" value="Submit"/>
				            </div>
				        </form>
	    			</div>
	    		</div>
	    		<div class="col-sm-4">
	    			<div class="contact-info">
	    				<h2 class="title text-center">Thông Tin Liên Hệ</h2>
	    				<address>
	    					<p>E-Shopper </p>
							<p>225 Nguyễn Đình Chiểu, Phường 5, Quận 3, Thành phố Hồ Chí Minh</p>
							<p>Việt Nam</p>
							<p>Mobile: +84 366780423</p>
							<p>Fax: 1-714-252-0026</p>
							<p>Email: kieuoanh@gmail.com</p>
	    				</address>
	    				<div class="social-networks">
	    					<h2 class="title text-center"> Mạng xã hội</h2>
							<ul>
								<li>
									<a href="#"><i class="fa fa-facebook"></i></a>
								</li>
								<li>
									<a href="#"><i class="fa fa-twitter"></i></a>
								</li>
								<li>
									<a href="#"><i class="fa fa-google-plus"></i></a>
								</li>
								<li>
									<a href="#"><i class="fa fa-youtube"></i></a>
								</li>
							</ul>
	    				</div>
	    			</div>
    			</div>    			
	    	</div>  
    	</div>	
    </div>

     );
}
 
export default Contact;