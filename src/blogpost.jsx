import { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import { Link, useParams } from "react-router-dom";
import { Header } from "./header";
import { Textarea, Button } from "@mantine/core";

const MainPost = ({author, title, content, date_posted}) => {

    function unescapeHtmlEntities(html) {
        const doc = new DOMParser().parseFromString(content, "text/html");
        return doc.documentElement.textContent;
      }

    return (<div className="flex flex-col items-center gap-y-3 mb-10 py-10 bg-blue-100 text-blue-800 mt-28">
        <h2 className="text-2xl md:text-3xl">{title}</h2>
        <div className="flex gap-x-2.5 md:gap-x-4 text-lg md:text-xl">
            <p>By {author}</p>
            <p>Published {date_posted}</p>
        </div>
        <div
      dangerouslySetInnerHTML={{__html: unescapeHtmlEntities(content)}}
      className="mx-10 md:mx-96"
    />
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
        try {
            await fetch(commentAction,
            {   method: "POST",
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt_token}`
                },
                body: dataJson,
                mode: "cors"});
                location.reload();
        }
        catch(error) {
            console.error("Error:", error);
        }
    }

    return (<div>
        {user ? 
        <div>
            <form action={commentAction} method="POST" onSubmit={SubmitComment}>
                <div className="flex flex-col items-center gap-y-4 border-2 py-8 border-blue-800 md:mx-[44rem]">
                <Textarea 
                label="Comment: "
                name="text"
                autosize
                resize="vertical"
                className="w-80"
                styles={{
                    label: {
                      fontSize: 18,
                      color: 'rgb(30, 64, 175)',
                    }
                  }}/>
                <Button type="submit" color="rgb(30, 64, 175)" radius="10px">Submit</Button>
                </div>
            </form>
            </div> : 
        <div className="border-2 border-blue-300 rounded-lg py-4 md:mx-[44rem]"><p className="text-center text-blue-800"><Link to="/login"><button className="bg-blue-800 text-white px-4 rounded-full mr-2">Sign in</button></Link> to leave a comment!</p></div>}
    </div>)
}

const Comment = ({username, text, date_posted, liked, ToggleLike}) => {

    const {user} = useContext(UserContext);

    return (<div className="items-center text-blue-800 bg-blue-200 w-96 p-4 rounded-md border-2 border-blue-800 mb-2 mt-0">
        <div className="flex justify-between gap-x-4">
            <p>{username}</p>
            <p>{date_posted}</p>
        </div>
        <p>{text}</p> 
        {!user ? <p className="bg-blue-100 mr-64 rounded-md px-3">{liked.length} likes</p> : 
        <div>
            <button onClick={ToggleLike} className="bg-blue-100 mr-64 rounded-md hover:bg-blue-300 px-3">{liked.length} likes</button>
            </div>}
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

    async function ToggleLike(post_id, comment_id) {

        const likeEnd = `https://blog-api-backend.fly.dev/blog/${post_id}/comment/${comment_id}/toggle-like`
        const jwt_token = localStorage.getItem("jwt_token");

        try {
            await fetch(likeEnd,
            {   method: "POST",
                headers: {
                    Authorization: `Bearer ${jwt_token}`
                },
                mode: "cors"});
                location.reload();
        }
        catch(error) {
            console.error("Error:", error);
        }
        }

    const commentSection = comments.map((comment) => {
    return <div key={comment._id}>
            <Comment
            username={comment.commenter.username}
            text={comment.text}
            date_posted={comment.date_posted_formatted}
            liked={comment.liked}
            ToggleLike={() => ToggleLike(comment.blog_post, comment._id)}
            ></Comment>
        </div>
    });

    return (<div>
        <Header></Header>
        {PostError ? <div><p className="text-center text-blue-800">A network error was encountered</p></div> : 
        PostLoading ? <div><p className="text-center text-blue-800">Post loading...</p></div> : 
        <MainPost
        author={post.author.username}
        title={post.title}
        content={post.content}
        date_posted={post.date_posted_formatted}></MainPost>}
        <CreateComment id={post._id}></CreateComment>
        {CommentError ? <div><p className="text-center text-blue-800">Error loading comments</p></div> :
        CommentLoading ? <div><p className="text-center text-blue-800">Comments section loading...</p></div> :
        comments.length === 0 ? <div><p className="text-center text-blue-800">There are currently no comments</p></div> :
        <div className="flex flex-col items-center gap-y-4 my-6">{commentSection}</div>}
    </div>)
}