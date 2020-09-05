import React, { useState, FormEvent } from "react";

import "./style.css";
import PageHeader from "../../components/PageHeader";
import Item, { AgentItem } from "../../components/item";
import Input from "../../components/Input";
import Select from "../../components/Select";
import api from "../../services/api";

function List() {
  const [agents, setAgents] = useState([]);

  const [subject, setSubject] = useState("");
  const [week_day, setWeekday] = useState("");
  const [time, setTime] = useState("");

  async function search(e: FormEvent) {
    e.preventDefault();

    const response = await api.get("classes", {
      params: {
        subject,
        week_day,
        time,
      },
    });

    setAgents(response.data);
  }

  return (
    <div id="page-list" className="container">
      <PageHeader title="Estes são os corretores parceiros.">
        <form id="search-agent" onSubmit={search}>
          <Select
            name="subject"
            label="Seguro"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            options={[
              { value: "Residencial", label: "Residencial" },
              { value: "De vida", label: "De vida" },
              { value: "Automotivo", label: "Automotivo" },
              { value: "Empresarial", label: "Empresarial" },
              { value: "Viagem", label: "Viagem" },
            ]}
          />
          <Select
            name="week_day"
            label="Dia da semana"
            value={week_day}
            onChange={(e) => setWeekday(e.target.value)}
            options={[
              { value: "0", label: "Domingo" },
              { value: "1", label: "Segunda-Feira" },
              { value: "2", label: "Terça-Feira" },
              { value: "3", label: "Quarta-feira" },
              { value: "4", label: "Quinta-feira" },
              { value: "5", label: "Sexta-feira" },
              { value: "6", label: "Sábado" },
            ]}
          />
          <Input
            type="time"
            name="time"
            label="Hora"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        {agents.map((agent: AgentItem) => {
          return <Item key={agent.id} agent={agent} />;
        })}
      </main>
    </div>
  );
}

export default List;
