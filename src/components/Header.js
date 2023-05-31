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
    width: 100%;
    height: 80px;
    background-color: #333333;
`