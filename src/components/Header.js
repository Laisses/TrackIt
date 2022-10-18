import styled from "styled-components";
import { DARK_BLUE, SECONDARY_FONT } from "./constants";

export const Header = () => {    
    return (
        <Navbar>
            <NavTitle>TrackIt</NavTitle>
            <Profile alt="profile picture" src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg"/>
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

const NavTitle = styled.h1`
    color: #ffffff;
    font-family: ${SECONDARY_FONT};
    font-size: 39px;
`;

const Profile = styled.img`
    height: 51px;
    width: 51px;
    border-radius: 98px;
`;