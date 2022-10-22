import styled from "styled-components";
//import { useState } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Title, Container, Message } from "./Common";

export const History = () => {
    return (
        <>
            <Header />
            <Container>
                <TitleContainer>
                    <Title>Histórico</Title>
                </TitleContainer>
                <Message>
                    Em breve você poderá ver o histórico dos seus hábitos aqui!
                </Message>
            </Container>
            <Footer />
        </>
    );
};

const TitleContainer = styled.div`
    margin-top: 70px;
    margin-bottom: 17px;
    padding-top: 28px;
`;