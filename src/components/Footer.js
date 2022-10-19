import { LIGHT_BLUE, PRIMARY_FONT } from "./constants"
import styled from "styled-components";
import { Link } from "react-router-dom";
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

export const Footer = () => {
    const percentage = 66;
    
    return (
        <Div>
            <Span to="/habitos">Hábitos</Span>
            <Progress to="/hoje">
                <CircularProgressbar
                    value={percentage}
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
            </Progress>
            <Span to="/historico">Historico</Span>
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

const Progress = styled(Link)`
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