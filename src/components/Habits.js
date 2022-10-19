import styled from "styled-components";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Title } from "./Common";
import { LIGHT_BLUE, PRIMARY_FONT } from "./constants";

export const Habits = () => {
    return (
        <>
            <Header />
            <HabitsContainer>
                <TitleContainer>
                    <Title>Meus hábitos</Title>
                    <EntryButton>+</EntryButton>
                </TitleContainer>


            </HabitsContainer>
            <Footer />
        </>

    );
};

const HabitsContainer = styled.div`
    height: 100vh;
    background-color: #F2F2F2;
    padding-left: 18px;
    padding-right: 18px;
`;

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 70px;
    padding-top: 28px;
`;

const EntryButton = styled.button`
    font-size: 30px;
    width: 40px;
    height: 35px;
    color: #ffffff;
    background-color: ${LIGHT_BLUE};
    border: none;
    border-radius: 5px;
`;

const HabitsEntry = styled.div`
    
`;