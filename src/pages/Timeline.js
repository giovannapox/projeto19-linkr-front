import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import PostsPageLayout from "../components/PostsPageLayout.js";
import NewPostCard from "../components/NewPostCard.js";
import PostCard from "../components/PostCard.js";
import PostLoader from "../components/PostLoader.js";

export default function Timeline() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!auth) return navigate("/");

    axios
      .get(`${process.env.REACT_APP_BD}/posts`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      .then((res) => setPosts(res.data))
      .catch((err) => {
        console.error(err);
        if (err.response.status === 401) {
          navigate("/");
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <PostsPageLayout heading="timeline">
      <NewPostCard setPosts={setPosts} />
      {isLoading ? (
        <PostLoader />
      ) : posts.length !== 0 ? (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <span className="no-posts-msg">No posts yet</span>
      )}
    </PostsPageLayout>
  );
}
