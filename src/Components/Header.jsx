import { useEffect } from "react";

function Header({code, setCode, setSongs, accessToken, setAccessToken}) {
    const CLIENT_ID = "56f5a961a7f1454ea689c6c5d8fc56ce";
    const REDIRECT_URI = "http://localhost:5173/";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = "code";
    const SCOPE = "playlist-read-private, user-top-read";

    const logout = () => {
        setCode("");
        setSongs([]);
        window.localStorage.removeItem("code");
    }

    return (
        <div className="header-container">
            <img className="header-logo" src=".\src\assets\header-logo.png"></img>
            {!code || !accessToken ? 
                <a className="login-btn" onClick href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>See my MBTI</a>
                : 
                <button className="login-btn" onClick={logout}>Log out</button>
            }
        </div>
    )
}

export default Header;