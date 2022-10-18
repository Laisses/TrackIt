import { LIGHT_BLUE, PRIMARY_FONT } from "./constants"
import styled from "styled-components"

export const Footer = () => {
    return (
        <Div>
            <span>Hábitos</span>
            <div>Hoje</div>
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

    display: flex;
    align-items: center;
    justify-content: space-around;
    position: fixed;
    bottom: 0;
    right: 0;

    


    margin-bottom: 600px;
`;

