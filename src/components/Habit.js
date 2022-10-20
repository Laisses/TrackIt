import styled from "styled-components";
import { useState } from "react";
import { TextInput, WEEKDAYS_COLORS } from "./Common";
import { LIGHT_BLUE, PRIMARY_FONT, WEEKDAYS } from "./constants";

export const Habit = ({isOpen, setIsOpen}) => {

    const [daysChoosen, setDaysChoosen] = useState([]);

    const closeEntry = () => {
        if (isOpen) {
            setIsOpen(false);
            setDaysChoosen([]);
        }
    };

    const handleSelection = (day) => {
        if (!daysChoosen.includes(day)) {
            setDaysChoosen([...daysChoosen, day])
        } else {
            setDaysChoosen(daysChoosen.filter(d => d !== day))
        }
    }; 

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

const Day = styled.div`
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