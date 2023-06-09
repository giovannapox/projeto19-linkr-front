import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import PostsPageLayout from "../components/PostsPageLayout.js";
import PostCard from "../components/PostCard.js";
import PostLoader from "../components/PostLoader.js";

export default function UserProfile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { auth, setAuth } = useAuth();
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        if (!auth) return navigate("/");

        const BASE_URL = process.env.REACT_APP_BD;

        axios.get(`${BASE_URL}/posts?author=${id}`, {
            headers: { Authorization: `Bearer ${auth.token}` },
        })
        .then((res) => {
            setUserPosts(res.data);
        })
        .catch((err) => {
            console.error(err);
            if (err.response.status === 401) {
                localStorage.clear();
                setAuth(null);
                navigate("/");
            }
        });
    }, [id, auth, setAuth, navigate, userPosts, setUserPosts]);
    
    return (
        <PostsPageLayout 
            heading={`${userPosts[0]?.author.name}'s posts`} 
            profilePicture={userPosts[0]?.author.pictureUrl} >
            {userPosts.length > 0 ? (
                userPosts.map((post) => <PostCard key={post.id} post={post} />)
            ) : (
                <p>Não há posts para esse usuário</p>
            )}
        </PostsPageLayout>
    );
}
