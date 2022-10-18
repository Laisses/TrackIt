import { LIGHT_BLUE, PRIMARY_FONT } from "./constants"
import styled from "styled-components";
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

export const Footer = () => {
    const percentage = 66;
    
    return (
        <Div>
            <span>Hábitos</span>
            <Progress>
                <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
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
            <span>Historico</span>
        </Div>
    );
};

const Div = styled.div`
    font-family: ${PRIMARY_FONT};
    font-size: 18px;
    width: 100%;
    height: 70px;
    background-color: #ffffff;
    color: ${LIGHT_BLUE};
    padding-right: 36px;
    padding-left: 36px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    right: 0;

    


    margin-bottom: 600px;
`;
const Progress = styled.div`
    width: 90px;
    height: 90px;
    position: fixed;
    bottom: 10px;
    left: 50%;
    margin-left: -45px;

    margin-bottom: 600px;
`;

//Lembrar de tirar os margin-bottom

