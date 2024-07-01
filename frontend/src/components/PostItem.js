import { urlImage } from '../config';
import { Link } from 'react-router-dom';

function PostItem(props) {
    return (
        <article className="entry entry-list">
            <div className="row align-items-center">
                <div className="col-md-5">
                    <figure className="entry-media">
                        <Link to={"/chi-tiet-bai-viet/" + props.post.slug}>
                            <img
                                className="img-fluid"
                                src={urlImage + "post/" + props.post.image}
                                alt={props.post.title}
                            />
                        </Link>
                    </figure>{/* End .entry-media */}
                </div>{/* End .col-md-5 */}
                <div className="col-md-7">
                    <div className="post-title">
                        <h3 style={{ marginBottom: '5px', marginTop: '0px' }}>
                            <Link to={"/chi-tiet-bai-viet/" + props.post.slug}>
                                {props.post.title}
                            </Link>
                        </h3>
                    </div>
                    <div className="post-detail" style={{ marginTop: '20px' }}>
                        <p>{props.post.description}</p> 
                    </div>
                </div>{/* End .col-md-7 */}
            </div>{/* End .row */}
        </article>
    );
}

export default PostItem;
