import { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import { Link, useParams } from "react-router-dom";
import { Header } from "./header";
import { Textarea, Button } from "@mantine/core";

const MainPost = ({author, title, content, date_posted}) => {
    return (<div className="flex flex-col items-center">
        <h2>{title}</h2>
        <div className="flex gap-x-4">
            <p>By {author}</p>
            <p>Published {date_posted}</p>
        </div>
        <p>{content}</p>
    </div>)
}

const CreateComment = ({id}) => {

    const { user } = useContext(UserContext);
    const commentAction = `https://blog-api-backend.fly.dev/blog/${id}/create-comment`

    async function SubmitComment(e) {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);
        const dataEntries = Object.fromEntries(data.entries());
        const dataJson = JSON.stringify(dataEntries);
        const jwt_token = localStorage.getItem("jwt_token");
        console.log(jwt_token, dataJson)
        try {
            await fetch(commentAction,
            {   method: "POST",
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt_token}`
                },
                body: dataJson,
                mode: "cors"});
        }
        catch(error) {
            console.error("Error:", error);
        }
    }

    return (<div>
        {user ? 
        <div>
            <form action={commentAction} method="POST" onSubmit={SubmitComment}>
                <div className="flex flex-col items-center gap-y-4">
                ,<Textarea 
                label="Comment: "
                name="text"
                autosize
                resize="vertical"
                className="w-80"/>
                <Button type="submit">Submit</Button>
                </div>
            </form>
            </div> : 
        <div><p className="text-center"><Link to="/login">Sign in</Link> to leave a comment!</p></div>}
    </div>)
}

const Comment = ({username, text, date_posted, liked, id}) => {

    const {user} = useContext(UserContext);

    return (<div>
        <div className="flex gap-x-4">
            <p>{username}</p>
            <p>{date_posted}</p>
        </div>
        <p>{text}</p>
        {!user ? <p>{liked.length} likes</p> : 
        <div></div>}
    </div>)
}

export const BlogPost = () => {
    
    const {id} = useParams();

    const [post, setPost] = useState([]);
    const [comments, setComments] = useState([]);
    const [PostError, setPostError] = useState(null);
    const [PostLoading, setPostLoading] = useState(true);
    const [CommentError, setCommentError] = useState(null);
    const [CommentLoading, setCommentLoading] = useState(true);

    useEffect(() => {
        const getPost = async () => {
        try {
            const response = await fetch(`https://blog-api-backend.fly.dev/blog/${id}`, {mode: "cors"});
            const data = await response.json();
            setPost(data);
        }
        catch(error) {
            setPostError(error);
            throw new Error('server error');
        }
        finally {
            setPostLoading(false);
        }
        }
        getPost();
    }, [id])

    useEffect(() => {
        const getComments = async () => {
        try {
            const response = await fetch(`https://blog-api-backend.fly.dev/blog/${id}/comments`, {mode:"cors"});
            const data = await response.json();
            setComments(data);
        }
        catch(error) {
            setCommentError(error);
            throw new Error('server error');
        }
        finally {
            setCommentLoading(false);
        }
        }
        getComments();
    }, [id])

    const commentSection = comments.map((comment) => {
    return <div key={comment._id}>
            <Comment
            username={comment.commenter.username}
            text={comment.text}
            date_posted={comment.date_posted_formatted}
            liked={comment.liked}></Comment>
        </div>
    });

    return (<div>
        <Header></Header>
        {PostError ? <div><p className="text-center">A network error was encountered</p></div> : 
        PostLoading ? <div><p className="text-center">Post loading...</p></div> : 
        <MainPost
        author={post.author.username}
        title={post.title}
        content={post.content}
        date_posted={post.date_posted_formatted}></MainPost>}
        <CreateComment id={post._id}></CreateComment>
        {CommentError ? <div><p className="text-center">Error loading comments</p></div> :
        CommentLoading ? <div><p className="text-center">Comments section loading...</p></div> :
        comments.length === 0 ? <div><p className="text-center">There are currently no comments</p></div> :
        <div className="flex flex-col items-center">{commentSection}</div>}
    </div>)
}