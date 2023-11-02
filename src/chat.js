let recognition = null;
let words = null;
let p = null;
//let recordingResult = "";
/* global webkitSpeechRecognition */



function setupSpeechRecognition() {
    if (recognition) {
        recognition.stop();
    }
    recognition = new webkitSpeechRecognition();


    words = document.querySelector(".words");
    p = document.createElement("p");
    words.appendChild(p);

    recognition.interimResults = true;
    recognition.lang = "cmn-Hant-TW";
    recognition.continuous = true;

    recognition.addEventListener("result", e => {
        const isFinal = e.results[0].isFinal;
        const transcript = e.results[0][0].transcript;

        if (isFinal) {
            p.textContent = transcript;
            //recordingResult += transcript + " ";
            sendMessage(transcript);
            recognition.stop();
        }

    });

    recognition.addEventListener("end", () => {
        recognition.stop();
    });

    recognition.start();
    console.log("Recognizing");
}



function sendMessage(text) {
    const userMessage = text;
    if (!userMessage) {
        console.error("Input element not found");
        return;
    }

    console.log("userMessage: " + userMessage);

    const requestData = {
        messages: [
            { isbot: "false", msg: userMessage }
        ],
        model: "llama2-7b-chat-b5.0.0"
    };

    const apiUrl = 'http://localhost:3001/chat';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 53b3ade61f0d840bf6986d59a2581b98c71e5b4f953c55c80bd4bd45d8fb14b2'
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestData)
    })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Request failed with status: ' + response.status);
            }
        })
        .then(data => {
            const chatHistory = document.getElementById('chat-history');
            if (data.status === 'success') {
                console.log("data.output: " + data.output);
                textToSpeech(data.output);
                chatHistory.innerHTML += `<p class="your-message">You: ${userMessage}</p>`;
                chatHistory.innerHTML += `<p class="bot-message">Bot: ${data.output}</p>`;
            } else {
                chatHistory.innerHTML += `<p class="your-message">You: ${userMessage}</p>`;
                chatHistory.innerHTML += `<p class="bot-message">Bot: No response from the server.</p>`;
            }

        })
        .catch(error => {
            console.error('Error:', error);
        });
    console.log(requestData)
    //console.log("data.output: " + data.output);

}

function textToSpeech(text) {
    if ('speechSynthesis' in window) {
        const msg = new SpeechSynthesisUtterance();
        msg.text = text;
        window.speechSynthesis.speak(msg);
    }
    else alert("Sorry, your browser doesn't support text to speech!");
}
export { recognition, setupSpeechRecognition };