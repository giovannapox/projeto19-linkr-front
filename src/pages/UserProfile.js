import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import PostsPageLayout from "../components/PostsPageLayout.js";
import PostCard from "../components/PostCard.js";
import PostLoader from "../components/PostLoader.js";

export default function UserProfile() {
    const { id } = useParams();
    const { auth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { authorName, authorImage } = location.state || {};
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        if (!auth) return navigate("/");

        axios
        .get(`http://localhost:5000/user/${id}`, {
            headers: { Authorization: `Bearer ${auth.token}` },
        })
        .then((res) => {
            setUserPosts(res.data.posts);
        })
        .catch((err) => {
            console.error(err);
            if (err.response.status === 401) {
                navigate("/");
            }
        });
    }, [id, auth, navigate]);

    return (
        <>
            <img src={authorImage} alt={`${authorName}'s profile`} />
            <PostsPageLayout heading={`${authorName}'s posts`} >
            {userPosts.length !== 0 ? (
                userPosts.map((post) => <PostCard key={post.id} post={post} />)
            ) : (
                <PostLoader />
            )}
            </PostsPageLayout>
        </>
    );
}
