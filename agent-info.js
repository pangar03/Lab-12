import { Agent, getAgentByID } from './utils.js';

const render = async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const agent = await getAgentByID(id);
    const agentInstance = new Agent(agent.uuid, agent.displayName, agent.description, agent.role.description, agent.fullPortrait, agent.displayIcon);

    const container = document.querySelector('.container');

    const agentInfo = agentInstance.renderInfo();

    container.appendChild(agentInfo);
};

document.addEventListener('DOMContentLoaded', render);