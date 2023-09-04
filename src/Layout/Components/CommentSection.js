
import { useDispatch } from 'react-redux';
import { createCommentAsync } from "../../Redux/Slice/PostReducer";
import {useState} from "react";

const CommentSection = ({post}) => {
    const dispatch = useDispatch();
    const [comment, setComment] = useState('');

    const handleComment = async (event) => {
        if (event.keyCode === 13) {
            //Enter
            if (comment.trim().length === 0){
                setComment('');
                return;
            }
            let data = {post_id: post.id,comment: comment};
            let response = await dispatch(createCommentAsync(data));
            response = response.payload;
            if (!response.success){
                alert(response.message);
            } else {
                setComment('');
            }
        }
    }

    return (
        <>
            <input type="text" className="form-control form-control-sm inputComment" placeholder="Press enter to post comment" onChange={(e) => setComment(e.target.value)} onKeyUp={handleComment} value={comment} />
        </>
    );
}

export {CommentSection};