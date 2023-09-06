
import {ProfilePost} from "./Components/ProfilePost";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getWallAsync} from "../Redux/Slice/AuthReducer";
import React from "react";

const Profile = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth.user);
    const wall = useSelector((state) => state.auth.wall);
    const { id } = useParams();
    const endpoint = "http://127.0.0.1:8000";
    let posts = [];

    useEffect(  () => {
        async function fetchData() {
            await dispatch(getWallAsync(id));
        }
        fetchData().then();

    }, [dispatch, id]);
    if (wall){
        posts = wall.post;
    }

    return (
        <>
            <div className="row">
                <div className="col-md-3">
                    <div className="card card-primary card-outline">
                        <div className="card-body box-profile">
                            <div className="text-center">
                                {wall && (<img className="profile-user-img img-fluid img-circle"
                                               src={endpoint + wall.user.photo}
                                               style={{height: '100px',objectFit: 'cover'}} />)}
                                {!wall && (<img className="profile-user-img img-fluid img-circle"
                                               src="http://127.0.0.1:8000/storage/images/1677853521.jpg"
                                               style={{height: '100px',objectFit: 'cover'}} />)}
                            </div>

                            {wall && (<h3 className="profile-username text-center">{wall.user.name + " " + wall.user.last_name}</h3>)}
                            {!wall && (<h3 className="profile-username text-center">Nina Mcintire</h3>)}

                            <ul className="list-group list-group-unbordered mb-3">
                                <li className="list-group-item">
                                    <b>Followers</b> <a className="float-right">1,322</a>
                                </li>
                                <li className="list-group-item">
                                    <b>Following</b> <a className="float-right">543</a>
                                </li>
                                <li className="list-group-item">
                                    <b>Friends</b> <a className="float-right">13,287</a>
                                </li>
                            </ul>
                            {(auth && auth.id == id) &&
                                (
                                    <Link to={"/create-post"}>
                                        <button className="btn btn-primary btn-block"><b>Post something!</b></button>
                                    </Link>
                                )
                            }
                        </div>
                    </div>

                    <div className="card card-primary">
                        <div className="card-header">
                            <h3 className="card-title">About Me</h3>
                        </div>
                        <div className="card-body">
                            <strong><i className="fas fa-envelope mr-1"/> Email</strong>
                            <p className="text-muted">
                                {wall && (wall.user.email)}
                                {!wall && ("example@gmail.com")}
                            </p>
                            <hr/>
                            <strong><i className="fas fa-book mr-1"/> First Name</strong>
                            <p className="text-muted">
                                {wall && (wall.user.name)}
                                {!wall && ("John")}
                            </p>
                            <hr/>
                            <strong><i className="fas fa-map-marker-alt mr-1"/> Last Name</strong>
                            <p className="text-muted">
                                {wall && (wall.user.last_name)}
                                {!wall && ("Doe")}
                            </p>

                            {(auth && auth.id == id) &&
                                (
                                    <>
                                        <hr />
                                        <Link to={"/update-info"}>
                                            <button className="btn btn-primary btn-block"><b>Update your info</b></button>
                                        </Link>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="card">
                        <div className="card-body">
                            <div className="tab-content">
                                <div className="active tab-pane" id="activity">

                                    {posts.length > 0 && posts.map((post) => (
                                        <ProfilePost key={post.id} post={post} user={wall.user} />
                                    ))}

                                    {posts.length === 0 && (
                                        <>
                                            <div className="text-center">There are no posts yet.</div>
                                        </>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export {Profile};