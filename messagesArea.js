const messagesAreaTemplate = document.createElement('template');
messagesAreaTemplate.innerHTML = `
    <style>
        :host {
            display: flex;
            flex-direction: column;
            height: 100%; /* Adjust as needed */
            overflow-y: auto; /* Makes the area scrollable */
        }
        #messages {
            display: flex;
            flex-direction: column;
            justify-content: flex-end; /* Align messages to the bottom */
            min-height: 100%; /* Ensure it takes the full height */
            margin: var(--margin);
        }
        .message {
            margin-bottom: var(--margin);
        }
    </style>
    <div id="messages"></div>
`;


class MessagesArea extends HTMLElement {
    constructor() {
        super();
        this.accumulatingMessage = '';

        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(messagesAreaTemplate.content.cloneNode(true));

        this.messages = shadowRoot.querySelector('#messages');
        this.createNewAccumulatingMessage();
    }

    createNewAccumulatingMessage() {
        this.accumulatingMessageEl = document.createElement('div');
        this.accumulatingMessageEl.classList.add('message');
        this.messages.appendChild(this.accumulatingMessageEl);
    }

    init(worker) {
        this.worker = worker;
    }

    handleTokensDone() {
        this.flushAccumulatingMessage();
    }

    handleNewToken(token) {
        this.accumulatingMessageEl.textContent += token;
        this.scrollToBottom();

        if (token === '\n') {
            this.flushAccumulatingMessage();
        }
    }

    scrollToBottom() {
        this.messages.scrollTop = this.messages.scrollHeight;
    }
    flushAccumulatingMessage() {
        this.createNewAccumulatingMessage();
        this.scrollToBottom();
    }
}

customElements.define('messages-area', MessagesArea);
