import axios from "axios";
import styled from "styled-components";
import logo from "../assets/images/logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { BASE_URL } from "./constants";
import { LIGHT_BLUE } from "./constants";
import { BigButton, LinkContainer, TextInput, Logo } from "./Common";

export const SignUp = () => {

    const [form, setForm] = useState({ email: "", name: "", image: "", password: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleForm = e => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const createUser = () => {
        const body = { ...form };

        axios.post(`${BASE_URL}/auth/sign-up`, body)
            .then((res) => {
                setLoading(false);
                alert("Usuário cadastrado com sucesso!");
                navigate("/");
            })
            .catch(err => {
                alert(err.response.data.message);                
                setLoading(false);
            });
        setLoading(true);
    };

    const Loading = () => {
        return (
            <Loader>
                <ThreeDots
                    height="80"
                    width="80"
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

    return (
        <SignUpContainer>
            <Logo src={logo} alt="Track It logo" />
            <TextInput
                data-identifier="input-email"
                name="email"
                value={form.email}
                onChange={handleForm}
                placeholder="email"
                disabled={loading}
                required
            />
            <TextInput
                data-identifier="input-password"
                name="password"
                value={form.password}
                onChange={handleForm}
                type="password"
                placeholder="senha"
                disabled={loading}
                required
            />
            <TextInput
                data-identifier="input-name"
                name="name"
                value={form.name}
                onChange={handleForm}
                placeholder="nome"
                disabled={loading}
                required
            />
            <TextInput
                data-identifier="input-photo"
                name="image"
                value={form.image}
                onChange={handleForm}
                placeholder="foto"
                disabled={loading}
                required
            />
            {!loading
                ? <BigButton
                    onClick={createUser}>Cadastrar
                </BigButton>
                : <Loading />}

            <LinkContainer data-identifier="back-to-login-action" to="/">
                Já tem uma conta? Faça login!
            </LinkContainer>
        </SignUpContainer>
    );
};

const SignUpContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Loader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 303px;
    height: 45px;
    color: #ffffff;
    background-color: ${LIGHT_BLUE};
    border: none;
    border-radius: 5px;
`;