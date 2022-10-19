import styled from "styled-components";
import { useState } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Title } from "./Common";
import { LIGHT_BLUE, PRIMARY_FONT, WEEKDAYS } from "./constants";
import { TextInput } from "./Common";

const WEEKDAYS_COLORS = {
    selected: {
        backgroundColor: "#CFCFCF",
        color: "#ffffff",
        border: "1px solid #CFCFCF",
    },
    unselected: {
        backgroundColor: "#ffffff",
        color: "#DBDBDB",
        border: "1px solid #D5D5D5",
    }
}

export const Habits = () => {    
    const [isOpen, setIsOpen] = useState(false);
    const [daysChoosen, setDaysChoosen] = useState([]);   

    const openEntry = () => {
        if (!isOpen) {
            setIsOpen(true);
        }
    };

    const closeEntry = () => {
        if (isOpen) {
            setIsOpen(false);
        }
    };

    const handleSelection = (day) => {
        if(!daysChoosen.includes(day)) {
            setDaysChoosen([...daysChoosen, day])
        } else {
            setDaysChoosen(daysChoosen.filter(d => d !== day))
        }
    };

    const Entry = () => {
        return (
            <EntryContainer>
                <TextInput placeholder="nome do hábito" />
                <DaysInput>
                    {WEEKDAYS.map((d, i) =>
                        <Day 
                            key={i}
                            onClick={() => handleSelection(i)} 
                            color={daysChoosen.includes(i)
                                ? WEEKDAYS_COLORS.selected
                                : WEEKDAYS_COLORS.unselected}>{d}
                        </Day>
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
                {isOpen && Entry()}
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
    color: ${({ color }) => color.color};
    background-color: ${({ color }) => color.backgroundColor};
    border: ${({ color }) => color.border};
    width: 30px;
    height: 30px;    
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