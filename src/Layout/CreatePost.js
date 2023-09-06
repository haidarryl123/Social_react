
import { useDispatch } from 'react-redux';
import {useState} from "react";
import {createCommentAsync, createPostAsync} from "../Redux/Slice/PostReducer";
import {useNavigate} from "react-router-dom";

const CreatePost = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [photo, setPhoto] = useState('');
    const [chooseFileText, setChooseFileText] = useState('Choose file');

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setPhoto(file);
            setChooseFileText(file.name);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (description.trim().length === 0){
            setError('Type something!');
            return;
        }
        const formData = new FormData();
        formData.append('description', description);
        formData.append('photo', photo);
        let response = await dispatch(createPostAsync(formData));
        response = response.payload;
        if (!response.success){
            alert(response.message);
        } else {
            navigate('/');
        }
    }

    return (
        <>
            <div className="row">
                <div className="col-md-3"/>
                <div className="col-md-6">
                    <div className="card card-primary">
                        <div className="card-header">
                            <h3 className="card-title">Your post</h3>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="card-body">
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <textarea onChange={(e) => setDescription(e.target.value)} className="form-control" id="description" cols="30" rows="10"/>
                                    <p className="mb-0 text-danger">{error}</p>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputFile">Photo</label>
                                    <div className="input-group">
                                        <div className="custom-file">
                                            <input type="file" accept="image/*" className="custom-file-input" id="photo" onChange={handleFileChange} />
                                            <label className="custom-file-label" htmlFor="photo">{chooseFileText}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card-footer">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-md-3"/>
            </div>
        </>
    );
}

export default CreatePost;