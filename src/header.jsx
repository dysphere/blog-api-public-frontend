import { useContext } from "react";
import { UserContext } from "./UserContext";
import { Link, Navigate } from "react-router-dom";
import { Container } from '@mantine/core';

const userLinks = [
    {link: '/blog', label: 'Posts'},
    {link: '/signup', label: 'Sign Up'},
    {link: '/login', label: 'Log In'}
]

export const Header = () => {
    const {user, removeToken} = useContext(UserContext);

    const userItems = userLinks.map((link) => {
        <Link
        key={link.label}
        to={link.link}>
            {link.label}
        </Link>
    })

    function userLogout() {
        removeToken();
        <Navigate to="/blog" replace={true}/>
    }

    return (<header>
        <Container fluid>
            <div>
                <Link to="/blog">Home</Link>
            </div>
            {user ? <div>{userItems}</div> : 
            <div>
                <Link to="/blog">Posts</Link>
                <button type="button" onClick={userLogout}>Log Out</button>
                </div>}
        </Container>
    </header>);
}