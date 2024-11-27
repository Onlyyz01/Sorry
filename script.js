// States for button transitions
let states = [
    { text: "Sori po tlgaaa", button: "K lng" },
    { text: "Sorry po tlgaaa babi", button: "OK nga lng" },
    { text: "We ba? Sori na po kasi", button: "Ril, Ok lng" }
];

// Final message sequence
let finalMessages = [
    { message: "Sorry na po babiii", delay: 2000 },
    { message: "Sori po tlga, 'Di ko na po uulitin promiseee", delay: 3000 },
    { message: "Thought nag kakatuwaan lng tayo, Sori po tlga babii", delay: 3000 }
];

let currentIndex = 0;

const mainText = document.getElementById('main-text');
const gif = document.getElementById('center-gif');
const button = document.getElementById('action-button');
const finalMessage = document.getElementById('final-message');

// Typewriter function
function typeWriterEffect(message, element, callback) {
    let charIndex = 0;
    element.textContent = ""; // Clear any previous text
    element.style.display = "block"; // Make the element visible

    const typingInterval = setInterval(() => {
        if (charIndex < message.length) {
            element.textContent += message[charIndex];
            charIndex++;
        } else {
            clearInterval(typingInterval);
            if (callback) callback(); // Call the next step
        }
    }, 50); // Speed of typing
}

// Handle button click logic
button.addEventListener('click', () => {
    if (currentIndex < states.length) {
        mainText.textContent = states[currentIndex].text;
        button.textContent = states[currentIndex].button;
        currentIndex++;
    } else {
        // Start the final messages sequence
        button.remove();
        mainText.style.display = "none"; // Remove main text

        // Change GIF to the second one
        gif.src = "https://media1.tenor.com/m/n8Ql8FxaWTMAAAAd/kitten-love.gif";

        let messageIndex = 0;
        const showMessage = () => {
            if (messageIndex < finalMessages.length) {
                const { message, delay } = finalMessages[messageIndex];

                // Typewriter effect for current message
                typeWriterEffect(message, finalMessage, () => {
                    setTimeout(() => {
                        finalMessage.style.opacity = 0; // Fade out current message
                        setTimeout(() => {
                            finalMessage.style.display = "none"; // Hide after fade-out
                            messageIndex++;
                            showMessage(); // Show next message
                        }, 1000);
                    }, delay); // Delay before fading out
                });
                finalMessage.style.opacity = 1; // Fade in new message
            } else {
                // Final step: Enlarge GIF
                gif.style.width = "100vw";
                gif.style.height = "100vh";
            }
        };

        showMessage();
    }
});
