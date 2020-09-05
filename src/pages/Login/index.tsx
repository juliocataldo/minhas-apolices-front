import React, { useState, FormEvent } from "react";
import * as Yup from "yup";
import * as S from "./style";
import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import firebase from "../../components/Firebase";
import { useHistory } from "react-router-dom";

function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    const schema = Yup.object().shape({
      login: Yup.string().required(),
      password: Yup.string().required(),
    });

    const isValid = await schema.isValid({
      login,
      password,
    });

    if (isValid) {
      firebase
        .auth()
        .signInWithEmailAndPassword(login, password)
        .then((response) => {
          history.push("/dashboard");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <S.Container>
      <PageHeader title="Bem vindo novamente, que bom que voltou! :)" />
      <form onSubmit={handleLogin}>
        <S.ContainerInput>
          <Input
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            label="Login"
            name="Login"
          />
          <Input
            label="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="Senha"
          />
          <S.Button>Logar</S.Button>
        </S.ContainerInput>
      </form>
    </S.Container>
  );
}

export default Login;
