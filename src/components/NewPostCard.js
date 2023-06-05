import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

export default function NewPostCard() {
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [caption, setCaption] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const body = { url };
    if (caption.trim() !== "") body.caption = caption;

    axios
      .post(`${process.env.REACT_APP_BD}/posts`, body)
      .then((res) => {
        // fetch posts again
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setIsLoading(false));
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
