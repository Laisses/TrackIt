import styled from "styled-components";
import { useState } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Title, TextInput, Container } from "./Common";
import { LIGHT_BLUE, DARK_GREY, PRIMARY_FONT, WEEKDAYS } from "./constants";
import trashcan from "../assets/images/trashcan.png";

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

const dummyHabits = [
	{
		id: 1,
		name: "Nome do hábito",
		days: [1, 3, 5]
	},
	{
		id: 2,
		name: "Nome do hábito 2",
		days: [1, 3, 4, 6]
	}
];

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

    const ListOfHabits = ({name, days}) => {
        return (
            <ListItem>
                <Trashcan src={trashcan} alt="ícone de deletar" />
                <SubTitle>{name}</SubTitle>
                <DaysInput>
                    {WEEKDAYS.map((d, i)=> <Day
                        key={i}
                        color={days.includes(i)
                            ? WEEKDAYS_COLORS.selected
                            : WEEKDAYS_COLORS.unselected}>{d}
                    </Day>)}
                </DaysInput>
            </ListItem>
        );
    };

    return (
        <>
            <Header />
            <Container>
                <TitleContainer>
                    <Title>Meus hábitos</Title>
                    <EntryButton onClick={openEntry}>+</EntryButton>
                </TitleContainer>
                {isOpen && Entry()}
                {/* <Message>
                    Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!
                </Message> */}
                <div>
                    {dummyHabits.map(h => <ListOfHabits 
                        key={h.id}
                        name={h.name}
                        days={h.days}
                    />)}
                </div>
            </Container>
            <Footer />
        </>
    );
};

const Trashcan = styled.img`
    width: 13px;
    height: 15px;
    position: absolute;
    right: 10px;
    top: 11px;
`;

const SubTitle = styled.h2`
    font-family: ${PRIMARY_FONT};
    font-size: 20px;
    color: ${DARK_GREY};
    padding-top: 13px;
    padding-bottom: 10px;
`;

const ListItem = styled.li`
    width: 340px;
    height: 91px;
    background-color: #ffffff;
    border-radius: 5px;
    margin: 10px auto;    
    padding-left: 15px;
    position: relative;
`;

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 70px;
    margin-bottom: 30px;
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

const Message = styled.p`
    font-family: ${PRIMARY_FONT};
    font-size: 18px;
    color: ${DARK_GREY};   
`;