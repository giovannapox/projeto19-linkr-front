import styled from "styled-components";
import React from "react";
import SearchBar from "./SearchBar";

export default function Header() {
	return (
		<Container>
            <SearchBar />
		</Container>
	);
}

const Container = styled.header`
    display: flex;
    width: 100vw;
    height: 80px;
    padding: 5px;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    background-color: #333333;
`