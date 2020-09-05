import React, { useState, FormEvent } from "react";
import * as Yup from "yup";
import * as S from "./styles";
import { useHistory } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import Input from "../../components/Input";
import PageHeader from "../../components/PageHeader";
import firebase from "../../components/Firebase";

function Register() {
  const [name, setName] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [dtNascimento, setDtnascimento] = useState("");
  const [celEmail, setCelEmail] = useState("");
  const [creci, setCreci] = useState("");
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleValidateInputsAndSubmitForm = async (event: FormEvent) => {
    event.preventDefault();

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      sobrenome: Yup.string().required(),
      cpf: Yup.string().required(),
      senha: Yup.string().required(),
      dtNascimento: Yup.string().required(),
      celEmail: Yup.string().required(),
      creci: Yup.string().required(),
      cep: Yup.string().required(),
      rua: Yup.string().required(),
      numero: Yup.string().required(),
      complemento: Yup.string().optional(),
      estado: Yup.string().required(),
      cidade: Yup.string().required(),
    });

    const isValid = await schema.isValid({
      name,
      sobrenome,
      cpf,
      senha,
      dtNascimento,
      celEmail,
      creci,
      cep,
      rua,
      numero,
      complemento,
      estado,
      cidade,
    });

    if (isValid) {
      setLoading(true);
      const db = firebase.firestore();

      firebase
        .auth()
        .createUserWithEmailAndPassword(celEmail, senha)
        .then(() => {
          let user = firebase.auth().currentUser;
          user?.updateProfile({
            displayName: name,
          });
          const userRef = db
            .collection("users")
            .doc(user?.uid)
            .set({
              id: user?.uid,
              name,
              sobrenome,
              cpf,
              senha,
              dtNascimento,
              celEmail: user?.email,
              creci,
              cep,
              rua,
              numero,
              complemento,
              estado,
              cidade,
            })
            .then((response) => {
              history.push("/login");
            })
            .catch((e) => {
              alert("Erro ao enviar");
            })
            .finally(() => {
              setLoading(false);
            });
        })
        .catch(() => {
          alert("error");
        });
    } else {
      alert("Informar todos os dados");
    }
  };

  return (
    <S.Container>
      <PageHeader
        title="Que incrível que você quer melhorar sua gestão."
        description="O primeiro passo é preencher esse formulário de inscrição"
      />

      <form onSubmit={handleValidateInputsAndSubmitForm}>
        <S.ContainerInput>
          <S.Title>Informações pessoais</S.Title>

          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Nome"
            name="Nome"
          />
          <Input
            label="Sobrenome"
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}
            name="Sobrenome"
          />
          <Input
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            label="CPF / CNPJ"
            name="CPF / CNPJ"
          />
          <Input
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            label="Senha"
            name="Senha"
            type="password"
          />
          <Input
            value={dtNascimento}
            onChange={(e) => setDtnascimento(e.target.value)}
            label="Dt nascimento"
            name="Dt nascimento"
          />
          <Input
            value={celEmail}
            onChange={(e) => setCelEmail(e.target.value)}
            label="Celular / E-Mail"
            name="Celular / E-Mail"
          />
        </S.ContainerInput>

        <S.ContainerInput>
          <S.Title>Informações complementares</S.Title>

          <Input
            value={creci}
            onChange={(e) => setCreci(e.target.value)}
            label="Numero doc. Creci"
            name="Numero doc. Creci"
          />
          <Input
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            label="CEP"
            name="CEP"
          />
          <Input
            value={rua}
            onChange={(e) => setRua(e.target.value)}
            label="Rua / Avenida"
            name="Rua / Avenida"
          />
          <div className="wrapper">
            <Input
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              label="Numero"
              name="Numero"
            />
            <Input
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
              label="Complemento"
              name="Complemento"
            />
          </div>
          <div className="wrapper">
            <Input
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              label="Estado"
              name="Estado"
            />
            <Input
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              label="Cidade"
              name="Cidade"
            />
          </div>
        </S.ContainerInput>

        <S.ContainerButton>
          <button>{loading ? <FaSpinner size={25} /> : "Cadastrar"}</button>
        </S.ContainerButton>
      </form>
    </S.Container>
  );
}

export default Register;
