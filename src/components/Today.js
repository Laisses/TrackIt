import styled from "styled-components";
import axios from "axios";
import { useContext, useEffect } from "react";
import { AppContext } from "./context";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Title, Container, Message } from "./Common";
import { day } from "./Date";
import { DARK_GREY, LIGHT_BLUE, PRIMARY_FONT, BASE_URL, GREEN } from "./constants";
import checkmark from "../assets/images/checkmark.png";

const CHECKMARK_COLORS = {
    done: {
        backgroundColor: "#8FC549",
        color: "#8FC549",
        border: "none",
    },
    undone: {
        backgroundColor: "#EBEBEB",
        color: "#666666",
        border: "1px solid #E7E7E7",
    }
}

export const Today = () => {

    const { user, setUser, progress, dailyHabits, setDailyHabits } = useContext(AppContext);
    const navigate = useNavigate();

    const refreshDailyHabits = async (token, setDailyHabits) => {
        const config = { headers: { Authorization: `Bearer ${token}` } };

        try {
            const res = await axios.get(`${BASE_URL}/habits/today`, config);
            setDailyHabits(res.data);
        } catch (err) {
            alert(err.response.data.message);
        }
    };

    useEffect(() => {
        const userStr = localStorage.getItem("user");
        if (user.token) {
            refreshDailyHabits(user.token, setDailyHabits);
        } else if (userStr) {
            setUser(JSON.parse(userStr));
        } else {
            navigate("/");
        }
    }, [setUser, navigate, user.token, setDailyHabits]);

    const handleMarker = async (id, done) => {
        const config = { headers: { Authorization: `Bearer ${user.token}`}};

        try {
            if(!done) {
                await axios.post(`${BASE_URL}/habits/${id}/check`, {}, config);
                await refreshDailyHabits(user.token, setDailyHabits);
            } else {
                await axios.post(`${BASE_URL}/habits/${id}/uncheck`, {}, config);
                await refreshDailyHabits(user.token, setDailyHabits);
            }
        } catch (err) {
            alert(err.response.data.message);
        }
    };

    const DailyTasks = ({ id, name, done, currentSequence, highestSequence }) => {
        return (
            <List data-identifier="today-infos">
                <div>
                    <SubTitle>{name}</SubTitle>
                    <P>
                        Sequencia atual: <CurrentSpan
                            color={done
                                ? CHECKMARK_COLORS.done
                                : CHECKMARK_COLORS.undone}>
                            {currentSequence} {currentSequence === 1 ? "dia" : "dias"}
                        </CurrentSpan>
                    </P>
                    <P>
                        Seu recorde: <HighestSpan
                            color={done && currentSequence === highestSequence
                                ? CHECKMARK_COLORS.done
                                : CHECKMARK_COLORS.undone}>
                            {highestSequence} {highestSequence === 1 ? "dia" : "dias"}
                        </HighestSpan>
                    </P>
                </div>
                <CheckMark
                    data-identifier="done-habit-btn"
                    onClick={() => handleMarker(id, done)}
                    color={done
                        ? CHECKMARK_COLORS.done
                        : CHECKMARK_COLORS.undone}>
                    <img src={checkmark} alt="ícone de finalizar tarefa" />
                </CheckMark>
            </List>
        );
    };

    const DailyInfo = () => {
        if (dailyHabits === undefined) {
            return (
                <Loading />
            );
        } else if (dailyHabits.length === 0) {
            return (
                <Message>
                    Não encontramos nenhum hábito para você :(
                </Message>
            );
        } else {
            return (
                <ul>
                    {dailyHabits.map(h => <DailyTasks key={h.id} {...h} />)}
                </ul>
            );
        }
    };

    const Subtitle = () =>
        progress === 0
        ? <NoPercentage>Nenhum hábito concluído ainda</NoPercentage>
        : <Percentage>{progress}% dos hábitos concluídos</Percentage>;

    return (
        <>
            <Header />
            <Container>
                <TitleContainer>
                    <Title>{day.weekday}, {day.date}</Title>
                    <Subtitle />
                </TitleContainer>
                <DailyInfo />
            </Container>
            <Footer />
        </>
    );
};

const HighestSpan = styled.span`
    color: ${({ color }) => color.color};
`;

const CurrentSpan = styled.span`
    color: ${({ color }) => color.color};
`;

const CheckMark = styled.div`
    width: 69px;
    height: 69px;
    background-color: ${({ color }) => color.backgroundColor};
    border: ${({ color }) => color.border};
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
        width: 35px;
        height: 28px;
    }
`;

const NoPercentage = styled.div`
    font-family: ${PRIMARY_FONT};
    font-size: 18px;
    color: #bababa;
    margin-top: 5px;
`;

const Percentage = styled.div`
    font-family: ${PRIMARY_FONT};
    font-size: 18px;
    color: ${GREEN};
    margin-top: 5px;
`;

const TitleContainer = styled.div`
    margin-top: 70px;
    margin-bottom: 30px;
    padding-top: 28px;
`;

const List = styled.li`
    width: 340px;
    height: 94px;
    background-color: #ffffff;
    padding: 13px;
    display: flex;
    justify-content: space-between;
    border-radius: 5px;
    margin-bottom: 10px;
`;

const SubTitle = styled.h2`
    font-family: ${PRIMARY_FONT};
    font-size: 20px;
    color: ${DARK_GREY};
    padding-bottom: 7px;
`;

const P = styled.p`
    color: #666666;
    font-family: ${PRIMARY_FONT};
    font-size: 13px;
`;

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