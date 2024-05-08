import { Agent, getAgents } from './utils.js';

const renderAgents = async (searchInput) => {
    const agents = await getAgents();
    const cleanText = searchInput.toLowerCase();
    console.log(cleanText);
    const list = document.querySelector('.agent-list__list');
    list.innerHTML = '';
    
    for(const agent of agents.data){        
        if(agent.uuid === null || agent.displayName === null || agent.description === null || agent.role === null || agent.role.description === null || agent.fullPortrait === null || agent.displayIcon === null){
            continue;
        }
        else {
            const agentInstance = new Agent(agent.uuid, agent.displayName, agent.description, agent.role.description, agent.fullPortrait, agent.displayIcon);
            const agentCard = agentInstance.renderCard();
            
            if (cleanText === '' || agent.displayName.toLowerCase().includes(cleanText)) {         
                list.appendChild(agentCard);
                agentInstance.addEventListeners();
            }    
        }
    }
}

const render = async () => {
    await renderAgents('');

    const searchBar = document.querySelector(".agent-list__search-bar");
    searchBar.addEventListener("input", async (event) => {
        const searchText = event.target.value;
        await renderAgents(searchText);
    });
};

document.addEventListener('DOMContentLoaded', render);