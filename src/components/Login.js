import styled from "styled-components";
import logo from "../assets/images/logo.png";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { BASE_URL } from "./constants";
import { LIGHT_BLUE } from "./constants";
import { Link } from "react-router-dom";
import { BigButton, LinkContainer, TextInput, Logo } from "./Common";

export const Login = () => {
    return (
        <LoginContainer>
            <Logo src={logo} alt="Track It logo" />
            <TextInput placeholder="email" />
            <TextInput placeholder="senha" />
            <BigButton>
                <Link to="/habitos">
                    Entrar
                </Link>
            </BigButton>
            <LinkContainer to="/cadastro">
                Não tem uma conta? Cadastre-se!
            </LinkContainer>
        </LoginContainer>
    );
};

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

