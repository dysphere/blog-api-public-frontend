import { useNavigate } from "react-router-dom";
import { Header } from "./header";
import { TextInput, PasswordInput, Button } from "@mantine/core";

const SignupForm = () => {

    const navigate = useNavigate();

    async function createCommenter(e) {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);
        const dataEntries = Object.fromEntries(data.entries());
        const dataJson = JSON.stringify(dataEntries);

        try {
            await fetch("https://blog-api-backend.fly.dev/blog/sign-up", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    },
                body: dataJson,
                mode: "cors"
            })
            navigate("/login");
        }
        catch(error) {
            console.error("Error:", error);
        }
    }

    return (<div className="text-blue-800 bg-blue-100 md:mx-[40rem]">
        <h2 className="text-center mt-10 pt-5 text-3xl">Sign Up</h2>
        <form action="https://blog-api-backend.fly.dev/blog/sign-up" method="POST" onSubmit={createCommenter}>
            <div className="flex flex-col items-center gap-y-2 py-5">
            <TextInput
            label="First Name: "
            name="first_name"
            styles={{
                label: {
                  fontSize: 18,
                  color: 'rgb(30, 64, 175)',
                }
              }}/>
            <TextInput
            label="Last Name: "
            name="last_name"
            styles={{
                label: {
                  fontSize: 18,
                  color: 'rgb(30, 64, 175)',
                }
              }}/>
            <TextInput
            label="Username: "
            name="username"
            styles={{
                label: {
                  fontSize: 18,
                  color: 'rgb(30, 64, 175)',
                }
              }}/>
            <PasswordInput
            label="Password: "
            name="password"
            className="w-52"
            styles={{
                label: {
                  fontSize: 18,
                  color: 'rgb(30, 64, 175)',
                }
              }}/>
            <Button type="submit" className="mt-2" color="rgb(30, 64, 175)" radius="10px">Sign Up</Button>
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