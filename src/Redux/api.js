
var token = localStorage.getItem('jwtToken');
const apiEndpoint = 'http://localhost:8000/api';

//auth
export const login = async (email,password) => {
    // console.log(token);
    const response = await fetch(`${apiEndpoint}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email, password: password})
    });
    return await response.json();
}

export const logout = async () => {
    const response = await fetch(`${apiEndpoint}/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({token: token})
    });
    return await response.json();
}

export const register = async (email,password,name) => {
    const response = await fetch(`${apiEndpoint}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email,password: password,name: name})
    });
    return await response.json();
}

export const getWall = async (userId) => {
    const response = await fetch(`${apiEndpoint}/auth/profile/get-wall`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({user_id: userId})
    });
    return await response.json();
};

export const updateProfile = async (data) => {
    const response = await fetch(`${apiEndpoint}/auth/profile/save`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: data
    });
    return await response.json();
};

//post
export const getPosts = async () => {
    token = localStorage.getItem('jwtToken');
    const response = await fetch(`${apiEndpoint}/post/get`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    return await response.json();
};

export const getSinglePost = async (postId) => {
    const response = await fetch(`${apiEndpoint}/post/get-single-post`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({post_id: postId})
    });
    return await response.json();
};

export const createPost = async (post) => {
    const response = await fetch(`${apiEndpoint}/post/create`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: post
    });
    return await response.json();
};

export const updatePost = async (post) => {
    const response = await fetch(`${apiEndpoint}/post/update`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(post)
    });
    return await response.json();
};

export const deletePost = async (postId) => {
    const response = await fetch(`${apiEndpoint}/post/delete`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({id: postId})
    });
    return await response.json();
};

export const likePost = async (postId) => {
    const response = await fetch(`${apiEndpoint}/like`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({post_id: postId})
    });
    return await response.json();
};

export const createComment = async (data) => {
    const response = await fetch(`${apiEndpoint}/comment/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({post_id: data.post_id,comment: data.comment})
    });
    return await response.json();
};

export const deleteComment = async (comment_id) => {
    const response = await fetch(`${apiEndpoint}/comment/delete`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({id: comment_id})
    });
    return await response.json();
};