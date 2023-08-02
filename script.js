const chatInput = document.querySelector(".chat-input textarea");
const sendBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox")

let userMessage;
const API_KEY = "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";


const createChatLi = (message, className)=> {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p>${message}</p>` : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}

const generateResponse = async (incomingChatLi) => {
    const messageElement = incomingChatLi.querySelector('p');
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userMessage: messageElement.textContent }),
    };

    try {
        const response = await fetch('/api/generateText', requestOptions);
        const data = await response.json();
        messageElement.textContent = data.response;
    } catch (error) {
        messageElement.textContent = 'Something went wrong. Try again...';
    } finally {
        chatbox.scrollTo(0, chatbox.scrollHeight);
    }
};

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage) return;

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 700);
    chatInput.value = "";
}

sendBtn.addEventListener("click", handleChat)