import styled from "styled-components";
import { useState, useEffect } from "react";
import { AppContext } from "./context";
import { useContext } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Habit } from "./Habit";
import { ThreeDots } from "react-loader-spinner";
import { Title, Container, Message, WEEKDAYS_COLORS } from "./Common";
import { LIGHT_BLUE, DARK_GREY, PRIMARY_FONT, WEEKDAYS, BASE_URL } from "./constants";
import trashcan from "../assets/images/trashcan.png";
import axios from "axios";

export const Habits = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [days, setDays] = useState([]);
    const [name, setName] = useState("");
    const [savedHabits, setSavedHabits] = useState(undefined);
    const { user } = useContext(AppContext);

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        };

        axios.get(`${BASE_URL}/habits`, config)
            .then(res => {
                setSavedHabits(res.data);
            })
            .catch(err => {
                alert(err.response.data.message);
            })

    }, []);

    const openEntry = () => {
        if (!isOpen) {
            setIsOpen(true);
        }
    };

    const ListOfHabits = ({ name, days }) => {
        return (
            <ListItem>
                <Trashcan src={trashcan} alt="ícone de deletar" />
                <SubTitle>{name}</SubTitle>
                <DaysInput>
                    {WEEKDAYS.map((d, i) => <Day
                        key={i}
                        color={days.includes(i)
                            ? WEEKDAYS_COLORS.selected
                            : WEEKDAYS_COLORS.unselected}>{d}
                    </Day>)}
                </DaysInput>
            </ListItem>
        );
    };

    const Info = () => {
        if (savedHabits == 0) {
            return (
                <Message>
                    Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!
                </Message>
            );
        } else if (savedHabits === undefined) {
            return (
                <Loading />
            );
        } else {
            return (
                <div>
                    {savedHabits.map(h => <ListOfHabits
                        key={h.id}
                        name={h.name}
                        days={h.days}
                    />)}
                </div>
            );
        }
    }

    const habitProps = {
        isOpen,
        setIsOpen,
        days,
        setDays,
        name,
        setName,
    };

    return (
        <>
            <Header />
            <Container>
                <TitleContainer>
                    <Title>Meus hábitos</Title>
                    <EntryButton onClick={openEntry}>+</EntryButton>
                </TitleContainer>
                {isOpen && <Habit {...habitProps} />}
                <Info />
            </Container>
            <Footer />
        </>
    );
};

const Loading = () => {
    return (
        <Loader>
            <ThreeDots
                height="80"
                width="80"
                radius="9"
                color={LIGHT_BLUE}
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
            />
        </Loader>
    );
};

const Loader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 35px;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    margin-left: 20px;
`;

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