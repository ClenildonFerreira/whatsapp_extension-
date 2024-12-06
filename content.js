chrome.storage.sync.get(['groups'], (result) => {
    const groups = result.groups || [];

    // Função para verificar se a mensagem contém um número
    function containsNumber(message) {
        return /\d/.test(message);
    }

    // Função para tocar um som de alerta
    function playAlertSound() {
        const audio = new Audio(chrome.runtime.getURL('alert.mp3'));
        audio.loop = true; // Configura o áudio para tocar em loop
        audio.play();
        return audio;
    }

    // Monitorar mensagens no DOM
    function monitorMessages() {
        // Substitua '.chat-title-class' e '.message-class' pelas classes corretas
        const chatTitles = document.querySelectorAll('.chat-title-class'); 
        const messages = document.querySelectorAll('.message-class');

        let audioPlaying = null;

        chatTitles.forEach((title, index) => {
            if (groups.includes(title.textContent)) {
                const message = messages[index];
                if (message && containsNumber(message.textContent)) {
                    if (!audioPlaying) {
                        audioPlaying = playAlertSound();
                    }
                } else {
                    if (audioPlaying) {
                        audioPlaying.pause();
                        audioPlaying = null;
                    }
                }
            }
        });
    }

    // Executar a função de monitoramento a cada intervalo de tempo
    setInterval(monitorMessages, 5000); // Verifica a cada 5 segundos
});
