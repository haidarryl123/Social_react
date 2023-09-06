
import {LikeSection} from "./LikeSection";
import {CommentSection} from "./CommentSection";
import {DeleteCommentSection} from "./DeleteCommentSection";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const Post = ({post,type}) => {
    const user = useSelector((state) => state.auth.user);

    return (
        <>
            <div className="row">
                <div className="col-md-4"/>
                <div className="col-md-4">
                    <div className="card card-widget">
                        <div className="card-header">
                            <div className="user-block">
                                <img className="img-circle" src={post.user.photo ? 'http://127.0.0.1:8000'+post.user.photo : 'http://127.0.0.1:8000/img/default.png'} alt="User Image" style={{objectFit: 'cover'}} />
                                <span className="username">
                                    <Link to={"/profile/"+post.user.id}>
                                        {post.user.name + ' ' + post.user.last_name}
                                    </Link>
                                </span>
                                <span className="description">{post.created_at}</span>
                            </div>
                        </div>
                        <div className="card-body">
                            {post.photo && post.photo.length > 0 ?
                            <Link to={"/post/"+post.id}>
                                <img className="img-fluid pad" src={'http://127.0.0.1:8000'+post.photo} alt="Photo" />
                            </Link> : ''
                            }

                            <p>{post.description}</p>

                            <LikeSection post={post} />

                            <Link to={"/post/"+post.id} className="float-right text-muted">
                                <span>{post.like_count}</span> likes - <span className="totalCommentSpan">{post.comment_count}</span> comments
                            </Link>
                        </div>

                        <div className="card-footer card-comments">
                            {type === 'multiple' && post.last_comment ?
                                (
                                    <div className="card-comment">
                                        <img className="img-circle img-sm" src={'http://127.0.0.1:8000'+post.last_comment.user_comment_last.photo} alt="User Image" style={{objectFit: 'cover'}} />
                                        <div className="comment-text">
                                                <span className="username">
                                                    <Link style={{color: '#dddddd'}} to={"/profile/"+post.last_comment.user_comment_last.id}>
                                                        {post.last_comment.user_comment_last.name + ' ' + post.last_comment.user_comment_last.last_name}
                                                    </Link>
                                                      <span className="text-muted float-right">{post.last_comment.created_at}
                                                          {/*<i className="fas fa-trash ml-3 deleteComment" style={{cursor: 'pointer'}} />*/}
                                                      </span>
                                                </span>
                                            {post.last_comment.comment}
                                        </div>
                                    </div>
                                ) : type === 'single' && post.comments ?

                                (
                                    post.comments.map((comment, index) => (
                                        <div className="card-comment" key={index}>
                                            <img className="img-circle img-sm" src={'http://127.0.0.1:8000'+comment.user_comment_info.photo} alt="User Image" style={{objectFit: 'cover'}} />
                                            <div className="comment-text">
                                                    <span className="username">
                                                        <Link style={{color: '#dddddd'}} to={"/profile/"+comment.user_comment_info.id}>
                                                            {comment.user_comment_info.name + ' ' + comment.user_comment_info.last_name}
                                                        </Link>
                                                        <span className="text-muted float-right">{comment.created_at}
                                                            {user !== null && user !== 'null' && user !== '' && user.id === comment.user_id ? <DeleteCommentSection comment={comment} /> : ''}
                                                        </span>
                                                    </span>
                                                {comment.comment}
                                            </div>
                                        </div>
                                    ))
                                ) : ''
                            }
                        </div>

                        <div className="card-footer">
                            <img className="img-fluid img-circle img-sm" src={post.my_self.photo ? 'http://127.0.0.1:8000'+post.my_self.photo : 'http://127.0.0.1:8000/img/default.png'} alt="Alt Text" style={{objectFit: 'cover'}} />
                            <div className="img-push">
                                <CommentSection post={post} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export {Post};