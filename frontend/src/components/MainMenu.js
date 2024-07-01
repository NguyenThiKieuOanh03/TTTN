import { Link } from "react-router-dom";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const MainMenu = () => {
    const [key, setKey] = useState("");

    return (
        <div className="header-bottom">
            <div className="container">
                <div className="row">
                    <div className="col-sm-9">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        </div>
                        <div className="mainmenu pull-left">
                            <ul className="nav navbar-nav collapse navbar-collapse">
                                <li>
                                    <Link className="dropdown" to="/">Trang chủ</Link>
                                </li>
                                <li>
                                    <Link className="dropdown" to="/san-pham">Sản phẩm</Link>
                                </li>
                                <li >
                                    <Link className="dropdown">
                                        Danh mục
                                    </Link>
                                    <ul role="menu" className="sub-menu">
                                        <li><Link className="dropdown-item text-main" to="/danh-muc/iphone">Iphone</Link></li>
                                        <li><Link className="dropdown-item text-main" to="/danh-muc/samsung">Samsung</Link></li>
                                    </ul>
                                </li>
                                <li>
                                    <Link className="dropdown" to="/lien-he">Liên hệ</Link>
                                </li>
                                <li>
                                    <Link className="dropdown" to="/bai-viet">Bài viết</Link>
                                </li>
                                <li>
                                    <Link className="dropdown" to="/chu-de-bai-viet/ios-gap-loi">Tin tức</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-sm-3 ">
                        <div className="input-group mb-3">
                            <input
                                value={key}
                                onChange={(e) => setKey(e.target.value)}
                                className="form-control"
                                placeholder="Tìm Kiếm"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                            />
                            <button
                                className="btn bg-main"
                                type="button"
                            >
                                <Link aria-hidden="true" to={"/tim-kiem/" + key}>
                                    <FaSearch />
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainMenu;
