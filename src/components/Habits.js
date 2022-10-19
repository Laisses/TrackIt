import styled from "styled-components";
import { useState } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Title } from "./Common";
import { DARK_BLUE, LIGHT_BLUE, PRIMARY_FONT, WEEKDAYS } from "./constants";
import { TextInput } from "./Common";

export const Habits = () => {    
    const initialState = {
        isOpen: false,
    };
    
    const [state, setState] = useState({initialState});

    const openEntry = () => {
        if (!state.isOpen) {
            setState({
                ...state,
                isOpen: true,
            })
        }
    };

    const closeEntry = () => {
        if (state.isOpen) {
            setState({
                ...state,
                isOpen: false,
            })
        }
    };

    const HabitsEntry = () => {
        return (
            <EntryContainer>
                <TextInput placeholder="nome do hábito" />
                <DaysInput>
                    {WEEKDAYS.map((e, i) =>
                        <Day key={i}>{e}</Day>
                    )}
                </DaysInput>
                <ButtonsContainer>
                        <CancelButton onClick={closeEntry}>Cancelar</CancelButton>
                        <SaveButton>Salvar</SaveButton>
                </ButtonsContainer>
            </EntryContainer>
        );
    };

    return (
        <>
            <Header />
            <HabitsContainer>
                <TitleContainer>
                    <Title>Meus hábitos</Title>
                    <EntryButton onClick={openEntry}>+</EntryButton>
                </TitleContainer>
                {state.isOpen && HabitsEntry()}
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

const EntryContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 340px;
    height: 180px;
    background-color: #ffffff;
    margin-top: 20px;
    margin-bottom: 30px;
    padding-right: 20px;
    padding-left: 20px;
`;

const DaysInput = styled.div`
    display: flex;
`;

const Day = styled.li`
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: ${PRIMARY_FONT};
    font-size: 20px;
    color: #DBDBDB;
    background-color: #ffffff;
    width: 30px;
    height: 30px;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    margin-right: 4px;
`;

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;    
`;

const CancelButton = styled.button`    
    font-family: ${PRIMARY_FONT};
    font-size: 16px;
    color: ${LIGHT_BLUE};
    background-color: #ffffff;
    border: none;
`;

const SaveButton = styled.button`
    font-family: ${PRIMARY_FONT};
    font-size: 16px;
    width: 84px;
    height: 35px;
    color: #ffffff;
    background-color: ${LIGHT_BLUE};
    border: none;
    border-radius: 5px;
    margin-left: 20px;    
`;