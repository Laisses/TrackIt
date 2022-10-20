import styled from "styled-components";
import axios from "axios";
import { AppContext } from "./context";
import { useContext } from "react";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { TextInput, WEEKDAYS_COLORS } from "./Common";
import { LIGHT_BLUE, PRIMARY_FONT, WEEKDAYS, BASE_URL } from "./constants";

export const Habit = ({isOpen, setIsOpen, days, setDays, name, setName}) => {
    
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AppContext);

    const closeEntry = () => {
        if (isOpen) {
            setIsOpen(false);
        }
    };

    const handleSelection = (day) => {
        if (!loading) {
            if (!days.includes(day)) {
                setDays([...days, day])
            } else {
                setDays(days.filter(d => d !== day))
            }
        }
    };

    const createNewHabit = () => {
        const body = {name, days};
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        };

        console.log(config)

        axios.post(`${BASE_URL}/habits`, body, config)
            .then(_res => {
                setIsOpen(false);
                setDays([]);
                setName("");
                setLoading(false);
            })
            .catch(err => {
                alert(err.response.data.message);
                setLoading(false);
            })
        
        setLoading(true);
    }

    return (
        <EntryContainer>
            <TextInput 
                placeholder="nome do hábito"
                onChange={e => setName(e.target.value)}
                value={name}
                disabled={loading}
            />
            <DaysInput>
                {WEEKDAYS.map((d, i) =>
                    <Day
                        key={i}
                        onClick={() => handleSelection(i)}
                        color={days.includes(i)
                            ? WEEKDAYS_COLORS.selected
                            : WEEKDAYS_COLORS.unselected}>{d}
                    </Day>
                )}
            </DaysInput>
            <ButtonsContainer>
                <CancelButton onClick={closeEntry}>Cancelar</CancelButton>
                {!loading 
                ? <SaveButton onClick={createNewHabit}>Salvar</SaveButton>
                : <Loading />}                
            </ButtonsContainer>
        </EntryContainer>
    );
};

const Loading = () => {
    return (
        <Loader>
            <ThreeDots
                height="60"
                width="60"
                radius="9"
                color="#ffffff"
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
    width: 84px;
    height: 35px;
    color: #ffffff;
    background-color: ${LIGHT_BLUE};
    border: none;
    border-radius: 5px;
    margin-left: 20px;
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