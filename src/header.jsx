import { useContext } from "react";
import { UserContext } from "./UserContext";
import { Link, Navigate } from "react-router-dom";
import { Container } from '@mantine/core';

const links = [
    {link: '/blog', label: 'Posts'},
    {link: '/signup', label: 'Sign Up'},
    {link: '/login', label: 'Log In'}
];

export const Header = () => {
    const {user, removeToken} = useContext(UserContext);

    const items = links.map((link) => (
        <Link
          key={link.label}
          to={link.link}
        >
          {link.label}
        </Link>
      ));

    function userLogout() {
        removeToken();
        <Navigate to="/blog" replace={true}/>
    }

    return (<header>
        <Container fluid className="flex flex-row justify-between pt-4">
            <div className="pl-10">
                <Link to="/blog">Home</Link>
            </div>
            {user ? <div>
                <Link to="/blog">Posts</Link>
                <button type="button" onClick={userLogout}>Log Out</button>
                </div>  :        
                <div className="flex flex-row justify-evenly gap-x-10 pr-10">{items}</div>}
        </Container>
    </header>);
}