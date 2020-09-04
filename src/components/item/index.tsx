import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './style.css';
import api from '../../services/api';

export interface AgentItem{
        avatar: string;
        bio: string;
        cost: number;
        id:number;
        name: string;
        subject: string;
        whatsapp: string;
}

interface AgentItemProps{
    agent: AgentItem;
}

const Item: React.FC<AgentItemProps> = ({ agent }) => {
    function createNewConnection(){
        api.post('connections',{
            user_id: agent.id,
        });
    }
    return(
        <article className="item">
                    <header>
                        <img src={agent.avatar} alt="avatar"/>
                        <div>
                        <strong>{agent.name}</strong>
                            <span>{agent.subject}</span>
                        </div>
                    </header>

                    <p>
                    {agent.bio}
                    </p>

                    <footer>
                        <p>
                            Preço/hora
                            <strong>R$ {agent.cost}</strong>
                        </p>
                        <a  target ="_blank" onClick= {createNewConnection} href={`https://wa.me/${agent.whatsapp}`}>
                            <img src={whatsappIcon} alt="Whatsapp"/>
                            Entrar em contato
                        </a>
                    </footer>
                </article>
    );
}

export default Item;