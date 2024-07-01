import { useEffect, useState } from "react";
import PostItem from "../../../components/PostItem";
import PostService from "../../../services/PostService";

function Post() {
    const [posts, setPosts] = useState([]);
    const [limit, setLimit] = useState(3);

    useEffect(() => {
        PostService.getPostAll(limit, 1)
            .then((result) => {
                setPosts(result.posts);
            });
    }, [limit]);

    const postItemStyle = {
        marginBottom: '20px'
    };

    return (
        <section className="maincontent">
            <div className="container my-4">
                <h1>TẤT CẢ BÀI VIẾT</h1>
                <div className="row">
                    {posts.map((post, index) => (
                        <div className="col-12" key={index} style={postItemStyle}>
                            <PostItem post={post} />
                        </div>
                    ))}
                </div>
                <div className="row">
                    <div className="col-12 text-center my-3">
                        <button className="btn btn-success" onClick={() => setLimit(limit + 2)}>Xem Thêm</button>
                    </div>
                </div>
                <br/>
                <br/>
            </div>
        </section>
    );
}


export default Post;
