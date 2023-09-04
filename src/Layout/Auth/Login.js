
import { Link } from "react-router-dom";
import React, {useEffect, useState} from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../Redux/Slice/AuthReducer';
import { postLoginAsync } from "../../Redux/Slice/AuthReducer";
import { resetError } from "../../Redux/Slice/PostReducer";
import { useSelector } from "react-redux";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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

        let loading = document.getElementById('loading');
        loading.style.display = 'inline-block';

        setError('');
        const data = { email: email, password: password };
        let response = await dispatch(postLoginAsync(data));
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
            // resetError();
            navigate('/');
        } else {
            setError(response.message);
        }
    };

    return (
        <>
            <div className="row">
                <div className="col-md-4"/>
                <div className="col-md-4">
                    <div className="card card-widget">
                        <form onSubmit={handleSubmit}>
                            <div className="card-header">
                                <div className="d-flex align-items-center justify-content-center">
                                    <h3 className="mb-0">LOGIN</h3>
                                </div>
                            </div>
                            <div className="card-body">
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
                                <div className="row">
                                    <p className="text-danger mb-0" >{error}</p>
                                </div>
                            </div>

                            <div className="card-footer text-center">
                                <button type="submit" className="btn btn-sm btn-primary w-100">
                                    <i className="fa fa-spinner fa-spin mr-2" id="loading" style={{display: 'none'}} />Sign In
                                </button>
                                <Link to="/register" className="d-inline-block mt-3 mb-0">Register new account</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export {Login};