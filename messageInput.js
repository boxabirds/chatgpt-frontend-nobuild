// messageInput.js
const messageInputTemplate = document.createElement('template');
messageInputTemplate.innerHTML = `
    <style>
        :host {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 24px;
            background-color: var(--red);
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
    <input type="text" id="messageInputField" placeholder="Type a message...">
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

    _handleKeyDown(event) {
        if (event.key === 'Enter') {
            this._dispatchMessageEvent();
        }
    }

    _handleClick() {
        this._dispatchMessageEvent();
    }

    _dispatchMessageEvent() {
        const messageEvent = new CustomEvent('message', { detail: this._messageInputField.value });
        this.dispatchEvent(messageEvent);
        this._messageInputField.value = '';
    }
}
customElements.define('message-input', MessageInput);
