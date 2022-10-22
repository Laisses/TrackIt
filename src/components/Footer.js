import styled from "styled-components";
import { LIGHT_BLUE, PRIMARY_FONT } from "./constants";
import { Link } from "react-router-dom";
import { AppContext } from "./context";
import { useContext } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

export const Footer = () => {

    const { dailyHabits } = useContext(AppContext);

    const progress = () => {
        if (dailyHabits === undefined || dailyHabits.length === 0) {
            return 0;
        }

        const doneHabits = dailyHabits.filter(t => t.done);
        return Math.round((doneHabits.length * 100) / dailyHabits.length);
    };

    return (
        <Div>
            <Span data-identifier="habit-page-action" to="/habitos">Hábitos</Span>
            <DailyProgress to="/hoje">
                <CircularProgressbar
                    value={progress()}
                    text="Hoje"
                    background
                    backgroundPadding={6}
                    styles={buildStyles({
                        backgroundColor: "#52B6FF",
                        textColor: "#fff",
                        pathColor: "#fff",
                        trailColor: "transparent"
                    })}
                />
            </DailyProgress>
            <Span data-identifier="historic-page-action" to="/historico">Historico</Span>
        </Div>
    );
};

const Div = styled.div`
    font-family: ${PRIMARY_FONT};
    font-size: 18px;
    width: 100%;
    height: 70px;
    background-color: #ffffff;
    padding-right: 36px;
    padding-left: 36px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    right: 0;
`;

const DailyProgress = styled(Link)`
    width: 90px;
    height: 90px;
    position: fixed;
    bottom: 10px;
    left: 50%;
    margin-left: -45px;
`;

const Span = styled(Link)`
    text-decoration: none;
    color: ${LIGHT_BLUE};
`;