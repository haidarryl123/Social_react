
import { useDispatch } from 'react-redux';
import { deleteCommentAsync } from "../../Redux/Slice/PostReducer";

const DeleteCommentSection = ({comment}) => {
    const dispatch = useDispatch();

    const handleDelete = async () => {
        let response = await dispatch(deleteCommentAsync(comment.id));
        response = response.payload;
        if (!response.success){
            alert(response.message);
        }
    }

    return (
        <>
            <i className="fas fa-trash ml-3" style={{cursor: 'pointer'}} onClick={handleDelete} />
        </>
    );
}

export {DeleteCommentSection};