import React, { useState, FormEvent } from "react";
import * as Yup from "yup";
import * as S from "./style";
import { FaSpinner } from "react-icons/fa";
import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import firebase from "../../components/Firebase";
import { useHistory } from "react-router-dom";

function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorEmail, setShowErrorEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showErrorNotFound, setShowErrorNotFound] = useState(false);
  const history = useHistory();

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    const schema = Yup.object().shape({
      login: Yup.string().required().email(),
      password: Yup.string().required(),
    });

    const isValid = await schema.isValid({
      login,
      password,
    });

    if (isValid) {
      setLoading(true);
      setShowErrorEmail(false);
      firebase
        .auth()
        .signInWithEmailAndPassword(login, password)
        .then((response) => {
          history.push("/dashboard");
          setLoading(false);
        })
        .catch((e) => {
          setShowErrorNotFound(true);
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setShowErrorEmail(true);
    }
  };

  const recoverPassword = () => {
    firebase.auth().sendPasswordResetEmail(login);
  };

  return (
    <S.Container>
      <PageHeader title="Bem vindo novamente, que bom que voltou! :)" />
      <form onSubmit={handleLogin}>
        <S.ContainerInput>
          {showErrorEmail && <p className="error">* Email inválido</p>}
          {showErrorNotFound && (
            <p className="error">* Senha ou email inválidos</p>
          )}
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
            type="password"
          />
          <S.Button>{loading ? <FaSpinner size={25} /> : "Logar"}</S.Button>

          <a onClick={recoverPassword}>Recuperar minha Senha</a>
        </S.ContainerInput>
      </form>
    </S.Container>
  );
}

export default Login;
