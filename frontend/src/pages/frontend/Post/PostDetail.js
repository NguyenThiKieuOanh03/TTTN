import { useEffect, useState } from "react";
import PostService from "../../../services/PostService"
import { useParams } from "react-router-dom";
import { urlImage } from "../../../config";

function PostDetail() {
    const { slug } = useParams();
    const [post, setPost] = useState([]);
    useEffect(function () {
        (async function () {
            try {
                const result = await PostService.ById(slug)
                setPost(result.post)
            }
            catch (error) {
                console.log(error)
            }
        })();
    }, [slug]);

    // Tách nội dung của "detail" thành các đoạn văn bản riêng biệt
    const detailParagraphs = post.detail ? post.detail.split('\n') : [];

    return (
        <>
            <section className="maincontent">
                <div className="container my-4">
                    <div className="row">
                        <h1>{post.title}</h1>

                        <div className="img_feature my-4">
                            <img 
                                src={urlImage + "post/" + post.image}
                                alt={post.title}
                            />
                        </div>
                        <h4>{post.description}</h4>
                        {detailParagraphs.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                    
                </div>
                
            </section>
            <br/>
            <br/>
            <br/>
        </>
    );
}

export default PostDetail;
