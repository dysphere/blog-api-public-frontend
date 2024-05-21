import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "./header";

const truncateString = (string) => {

}

const BlogCard = ({title, author, id, date_posted, content}) => {
    return (<div>
        <h2>{title}</h2>
        <p>{date_posted}</p>
        <p>{author}</p>
    </div>)
}

export const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPost = async () => {
        try {
            const response = await fetch("https://blog-api-backend.fly.dev/blog/", {mode: "cors"});
            const data = response.json();
            setPosts(data)
        }
        catch(error) {
            setError(error);
            throw new Error('server error');
        }
        finally {
            setLoading(false);
        }
        }
        getPost();
    }, [])

    if (error) return <p></p>;
    if (loading) return <div></div>

    return (<div>
        <Header></Header>
    </div>)
}