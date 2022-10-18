import styled from "styled-components";
import logo from "../assets/images/logo.png";
import { BigButton, LinkContainer, TextInput, Logo } from "./Common";

export const Login = () => {    
    return (
        <LoginContainer>
            <Logo src={logo} alt="Track It logo" />
            <TextInput placeholder="email"/>
            <TextInput placeholder="senha"/>
            <BigButton>Entrar</BigButton>
            <LinkContainer>Não tem uma conta? Cadastre-se!</LinkContainer>
        </LoginContainer>
    );
};

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

