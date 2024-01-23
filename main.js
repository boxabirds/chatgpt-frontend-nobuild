// main.js
// Create a new instance of the worker
const worker = new Worker('messageSender.js');

// Listen for the 'message' event
const messageInput = document.querySelector('message-input');
messageInput.addEventListener('message', function(event) {
    // Send the message to the worker
    worker.postMessage({ type: 'message', message: event.detail });
});

// Listen for the 'messageSent' event
worker.addEventListener('message', function(event) {
    if (event.data.type === 'messageSent') {
        console.log('Message sent');
        // Clear the input field
        const shadowRoot = messageInput.shadowRoot;
        const inputField = shadowRoot.querySelector('#messageInputField');
        inputField.value = '';
    }
});
