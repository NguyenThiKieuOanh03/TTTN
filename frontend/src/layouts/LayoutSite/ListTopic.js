import { useEffect, useState } from "react";
import TopicService from "../../services/TopicService"
import { Link } from "react-router-dom";


function TopicList() {
    const [listTopic, setListTopic] = useState([]);
    useEffect(function () {
        (async function () {
            const result = await TopicService.TopicByParentId(0)
            setListTopic(result.topics)
        })();
    }, []);
    return (
        <>
            <div className="listcategory mb-5">
                <div className="list-group">
                    <li
                        style={{ backgroundColor: '#fdb45e', color: 'white' }}
                        className="list-group-item "
                        aria-disabled="true"
                    >
                        Chủ Đề Bài Viết
                    </li>
                    {listTopic.map(function (topic, index) {
                        return (
                            <Link
                                key={index}
                                className="nav-link text-black list-group-item list-group-item-action"
                                to={"/chu-de-bai-viet/" + topic.slug}
                            >
                                {topic.name}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default TopicList;