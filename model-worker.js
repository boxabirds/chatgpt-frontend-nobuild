const MOCK_TOKENS = ['Good', ' morning', ' Mr', ' Plop', 'py', ',', 'and', ' I', ' said',  '\n', '"', 'Good', ' morn', 'ing', ' Mrs',' Plop', 'py', ,'"', '\n', 'Oh', ' how', ' the', ' win', 'ter', ' even', 'ings', ' must', ' just', ' fly'];
const API_URL = "https://api.openai.com/v1/engines/gpt-4-1106-preview/stream";

function mockDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function processMockTokens() {
    for (const token of MOCK_TOKENS) {
        await mockDelay(Math.random() * 50 + 50); // Random delay between 100ms and 150ms
        postMessage({ type: 'newToken', payload: { token } });
    }
    postMessage({ type: 'tokensDone' });
}

self.onmessage = async function(event) {
    if (event.data.type === 'chatMessage') {
        console.log('Received chat message:', event.data.message);

        const params = new URLSearchParams(window.location.search);
        const openaiApiKey = params.get('openapi-key');

        // MOCK
        if( openaiApiKey === null ) {
            // Simulate sending the message to an HTTP endpoint
            await mockDelay(1000); // Wait for 1 second

            // Notify that the chat message was sent
            postMessage({ type: 'messageSent' });

            // Start processing tokens
            await processMockTokens();

        // OPENAI
        } else {
            
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${openaiApiKey}`,
                },
                body: JSON.stringify({
                    model: "gpt-4-1106-preview",
                    messages: [{ role: "user", content: event.data.message }],
                    stream: true,
                }),
            });
        
            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");
            let resultText = "";
        
            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    break;
                }
                // lots of low-level OpenAI response parsing stuff
                const chunk = decoder.decode(value);
                const lines = chunk.split("\n");
                const parsedLines = lines
                    .map((line) => line.replace(/^data: /, "").trim()) // Remove the "data: " prefix
                    .filter((line) => line !== "" && line !== "[DONE]") // Remove empty lines and "[DONE]"
                    .map((line) => JSON.parse(line)); // Parse the JSON string
        
                for (const parsedLine of parsedLines) {
                    const { choices } = parsedLine;
                    const { delta } = choices[0];
                    const { content } = delta;
                    // Update the UI with the new content
                    if (content) {
                        postMessage({ type: 'newToken', payload: { token: content } });
                    }
                }
            }
        }
    }
};
