
import { useDispatch } from 'react-redux';
import { likePostAsync } from "../../Redux/Slice/PostReducer";

const LikeSection = ({post}) => {
    const dispatch = useDispatch();

    const handleLike = async () => {
        let response = await dispatch(likePostAsync(post.id));
        response = response.payload;
        if (!response.success){
            alert(response.message);
        }
    }

    return (
        <>
            <button type="button" className="btn btn-default btn-sm btnLike" onClick={handleLike}>
                {post.self_like ? <i className="fas fa-thumbs-up mr-1"/> : <i className="far fa-thumbs-up mr-1"/>}
                {post.self_like ? 'Liked' : 'Like'}
            </button>
        </>
    );
}

export {LikeSection};