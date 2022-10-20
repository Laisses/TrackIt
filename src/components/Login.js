import styled from "styled-components";
import logo from "../assets/images/logo.png";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "./context";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./constants";
import { BigButton, LinkContainer, TextInput, Logo, Loading } from "./Common";

export const Login = () => {

    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const { setUser } = useContext(AppContext);
    const navigate = useNavigate();

    const handleForm = e => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const signIn = () => {
        const body = { ...form };

        axios.post(`${BASE_URL}/auth/login`, body)
            .then(res => {
                setLoading(false);
                const user = {
                    name: res.data.name,
                    image: res.data.image,
                    email: res.data.email,
                    password: res.data.password,
                    token: res.data.token,
                };
                setUser(user);
                localStorage.setItem("user", JSON.stringify(user));
                navigate("/hoje");
            })
            .catch(err => {
                alert(err.response.data.message);
                setLoading(false);
            });

        setLoading(true);
    }

    useEffect(() => {
        const userStr = localStorage.getItem("user");
        if (userStr) {
            setUser(JSON.parse(userStr));
            navigate("/hoje");
        }
    }, [setUser, navigate]);

    return (
        <LoginContainer>
            <Logo src={logo} alt="Track It logo" />
            <TextInput
                data-identifier="input-email"
                name="email"
                value={form.email}
                placeholder="email"
                onChange={handleForm}
                disabled={loading}
            />
            <TextInput
                data-identifier="input-password"
                name="password"
                value={form.password}
                placeholder="senha"
                onChange={handleForm}
                disabled={loading}
                type="password"
            />
            {!loading
                ? <BigButton
                    data-identifier="login-btn"
                    onClick={signIn}>
                    Entrar
                </BigButton>
                : <Loading />}
            <LinkContainer data-identifier="sign-up-action" to="/cadastro">
                Não tem uma conta? Cadastre-se!
            </LinkContainer>
        </LoginContainer>
    );
};

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

