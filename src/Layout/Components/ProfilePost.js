import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {deletePostOnWall} from "../../Redux/Slice/AuthReducer";


const ProfilePost = ({post,user}) => {
    const auth = useSelector((state) => state.auth.user);
    let authId = auth.id;
    const endpoint = "http://127.0.0.1:8000";

    const dispatch = useDispatch();

    const handleDeletePost = async () => {
        let response = await dispatch(deletePostOnWall(post.id));
        response = response.payload;
        if (!response.success){
            alert(response.message);
        }
    }

    return (
        <>
            <div className="post">
                <div className="user-block">
                    <img className="img-circle img-bordered-sm" src={endpoint + user.photo} alt="user image"/>
                    <span className="username">
                        <span>{user.name + " " + user.last_name}</span>
                        {post.user_id === authId && (<span onClick={handleDeletePost} className="float-right btn-tool" style={{cursor: "pointer"}}><i className="fas fa-trash"/></span>)}
                    </span>
                    <span className="description">{post.created_at}</span>
                </div>

                {post.photo && (<Link to={"/post/"+post.id}><img style={{maxWidth: '300px'}} src={endpoint + post.photo} alt="Photo" /></Link>)}

                <p>{post.description}</p>

                <p className="mb-0">
                    <span className="link-black text-sm mr-4">
                        {post.self_like ? <i className="fas fa-thumbs-up mr-1"/> : <i className="far fa-thumbs-up mr-1"/>}
                        {post.self_like ? 'Liked' : 'Like'} ({post.like_count})
                    </span>
                    <Link to={"/post/"+post.id}>
                        <span className="link-black text-sm">
                            <i className="far fa-comments mr-1"/> Comments ({post.comment_count})
                        </span>
                    </Link>
                </p>
            </div>
        </>
    );
}

export {ProfilePost};