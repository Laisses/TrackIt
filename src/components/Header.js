import styled from "styled-components";
import { Link } from "react-router-dom";
import { AppContext } from "./context";
import { useContext } from "react";
import { DARK_BLUE, SECONDARY_FONT } from "./constants";

export const Header = () => {

    const { user } = useContext(AppContext);

    return (
        <Navbar>
            <NavTitle to="/">
                TrackIt
            </NavTitle>
            <Profile data-identifier="avatar" src={user.image} alt="profile picture"/>
        </Navbar>
    );
};

const Navbar = styled.nav`
    background-color: ${DARK_BLUE};
    height: 70px;
    width: 100%;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    position: fixed;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 36px;
    padding-left: 36px;
`;

const NavTitle = styled(Link)`
    color: #ffffff;
    font-family: ${SECONDARY_FONT};
    font-size: 39px;
    text-decoration: none;
`;

const Profile = styled.img`
    height: 51px;
    width: 51px;
    border-radius: 98px;
`;