import { Link } from "react-router-dom";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";
import {LIGHT_BLUE, PRIMARY_FONT, DARK_GREY, DARK_BLUE} from "./constants";

export const BigButton = styled.button`
    font-family: ${PRIMARY_FONT};
    font-size: 21px;
    width: 303px;
    height: 45px;
    color: #ffffff;
    background-color: ${LIGHT_BLUE};
    border: none;
    border-radius: 5px;
`;

export const LinkContainer = styled(Link)`
    color: ${LIGHT_BLUE};
    font-family: ${PRIMARY_FONT};
    font-size: 14px;
    text-decoration: underline;
    margin-top: 25px;
`;

export const TextInput = styled.input`
    font-family: ${PRIMARY_FONT};
    font-size: 20px;
    color: ${DARK_GREY};
    width: 303px;
    height: 45px;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    margin-bottom: 6px;
    padding-left: 10px;
    &::placeholder {
        color: #DBDBDB;
    }
    &:focus {
        outline: none;
    }
`;

export const Logo = styled.img`
    margin-top: 68px;
    margin-bottom: 32px;
    width: 180px;
    height: 178px;
`;

export const Title = styled.h2`
font-family: ${PRIMARY_FONT};
font-size: 23px;
color: ${DARK_BLUE};    
`;

export const Container = styled.div`
    height: 100vh;
    background-color: #F2F2F2;
    padding-left: 18px;
    padding-right: 18px;
`;

export const Message = styled.p`
font-family: ${PRIMARY_FONT};
font-size: 18px;
color: ${DARK_GREY};   
`;

export const Loading = () => {
    return (
        <Loader>
            <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#ffffff"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
            />
        </Loader>
    );
};

const Loader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 303px;
    height: 45px;
    color: #ffffff;
    background-color: ${LIGHT_BLUE};
    border: none;
    border-radius: 5px;
`;