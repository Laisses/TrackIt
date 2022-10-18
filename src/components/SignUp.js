import styled from "styled-components";
import logo from "../assets/images/logo.png";
import { BigButton, LinkContainer, TextInput, Logo } from "./Common";

export const SignUp = () => {
    return (
        <SignUpContainer>
            <Logo src={logo} alt="Track It logo" />
            <TextInput placeholder="email" />
            <TextInput placeholder="senha" />
            <TextInput placeholder="nome" />
            <TextInput placeholder="foto" />
            <BigButton>Cadastrar</BigButton>
            <LinkContainer to="/">
                Já tem uma conta? Faça login!
            </LinkContainer>
        </SignUpContainer>
    );
};

const SignUpContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;