const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userMessage = input.value;
  appendMessage('user', userMessage);
  input.value = '';

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await response.json();
    appendMessage('bot', data.reply);
  } catch (error) {
    appendMessage('bot', 'Erro ao responder. Tente novamente mais tarde.');
  }
});

function appendMessage(sender, text) {
  const messageEl = document.createElement('div');
  messageEl.classList.add('message', sender);
  messageEl.textContent = text;
  chatBox.appendChild(messageEl);
  chatBox.scrollTop = chatBox.scrollHeight;
}
