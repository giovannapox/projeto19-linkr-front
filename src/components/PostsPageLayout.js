import styled from "styled-components";
import Header from "./Header.js";
import TrendingHashtags from "./TrendingHashtags.js";

export default function PostsPageLayout({ children, heading, profilePicture }) {
  return (
    <>
      <Header />
      <PageContainer>
        <PageHeading>
          {
            heading !== "timeline" ? 
              <><img 
                src={profilePicture} 
                alt={heading} 
              />
              <h2>{heading}</h2></>
              : <h2>{heading}</h2>
          }
        </PageHeading>
        
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
`;

const PageHeading = styled.div`
  display: flex;

  & img {
    width: 50px;
    height: 50px;
    margin: 0px 20px;
    object-fit: contain;
    border-radius: 100%;
  }

  & h2 {
    color: white;
    font-family: "Oswald", sans-serif;
    font-size: 43px;
    font-weight: 700;
  }
`

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
`;
