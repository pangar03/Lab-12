export const getAgents = async () => {
    const data = await fetch('https://valorant-api.com/v1/agents');
    const agents = await data.json();

    return agents;
};

export const getAgentByID = async (id) => {
    const agents = await getAgents();

    for(const agent of agents.data){
        if(agent.uuid === id){
            return agent;
        }
    }

    throw new Error('Agent not found');
};

export class Agent {
    id;
    name;
    description;
    roleDescription;
    portrait;
    icon;
    #nodo;

    constructor(id, name, description, roleDescription, portrait, icon) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.roleDescription = roleDescription;
        this.portrait = portrait;
        this.icon = icon;
    }

    renderCard() {
        const agentCard = document.createElement('div');
        agentCard.classList.add('list__agent-card');

        const agentIcon = document.createElement('img');
        agentIcon.classList.add('agent-card__img');
        agentIcon.src = this.icon;
        agentIcon.alt = this.name;

        const agentInfo = document.createElement('div');
        agentInfo.classList.add('agent-card__info-container');

        const agentName = document.createElement('h3');
        agentName.classList.add('info-container__agent-name');
        agentName.textContent = this.name;

        const description = document.createElement('p');
        description.classList.add('info-container__agent-info');
        description.textContent = this.description;

        const infoButton = document.createElement('div');
        infoButton.classList.add('info-container__more-info');
        const infoButtonText = document.createElement('p');
        infoButtonText.textContent = 'Ver información detallada';

        this.#nodo = infoButton;

        infoButton.appendChild(infoButtonText);
        
        agentInfo.appendChild(agentName);
        agentInfo.appendChild(description);
        agentInfo.appendChild(infoButton);
        
        agentCard.appendChild(agentIcon);
        agentCard.appendChild(agentInfo);

        return agentCard;
    }

    renderInfo() {
        const agentInfo = document.createElement('div');
        agentInfo.classList.add('agent-info__container');

        const agentPortrait = document.createElement('img');
        agentPortrait.classList.add('container__portrait');
        agentPortrait.src = this.portrait;
        agentPortrait.alt = this.name;

        const infoContainer = document.createElement('div');
        infoContainer.classList.add('container__info-container');

        const agentName = document.createElement('h2');
        agentName.classList.add('info-container__agent-name');
        agentName.textContent = this.name;

        const description = document.createElement('p');
        description.classList.add('info-container__agent-description');
        description.textContent = this.description;

        const roleTitle = document.createElement('h3');
        roleTitle.textContent = 'Role:';

        const roleDescription = document.createElement('p');
        roleDescription.classList.add('info-container__role-description');
        roleDescription.textContent = this.roleDescription;

        infoContainer.appendChild(agentName);
        infoContainer.appendChild(description);
        infoContainer.appendChild(roleTitle);
        infoContainer.appendChild(roleDescription);

        agentInfo.appendChild(agentPortrait);
        agentInfo.appendChild(infoContainer);

        return agentInfo;
    }

    addEventListeners() {
        this.#nodo.addEventListener('click', () => {
            window.location.href = `./agent-info.html?id=${this.id}`;
        });
    }
}