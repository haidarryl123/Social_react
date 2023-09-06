
import {useDispatch, useSelector} from 'react-redux';
import {useState} from "react";
import {updateProfile} from "../Redux/Slice/AuthReducer";
import {useNavigate} from "react-router-dom";

const UpdateInfo = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth.user);

    const [firstName, setFirstName] = useState(auth.name+"");
    const [lastName, setLastName] = useState(auth.last_name+"");
    const [photo, setPhoto] = useState('');
    const [error1, setError1] = useState('');
    const [error2, setError2] = useState('');
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
        if (firstName.trim().length === 0){
            setError1('First name is required!');
            return;
        }
        if (lastName.trim().length === 0){
            setError2('Last name is required!');
            return;
        }
        const formData = new FormData();
        formData.append('name', firstName);
        formData.append('last_name', lastName);
        formData.append('photo', photo);
        let response = await dispatch(updateProfile(formData));
        response = response.payload;
        if (!response.success){
            alert(response.message);
        } else {
            navigate('/profile/'+auth.id);
        }
    }

    return (
        <>
            <div className="row">
                <div className="col-md-3"/>
                <div className="col-md-6">
                    <div className="card card-primary">
                        <div className="card-header">
                            <h3 className="card-title">Your information</h3>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="card-body">
                                <div className="form-group">
                                    <label htmlFor="description">First name</label>
                                    <input onChange={(e) => setFirstName(e.target.value)} className="form-control" id="description" value={firstName} />
                                    <p className="mb-0 text-danger">{error1}</p>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Last name</label>
                                    <input onChange={(e) => setLastName(e.target.value)} className="form-control" id="description" value={lastName} />
                                    <p className="mb-0 text-danger">{error2}</p>
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

export default UpdateInfo;