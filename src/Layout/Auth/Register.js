import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React,{useEffect, useState} from "react";
import {login, postLoginAsync, postRegisterAsync} from "../../Redux/Slice/AuthReducer";
import jwt_decode from "jwt-decode";

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const auth = useSelector((state) => {
        return state.auth;
    });

    useEffect(() => {
        let isAuthorize = CheckAuthorize();
        if (isAuthorize){
            navigate('/');
        }
    });

    const CheckAuthorize = () => {
        return auth.isAuthenticated;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');
        if (password !== confirmPassword){
            setError('Password confirm is not match.');
            return;
        }

        let loading = document.getElementById('loading');
        loading.style.display = 'inline-block';

        const data = { email: email, password: password, name: name };
        let response = await dispatch(postRegisterAsync(data));
        loading.style.display = 'none';
        response = response.payload;
        if (response.success){
            let token = response.data.token;
            let user = response.data.user;
            localStorage.setItem('jwtToken', token);
            localStorage.setItem('jwtUser',JSON.stringify(user));

            const decoded = jwt_decode(token);
            localStorage.setItem('userData', JSON.stringify(decoded));

            //dispatch(login(response.data));
            navigate('/');
        } else {
            setError(response.message);
        }
    }

    return (
        <>
            <div className="row">
                <div className="col-md-4"/>
                <div className="col-md-4">
                    <div className="card card-widget">
                        <div className="card-header">
                            <div className="d-flex align-items-center justify-content-center">
                                <h3 className="mb-0">REGISTER</h3>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="card-body">
                                <div className="row mb-2">
                                    <label>Name</label>
                                    <input type="text" className="form-control" required onChange={(e) => setName(e.target.value)} />
                                    <p className="text-danger mb-0"/>
                                </div>
                                <div className="row mb-2">
                                    <label>Email</label>
                                    <input type="text" className="form-control" required onChange={(e) => setEmail(e.target.value)} />
                                    <p className="text-danger mb-0"/>
                                </div>
                                <div className="row mb-2">
                                    <label>Password</label>
                                    <input type="password" className="form-control" required onChange={(e) => setPassword(e.target.value)} />
                                    <p className="text-danger mb-0"/>
                                </div>
                                <div className="row mb-2">
                                    <label>Confirm Password</label>
                                    <input type="password" className="form-control" required onChange={(e) => setConfirmPassword(e.target.value)} />
                                    <p className="text-danger mb-0"/>
                                </div>
                                <div className="row">
                                    <p className="text-danger mb-0" >{error}</p>
                                </div>
                            </div>

                            <div className="card-footer text-center">
                                <button type="submit" className="btn btn-sm btn-primary w-100">
                                    <i className="fa fa-spinner fa-spin mr-2" id="loading" style={{display: 'none'}} />Sign Up
                                </button>
                                <Link to="/login" className="d-inline-block mt-3 mb-0">Already have an account?</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export {Register};