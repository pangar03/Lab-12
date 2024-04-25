import { Agent, getAgents } from './utils.js';

const render = async () => {
    const agents = await getAgents();
    const list = document.querySelector('.agent-list__list');

    for(const agent of agents.data){        
        if(agent.uuid === null || agent.displayName === null || agent.description === null || agent.role === null || agent.role.description === null || agent.fullPortrait === null || agent.displayIcon === null){
            continue;
        }
        else {
            const agentInstance = new Agent(agent.uuid, agent.displayName, agent.description, agent.role.description, agent.fullPortrait, agent.displayIcon);
            const agentCard = agentInstance.renderCard();
    
            list.appendChild(agentCard);
            agentInstance.addEventListeners();
        }
    }
}

document.addEventListener('DOMContentLoaded', render);