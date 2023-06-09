import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import PostsPageLayout from "../components/PostsPageLayout.js";
import NewPostCard from "../components/NewPostCard.js";
import PostCard from "../components/PostCard.js";
import PostLoader from "../components/PostLoader.js";
import { TailSpin } from "react-loader-spinner";

export default function Timeline() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sentinelReached, setSentinelReached] = useState(false);
  const [outOfPosts, setOutOfPosts] = useState(false);

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
  }, [auth, navigate]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      console.log("Sentinel reached");

      if (entry.isIntersecting && posts.length !== 0) {
        setSentinelReached(true);

        const startTimestamp = posts.at(-1).createdAt;
        const startId = posts.at(-1).id;
        const url = `${process.env.REACT_APP_BD}/posts?startTimestamp=${startTimestamp}&startId=${startId}`;

        axios
          .get(url, {
            headers: { Authorization: `Bearer ${auth.token}` },
          })
          .then((res) => {
            const newPosts = res.data;

            if (newPosts.length === 0) {
              setOutOfPosts(true);
              return;
            }

            setPosts([...posts, ...newPosts]);
          })
          .catch((err) => {
            console.error(err);
            if (err.response.status === 401) {
              navigate("/");
            }
          })
          .finally(() => setSentinelReached(false));
      }
    });

    const sentinel = document.getElementById("sentinel");
    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [posts, setPosts]);

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
      <span id="sentinel">
        {outOfPosts ? (
          "No more posts"
        ) : sentinelReached ? (
          <TailSpin height={40} width={40} color="#6d6d6d" />
        ) : null}
      </span>
    </PostsPageLayout>
  );
}
