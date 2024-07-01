import { useEffect, useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { FaSave } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import ContactService from "../../../services/ContactService";

const ContactReply = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [contact, setContact] = useState(null);
    const [title, setTitle] = useState("");
    const [replyContent, setReplyContent] = useState("");

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const result = await ContactService.show(id);
                setContact(result.contact);
                setTitle(result.contact.title);
            } catch (error) {
                console.error("Lỗi khi lấy thông tin liên hệ:", error);
            }
        };
        fetchContact();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            title: title,
            replyContent: replyContent,
            reply_id: true,
            status: 1,
        };
        try {
            await ContactService.reply(formData, id);
            toast.success("Trả lời liên hệ thành công!", {
                position: 'top-right',
            });
            navigate("/admin/contact/index");
        } catch (error) {
            console.error("Lỗi trả lời liên hệ:", error);
            toast.error("Lỗi trả lời liên hệ!", {
                position: 'top-right',
            });
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Trả lời liên hệ</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="content">
                    <div className="card">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-my-2 text-end">
                                    <button type="submit" className="btn btn-success btn-sm" >
                                        <FaSave className="fa fa-save" /> Gửi [Trả lời]
                                    </button>
                                    <a href="/admin/contact/index" className="btn btn-sm btn-info ms-2">
                                        <IoArrowBackSharp className="fa fa-reply" /> Quay về danh sách
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            {/* Thông tin liên hệ */}
                            <div className="row">
                                <h4>Thông tin liên hệ</h4>
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>Họ và tên</th>
                                            <th>Email</th>
                                            <th>Chủ đề</th>
                                            <th>Nội dung câu hỏi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="text-start">{contact?.name}</td>
                                            <td>{contact?.email}</td>
                                            <td>{contact?.title}</td>
                                            <td>{contact?.content}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                {/* Form trả lời */}
                                <div className="col-md-6">
                                    <h4>Trả lời</h4>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            name="title"

                                            className="form-control"
                                            placeholder="Nhập tiêu đề email"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="replyContent">Trả lời</label>
                                        <textarea
                                            name="replyContent"

                                            className="form-control"
                                            rows="5"
                                            placeholder="Nhập câu trả lời"
                                            value={replyContent}
                                            onChange={(e) => setReplyContent(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </form>
    );
};

export default ContactReply;