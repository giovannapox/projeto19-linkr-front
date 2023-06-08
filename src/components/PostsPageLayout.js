import styled from "styled-components";
import Header from "./Header.js";
import TrendingHashtags from "./TrendingHashtags.js";

export default function PostsPageLayout({ children, heading }) {
  return (
    <>
      <Header />
      <PageContainer>
        <h2>{heading}</h2>
        <PageContent>
          <Container>{children}</Container>
          <div>
            <TrendingHashtags />
          </div>
        </PageContent>
      </PageContainer>
    </>
  );
}

const PageContainer = styled.div`
  margin: 50px auto;
  width: 1000px;

  & h2 {
    font-family: "Oswald", sans-serif;
    font-size: 43px;
    font-weight: 700;
    color: white;
  }
`;

const PageContent = styled.div`
  display: flex;
  gap: 25px;
  margin-top: 40px;
`;

const Container = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;

  & > span.no-posts-msg {
    font-family: "Lato", sans-serif;
    color: white;
    margin: auto;
  }
`;
