const messagesAreaTemplate = document.createElement('template');
messagesAreaTemplate.innerHTML = `
    <style>
        :host {
            background-color: var(--green);
            flex-grow: 1;
            overflow: auto;
            margin: var(--margin);
        }
    </style>
    <slot></slot>
`;

class MessagesArea extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(messagesAreaTemplate.content.cloneNode(true));
    }

    init(worker) {
        this.worker = worker;
    }

    handleTokensDone() {
        console.log('no more tokens');
    }

    handleNewToken(token) {
        console.log('New token:', token);
        // Add logic to update the messages area with the new token
    }

}

customElements.define('messages-area', MessagesArea);
