import styled from "styled-components";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const Habitos = () => {
    return (
        <>
        <Header />
        <Div>Eu sou o Habitos</Div>
        <Footer />
        </>
        
    );
};

const Div = styled.div`
    color: darkblue;
    height: 300px;
    background-color: darkgreen;
`;