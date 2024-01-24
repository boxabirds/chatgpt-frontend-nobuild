## README.md for HTML+JavaScript Web Front-End Demo Using Web Components and Web Workers

### Overview
This project demonstrates a simple, no-build HTML and JavaScript web front-end using web components and web workers. It showcases a chat interface that can operate in two modes: a mock mode with simulated output and a live mode connected to the OpenAI API.

### Features
- **No-Build Requirement:** Runs directly in the browser without the need for a build step.
- **Web Components:** Utilizes custom web components for a modular and reusable structure.
- **Web Workers:** Leverages web workers for offloading tasks without blocking the UI.
- **Dual Mode Operation:** Supports both a mock mode for testing and an OpenAI connected mode.

### Prerequisites
- A modern web browser that supports HTML5 and JavaScript ES6.
- Python (for running a simple HTTP server).
- An OpenAI API key (for OpenAI mode).

### Installation
This is a no-build setup. No installation is required. Simply clone or download the repository to your local machine.

### Running the Application
While this is no-build, you can't open the files up directly due to CORS issues. I use python's built-in generic http server which is totally fine. 
1. **Start a Local Server:**
    ```bash
    python -m http.server
    ```
    This serves the application at `http://localhost:8000`.

2. **Access the Chat Page:**
   - **Mock Mode:** Navigate to `http://localhost:8000` to use the application in mock mode with simulated token streaming output.
   - **OpenAI Mode:** To use the OpenAI mode, append your OpenAI API key as a URL parameter: `http://localhost:8000/?openai-key=YOUR_API_KEY`.

### Structure
- `index.html`: The main HTML file that includes web component tags and links to JavaScript files.
- `styles.css`: Contains the global styling for the application.
- `controller.js`: Manages the interaction between web components and the web worker.
- `messageInput.js`: Defines the `message-input` custom web component for user input.
- `messagesArea.js`: Defines the `messages-area` custom web component for displaying messages.
- `model-worker.js`: A web worker script for handling message processing and API interactions.

### Web Components
- **Message Input:** A custom element for user input, handling message sending and UI updates.
- **Messages Area:** A custom element that displays chat messages and handles dynamic updates.

### Web Worker
- Handles asynchronous tasks such as fetching tokens and communicating with the OpenAI API, ensuring UI responsiveness.

### Usage Notes
- The application must be served from a web server; it cannot be run directly from the filesystem due to browser security restrictions.
- Ensure you have an active internet connection when using the OpenAI mode.
- Replace `YOUR_API_KEY` with a valid OpenAI API key in the URL parameter for OpenAI mode.

### Contributing
Contributions to improve the application or extend its capabilities are welcome. Please follow the standard fork-and-pull request workflow.

### License
This project is open-sourced and available under Apache 2.0.

### Contact
For any queries or suggestions, please contact julian.harris@gmail.com or raise an issue against the repository.

