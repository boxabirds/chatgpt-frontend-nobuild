// The controller wires up all the components and workers together, 
// managing the dependencies. A kind of "DI" class. 
const worker = new Worker('model-worker.js');

const messagesArea = document.querySelector('messages-area');
messagesArea.init(worker);

// Initialize the messageInput component and pass the worker to it
const messageInput = document.querySelector('message-input');
messageInput.init(worker);
messageInput.setMessagesArea(messagesArea);

// Event listeners for worker messages
worker.onmessage = function(event) {
    const { type, payload } = event.data;
    switch (type) {
        case 'messageSent':
            messageInput.handleMessageSent();
            break;
        case 'newToken':
            messagesArea.handleNewToken(payload.token);
            break;
        case 'tokensDone':
            messagesArea.handleTokensDone();
            break;
        default:
            console.error('Unknown event type from worker:', type);
    }
};
