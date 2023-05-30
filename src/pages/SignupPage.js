import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function SignupPage() {
    const [user, setUser] = useState({ email: "", password: "", username: "", picture: "" });

    function signup() {

    };

    return (
        <>
            <Top>
                <h1>linkr</h1>
                <p>save, share and discover <br />the best links on the web</p>
            </Top>
            <FormContainer>
                <form onSubmit={signup}>
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
                    <input
                        placeholder="username"
                        type="text"
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                        required
                    />
                    <input
                        placeholder="picture url"
                        type="url"
                        value={user.picture}
                        onChange={(e) => setUser({ ...user, picture: e.target.value })}
                        required
                    />
                    <button type="submit">Sign Up</button>
                    <Link to="/">
                        Switch back to log in
                    </Link>
                </form>
            </FormContainer>
        </>
    );
};

const Top = styled.div`
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
    }
    a{
        margin-top: 18px;
        color: #FFFFFF;
        font-family: 'Lato', sans-serif;
        font-size: 17px;
    }
`