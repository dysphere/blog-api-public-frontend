import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "./header";
import { TextInput, PasswordInput, Button } from "@mantine/core";

const SignupForm = () => {

    const SignupRef = useRef();

    const [error, setError] = useState(null);

    async function createCommenter(e) {
        e.preventDefault();
        const data = new FormData(SignupRef.current)

        try {
            await fetch("https://blog-api-backend.fly.dev/blog/sign-up", {
                method: "POST",
                body: data,
                mode: "cors"
            })
        }
        catch(error) {
            setError(error);
            throw new Error('server error');
        }
    }

    return (<div>
        <h2 className="text-center">Sign Up</h2>
        <form action="https://blog-api-backend.fly.dev/blog/sign-up" method="POST" onSubmit={createCommenter} ref={SignupRef}>
            <div className="flex flex-col items-center gap-y-2">
            <TextInput
            label="First Name: "
            name="first_name"/>
            <TextInput
            label="Last Name: "
            name="last_name"/>
            <TextInput
            label="Username: "
            name="username"/>
            <PasswordInput
            label="Password: "
            name="password"
            className="w-52"/>
            <Button type="submit" className="mt-2">Sign Up</Button>
            </div>
        </form>
    </div>)
}

export const SignupPage = () => {
    return (<div>
        <Header></Header>
        <SignupForm></SignupForm>
    </div>)
}