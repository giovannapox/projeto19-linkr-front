import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useAuth from "../hooks/useAuth.js";

export default function NewPostCard({ setPosts }) {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [caption, setCaption] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const body = { url };
    if (caption.trim() !== "") body.caption = caption;

    const createPost = async () => {
      setIsLoading(true);
      const headers = { Authorization: `Bearer ${auth.token}` };

      try {
        await axios.post(`${process.env.REACT_APP_BD}/posts`, body, { headers });
        const { data } = await axios.get(`${process.env.REACT_APP_BD}/posts`, {
          headers,
        });
        setPosts(data);
        setUrl("");
        setCaption("");
      } catch (err) {
        console.error(err);
        if (err.response.status === 401) {
          localStorage.clear();
          setAuth(null);
          navigate("/");
        }
      } finally {
        setIsLoading(false);
      }
    };

    createPost();
  }

  return (
    <Container>
      <img src="https://placehold.co/50" alt="Logged user" />
      <FormContainer>
        <h3>What are you going to share today?</h3>
        <Form onSubmit={handleSubmit}>
          <UrlInput
            type="url"
            placeholder="http://..."
            disabled={isLoading}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <CaptionInput
            as="textarea"
            placeholder="Caption"
            disabled={isLoading}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? "Publishing..." : "Publish"}
          </SubmitButton>
        </Form>
      </FormContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 18px;
  padding: 18px;
  margin-bottom: 14px;
  border-radius: 16px;
  background-color: white;
  filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.25));

  & img {
    width: 50px;
    height: 50px;
    object-fit: contain;
    border-radius: 100%;
  }
`;

const FormContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;

  & * {
    font-family: "Lato", sans-serif;
  }

  & h3 {
    font-size: 20px;
    font-weight: 300;
    line-height: 1.5;
    color: #707070;
  }
`;

const Form = styled.form`
  & *:disabled {
    opacity: 70%;
  }

  & * + * {
    margin-top: 5px;
  }
`;

const UrlInput = styled.input`
  width: 100%;
  height: 30px;
  padding-inline: 5px;
  border: none;
  border-radius: 5px;
  background-color: #efefef;
  color: #949494;
  font-size: 15px;
  font-weight: 300;
  box-sizing: border-box;

  &:focus {
    outline: transparent;
  }
`;

const CaptionInput = styled(UrlInput)`
  height: 65px;
  resize: none;
`;

const SubmitButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 30px;
  margin-left: auto;
  border: none;
  border-radius: 5px;
  background-color: #1877f2;
  color: white;
  font-size: 14px;
  font-weight: 700;
`;
