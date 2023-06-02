import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth.js";

export default function SignupPage() {
    const [user, setUser] = useState({ email: "", password: "" });
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate();

    const { auth, setAuth } = useAuth();

    useEffect(() => {
        if (auth) {
            navigate("/timeline");
        }

        const storedAuth = localStorage.getItem("auth");

        if (!auth && storedAuth) {
            setAuth(JSON.parse(storedAuth));
            navigate("/timeline");
        }
    }, [auth]);

    function signin(e) {
        e.preventDefault();
        setDisabled(true);
        if(!user) return alert("Preencha todos os campos!");

        const url = `http://localhost:5000/signin`;
        const promise = axios.post(url, user);
        promise.then((res) => {
            localStorage.setItem("auth", JSON.stringify(res.data));
            setAuth(res.data);
            navigate("/timeline");
        });
        promise.catch((err) => {
            alert(err.response.data);
            setDisabled(false);
        });
    };

    return (
        <SigninContainer>
            <Logo>
                <h1>linkr</h1>
                <p>save, share and discover <br />the best links on the web</p>
            </Logo>
            <FormContainer>
                <form onSubmit={(e) => signin(e)}>
                    <input
                        placeholder="e-mail"
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        required
                    />
                    <input
                        placeholder="password"
                        type="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        required
                    />
                    <button type="submit" disabled={disabled}>Log In</button>
                    <Link to="/signup">
                        First time? Create an account!
                    </Link>
                </form>
            </FormContainer>
        </SigninContainer>
    );
};

const SigninContainer = styled.div`
    @media (min-width: 1300px) {
        display: flex;
    }
`

const Logo = styled.div`
    background-color: #151515;
    height: 175px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    color: #FFFFFF;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1{
        font-family: 'Passion One', cursive;
        font-size: 76px;
    }
    p{
        font-family: 'Oswald', sans-serif;
        font-size: 23px;
        text-align: center;
    }

    @media (min-width: 1300px) {
        width: 70%;
        height: 100vh;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        padding-left: 200px;
        h1{
            margin-top: 300px;
            font-size: 106px;
            margin-bottom: 10px;
        }
        p{
            font-size: 46px;
        }
        box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
    }

`
const FormContainer = styled.div`
    background-color: #333333;
    min-height: 100vh;
    form{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 40px;
    }
    input {
        width: 330px;
        height: 55px;
        border-radius: 6px;
        border: none;
        margin-bottom: 11px;
        font-family: 'Oswald', sans-serif;
        color: #9F9F9F;
        font-size: 22px;
        padding-left: 17px;
        ::placeholder{
            color: #9F9F9F;
        }
    }
    button{
        width: 350px;
        height: 55px;
        background-color: #1877F2;
        color: #FFFFFF;
        font-family: 'Oswald', sans-serif;
        border-radius: 6px;
        border: none;
        font-size: 22px;
        :disabled{
        opacity: 0.7;
        }
    }
    a{
        margin-top: 18px;
        color: #FFFFFF;
        font-family: 'Lato', sans-serif;
        font-size: 17px;
    }

    @media (min-width: 1300px) {
        width: 30%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`