
import {Link, useNavigate} from "react-router-dom";
import {logout, postLogoutAsync} from "../Redux/Slice/AuthReducer";
import {useDispatch, useSelector} from "react-redux";

const Header = () => {
    const auth = useSelector((state) => {
        return state.auth;
    });
    let isAuthenticated = auth.isAuthenticated;
    let user = auth.user;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async (e) => {
        let response = await dispatch(postLogoutAsync());
        response = response.payload;
        let responseMessage = response.message;
        localStorage.setItem('jwtToken',null);
        localStorage.setItem('jwtUser',null);
        localStorage.setItem('userData',null);
        dispatch(logout());
        alert(responseMessage);
        navigate('/login');
    }

    return (
        <>
            <nav className="main-header navbar navbar-expand navbar-dark ml-0">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">
                            <i className="fas fa-home" /> Home
                        </Link>
                    </li>

                    {isAuthenticated && (
                        <li className="nav-item">
                            <Link to={"/profile/"+user.id} className="nav-link">
                                <i className="fas fa-user-circle"/> Profile
                            </Link>
                        </li>
                    )}

                    {!isAuthenticated && (
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">
                                <i className="fas fa-sign-in-alt"/> Login
                            </Link>
                        </li>
                    )}

                    {isAuthenticated && (
                        <li className="nav-item">
                            <nav className="nav-link" onClick={handleLogout} style={{cursor: 'pointer'}}>
                                <i className="fas fa-sign-out-alt"/> Logout
                            </nav>
                        </li>
                    )}
                </ul>

                {isAuthenticated && (
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item mr-2">
                            Hello, {user.name + ' ' + user.last_name}
                        </li>
                    </ul>
                )}
            </nav>
        </>
    );
}

export {Header};