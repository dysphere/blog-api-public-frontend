import { useState } from "react";
import { UserContext } from "./UserContext";

export const UserProvider = ({children}) => {
    const [token, setToken] = useState("");
    const [user, setUser] = useState(false);

    async function addToken(data) {
        try {
        let response = await fetch("https://blog-api-backend.fly.dev/blog/log-in",
            {   method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                mode: "cors"});
        const jwt_token = response.json().token;
        setToken(jwt_token);
        setUser(true);
        localStorage.setItem("jwt_token", jwt_token);
            }
        catch (error) {
            console.error("Error:", error);
        }
    }

    function removeToken() {
        setToken("");
        setUser(false);
        localStorage.removeItem("jwt_token");
    }


    return (
        <UserContext.Provider value={{token, user, addToken, removeToken}}>
            {children}
        </UserContext.Provider>
    )
}