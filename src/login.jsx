import { useContext } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import { Header } from "./header";
import { TextInput, PasswordInput, Button } from "@mantine/core";

const LoginForm = () => {

    const { addToken } = useContext(UserContext);
    const navigate = useNavigate();

    async function LoginSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);
        const dataEntries = Object.fromEntries(data.entries());
        const dataJson = JSON.stringify(dataEntries);
        addToken(dataJson);
        navigate("/blog");
    }

    return (<div>
        <h2 className="text-center">Log In</h2>
        <form action="https://blog-api-backend.fly.dev/blog/log-in" method="POST" onSubmit={LoginSubmit}>
            <div className="flex flex-col items-center gap-y-2">
            <TextInput
            label="Username: "
            name="username"/>
            <PasswordInput
            label="Password"
            name="password"
            className="w-52"/>
            <Button type="submit" className="mt-2">Log In</Button>
            </div>
        </form>
        </div>)
}

export const LoginPage = () => {
    return (<div>
        <Header></Header>
        <LoginForm></LoginForm>
    </div>)
}