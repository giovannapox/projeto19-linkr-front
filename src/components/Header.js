import styled from "styled-components";
import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const [arrow, setArrow] = useState(false);
    const [logout, setLogout] = useState("none");
    const navigate = useNavigate();

    function showLogout() {
        if(!arrow){
            setArrow(true);
            setLogout("flex");
        } else {
            setArrow(false);
            setLogout("none");
        };
    };

    function exit(){
        navigate("/");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }

	return (
		<Container>
            <h1 onClick={() => navigate("/timeline")}>linkr</h1>
            <SearchBar />
            <IconImg onClick={showLogout}>
                {arrow ?
                    <BsChevronUp/>:
                    <BsChevronDown/> 
                }
                <img src={localStorage.getItem("picture")} alt="signout" />
            </IconImg>
            <Logout logout={logout} onClick={exit}>
                <h1>Logout</h1>
            </Logout>
		</Container>
	);
}

const Container = styled.header`
    display: flex;
    width: 100vw;
    height: 72px;
    padding: 5px;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    background-color: #151515;
    position: relative;
    h1{
        font-family: 'Passion One';
        color: #FFFFFF;
        font-size: 49px;
        margin-left: 28px;
    }
`

const IconImg = styled.div`
    display: flex;
    align-items: center;
    img{
        width: 53px;
        height: 53px;
        border-radius: 50%;
        margin-right: 10px;
    }
    svg{
            color: #FFFFFF;
            font-size: 20px;
            margin-right: 10px;
    }
`

const Logout = styled.div`
    width: 120px;
    height: 40px;
    border-radius: 0px 0px 0px 20px;
    background-color: #151515;
    display: ${(props) => props.logout};
    align-items: center;
    position: absolute;
    right: 0;
    top: 70px;
    h1{
        font-family: 'Lato';
        font-size: 17px;
        margin-left: 40px;
    }
`