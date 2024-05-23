import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "./header";

const truncateString = (string) => {
    return string.slice(0, 60) + "..."
}

const BlogCard = ({title, author, id, date_posted, content}) => {
    return (
    <Link to={`${id}`}><div className="flex flex-col gap-y-2.5">
        <h2 className="text-center">{title}</h2>
        <div className="flex gap-x-4">
        <p>{date_posted}</p>
        <p>{author}</p>
        </div>
        <p>{truncateString(content)}</p>
    </div></Link>)
}

export const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPost = async () => {
        try {
            const response = await fetch("https://blog-api-backend.fly.dev/blog/", {mode: "cors"});
            const data = await response.json();
            setPosts(data);
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

    const cards = !error && !loading ? posts.map((post) => {
        return <div key={post._id}>
            <BlogCard
            title={post.title}
            author={post.author.username}
            id={post._id}
            date_posted={post.date_posted_formatted}
            content={post.content}/>
            </div>
    }) : null;

    return (<div>
        <Header></Header>
        <div className="pt-5"><h1 className="text-center">All Posts</h1></div>
        {error ? <div><p className="text-center">An error was encountered</p></div> :
        loading ? <div><p className="text-center">Loading blog posts...</p></div>:
        <div className="flex flex-col items-center gap-y-6 pt-5">{cards}</div>}
    </div>)
}