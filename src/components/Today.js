import styled from "styled-components";
import { useState, useEffect } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Title, Container } from "./Common";
import { day } from "./Date";
import { DARK_GREY, PRIMARY_FONT } from "./constants";
import checkmark from "../assets/images/checkmark.png";

const dummyDailyHabits = [
    {
        "id": 1,
        "name": "Ler",
        "done": true,
        "currentSequence": 3,
        "highestSequence": 3
    },

    {
        "id": 3,
        "name": "Acordar",
        "done": false,
        "currentSequence": 1,
        "highestSequence": 1
    },

    {
        "id": 5,
        "name": "Programar",
        "done": true,
        "currentSequence": 1,
        "highestSequence": 4
    }
];

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
    const [date, setDate] = useState(undefined);
    const [weekday, setWeekday] = useState(undefined);

    useEffect(() => {
        setDate(day.date);
        setWeekday(day.weekday)
    }, []);

    const Daily = ({ name, done, current, highest }) => {
        return (
            <List>
                <div>
                    <SubTitle>{name}</SubTitle>
                    <P>
                        Sequencia atual: <CurrentSpan
                            color={done
                                ? CHECKMARK_COLORS.done
                                : CHECKMARK_COLORS.undone}>
                            {current} {current > 1 ? "dias" : "dia"}
                        </CurrentSpan>
                    </P>
                    <P>
                        Seu recorde: <HighestSpan
                            color={done && current === highest
                                ? CHECKMARK_COLORS.done
                                : CHECKMARK_COLORS.undone}>
                            {highest} {highest > 1 ? "dias" : "dia"}
                        </HighestSpan>
                    </P>
                </div>
                <CheckMark
                    color={done
                        ? CHECKMARK_COLORS.done
                        : CHECKMARK_COLORS.undone}>
                    <img src={checkmark} alt="ícone de finalizar tarefa" />
                </CheckMark>
            </List>
        );
    }

    return (
        <>
            <Header />
            <Container>
                <TitleContainer>
                    <Title>{weekday}, {date}</Title>
                    <Subtitle>Nenhum hábito concluído ainda</Subtitle>
                </TitleContainer>
                <ul>
                    {dummyDailyHabits.map(h => <Daily
                        key={h.id}
                        name={h.name}
                        done={h.done}
                        current={h.currentSequence}
                        highest={h.highestSequence}
                    />)}
                </ul>
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

const Subtitle = styled.div`
    font-family: ${PRIMARY_FONT};
    font-size: 18px;
    color: #bababa;
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