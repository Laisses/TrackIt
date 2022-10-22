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
import { useNavigate } from "react-router-dom";



export const Habits = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [days, setDays] = useState([]);
    const [name, setName] = useState("");
    const [savedHabits, setSavedHabits] = useState(undefined);
    const { user, setUser, setDailyHabits } = useContext(AppContext);
    const navigate = useNavigate();

    const refreshHabits = async (token, setSavedHabits, setDailyHabits) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        try {
            const allHabits = await axios.get(`${BASE_URL}/habits`, config);
            setSavedHabits(allHabits.data);
            const todayHabits = await axios.get(`${BASE_URL}/habits/today`, config);
            setDailyHabits(todayHabits.data);
        } catch (err) {
            debugger
            alert(err.response.data.message);
        }
    };

    useEffect(() => {
        const userStr = localStorage.getItem("user");
        if (user.token) {
            refreshHabits(user.token, setSavedHabits, setDailyHabits);
        } else if (userStr) {
            setUser(JSON.parse(userStr));
        } else {
            navigate("/");
        }
     }, [setUser, navigate, user.token, setSavedHabits, setDailyHabits]);

    const openEntry = () => {
        if (!isOpen) {
            setIsOpen(true);
        }
    };

    const deleteHabit = async id => {
        const config = { headers: { Authorization: `Bearer ${user.token}`}
        };
        const text = "Você tem certeza que quer deletar esse hábito?"

        if (window.confirm(text) === true) {
            try {
                await axios.delete(`${BASE_URL}/habits/${id}`, config);
                await refreshHabits(user.token, setSavedHabits, setDailyHabits);
            } catch (err) {
                alert(err.response.data.message);
            }
        }
    }

    const ListOfHabits = ({ name, days, id }) => {
        return (
            <ListItem>
                <Trashcan
                    data-identifier="delete-habit-btn"
                    src={trashcan}
                    alt="ícone de deletar"
                    onClick={() => deleteHabit(id)}
                    />
                <SubTitle data-identifier="habit-name">{name}</SubTitle>
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
        if (savedHabits === undefined) {
            return (
                <Loading />
            );
        } else if (savedHabits.length === 0) {
            return (
                <Message data-identifier="no-habit-message">
                    Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!
                </Message>
            );
        } else {
            return (
                <div>
                    {savedHabits.map(h => <ListOfHabits
                        key={h.id}
                        id={h.id}
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
        onCreate: async () => await refreshHabits(user.token, setSavedHabits, setDailyHabits),
    };

    return (
        <>
            <Header />
            <Container>
                <TitleContainer>
                    <Title>Meus hábitos</Title>
                    <EntryButton data-identifier="create-habit-btn" onClick={openEntry}>+</EntryButton>
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