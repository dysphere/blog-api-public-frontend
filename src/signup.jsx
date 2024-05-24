import { Link } from "react-router-dom";
import { Header } from "./header";
import { TextInput, PasswordInput, Button } from "@mantine/core";

const SignupForm = () => {

    async function createCommenter() {
        try {}
        catch(error) {}
    }

    return (<div>
        <h2 className="text-center">Sign Up</h2>
        <form action="https://blog-api-backend.fly.dev/blog/sign-up" method="POST" onSubmit={createCommenter}>
            <div className="flex flex-col items-center gap-y-2">
            <TextInput
            label="First Name: "
            />
            <TextInput
            label="Last Name: "/>
            <TextInput
            label="Username: "/>
            <PasswordInput
            label="Password: "
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