// messagesArea.js
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
}

customElements.define('messages-area', MessagesArea);
