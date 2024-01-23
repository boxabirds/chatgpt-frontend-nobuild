// messageSender.js
self.addEventListener('message', function(event) {
    // Simulate sending the message to an HTTP endpoint
    setTimeout(function() {
        // Broadcast the 'messageSent' event
        self.postMessage({ type: 'messageSent' });
    }, 1000);
});
