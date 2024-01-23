const messageInputTemplate = document.createElement('template');
messageInputTemplate.innerHTML = `
    <style>
        :host {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 24px;
            margin: var(--margin);
        }
        #messageInputField {
            flex-grow: 1;
            margin-right: var(--padding);
        }
        #sendButton {
            width: 80px;
        }
    </style>
    <input type="text" id="messageInputField" placeholder="" focus="true" autocomplete="off">
    <button id="sendButton">Send</button>
`;

class MessageInput extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(messageInputTemplate.content.cloneNode(true));

        this._messageInputField = shadowRoot.querySelector('#messageInputField');
        this._sendButton = shadowRoot.querySelector('#sendButton');

        this._messageInputField.addEventListener('keydown', this._handleKeyDown.bind(this));
        this._sendButton.addEventListener('click', this._handleClick.bind(this));        
    }

    init(worker) {
        this.worker = worker;
    }

    handleMessageSent() {
        this._messageInputField.value = '';
        this._sendButton.removeAttribute('disabled');
    }

    _handleKeyDown(event) {
        if (event.key === 'Enter') {
            this._handleNewChatMessage();
        }
    }

    _handleClick() {
        this._handleNewChatMessage();
    }

    _handleNewChatMessage() {
        this._sendButton.setAttribute('disabled', 'disabled');
        this.worker.postMessage({ type: 'chatMessage', message: this._messageInputField.value });
    }
}
customElements.define('message-input', MessageInput);
