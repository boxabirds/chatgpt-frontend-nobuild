let tokens = ['Good', ' morning', ' Mr', ' Plop', 'py', ', and', ' I', ' said" ', ' Good', ' morn', 'ing', ' Mrs',' Plop', 'py', '\n', "'", ' Oh', ' how', ' the', ' win', 'ter', ' even', 'ings', ' must', ' just', ' fly'];

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function processTokens() {
    for (const token of tokens) {
        await delay(Math.random() * 50 + 100); // Random delay between 100ms and 150ms
        postMessage({ type: 'newToken', payload: { token } });
    }
    postMessage({ type: 'tokensDone' });
}

self.onmessage = async function(event) {
    if (event.data.type === 'chatMessage') {
        console.log('Received chat message:', event.data.message);

        // Simulate sending the message to an HTTP endpoint
        await delay(1000); // Wait for 1 second

        // Notify that the chat message was sent
        postMessage({ type: 'messageSent' });

        // Start processing tokens
        await processTokens();
    }
};
