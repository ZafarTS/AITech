// ==========================================
// AGROTAHLILCHI PHP CHATBOT INTEGRATION
// cPanel: https://zafarts.uz/my/chatbot.php
// ==========================================

// Configuration - ANIQ URL
const CHATBOT_API_URL = 'https://zafarts.uz/my/chatbot-api.php';

// Initialize on page load
window.addEventListener('load', async () => {
    await loadGreeting();
});

/**
 * Load greeting message from PHP API
 */
async function loadGreeting() {
    try {
        const response = await fetch(`${CHATBOT_API_URL}?action=greeting`);
        
        if (!response.ok) {
            throw new Error('API response not OK');
        }
        
        const data = await response.json();
        
        if (data.success && data.answer) {
            // Clear default message
            const messagesContainer = document.getElementById('chatMessages');
            messagesContainer.innerHTML = '';
            addMessage(data.answer, false);
        }
    } catch (error) {
        console.error('Greeting yuklanmadi:', error);
        // Keep default greeting if API fails
    }
}

/**
 * Send message to PHP API
 */
async function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addMessage(message, true);
    input.value = '';
    
    // Disable input while processing
    input.disabled = true;
    
    // Show typing indicator
    showTyping();
    
    try {
        // Send to PHP API
        const response = await fetch(`${CHATBOT_API_URL}?action=chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message })
        });
        
        if (!response.ok) {
            throw new Error('API response not OK');
        }
        
        const data = await response.json();
        
        // Hide typing
        hideTyping();
        
        if (data.success && data.answer) {
            // Add bot response
            addMessage(data.answer, false);
        } else {
            addMessage('❌ Javob olishda xatolik. Qayta urinib ko\'ring.', false);
        }
    } catch (error) {
        hideTyping();
        console.error('Chat xatosi:', error);
        addMessage('❌ Server bilan bog\'lanishda xatolik. Iltimos qayta urinib ko\'ring.', false);
    } finally {
        // Re-enable input
        input.disabled = false;
        input.focus();
    }
}

/**
 * Send quick message
 */
function sendQuickMessage(keyword) {
    const input = document.getElementById('chatInput');
    input.value = keyword;
    sendMessage();
}

/**
 * Add message to chat
 */
function addMessage(text, isUser) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : ''}`;
    
    messageDiv.innerHTML = `
        <div class="message-avatar">${isUser ? 'Siz' : 'AI'}</div>
        <div class="message-content">${text}</div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

/**
 * Show typing indicator
 */
function showTyping() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
        indicator.classList.add('active');
    }
    const messagesContainer = document.getElementById('chatMessages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

/**
 * Hide typing indicator
 */
function hideTyping() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
        indicator.classList.remove('active');
    }
}

/**
 * Handle Enter key
 */
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}
