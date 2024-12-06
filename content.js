const audio = new Audio(chrome.runtime.getURL('alert.mp3'));
const playPromise = audio.play();

chrome.storage.sync.get(['groups'], (result) => {
    const groups = result.groups || [];

    // Função para verificar se a mensagem contém um número
    function containsNumber(message) {
        return /\d/.test(message);
    }


    function playAlertSound() {
        audio.loop = true;
        audio.play().catch(error => {
            console.error("Erro ao reproduzir áudio:", error);
        });
        return audio;
    }
    
    if (playPromise !== undefined) {
      playPromise.then(() => {
        // Reprodução iniciada
      }).catch(error => {
        console.error("Erro ao reproduzir áudio:", error);
      });
    }
    
    

    // Monitorar mensagens no DOM
    function monitorMessages() {
        // Use a classe que você encontrou para selecionar as mensagens
        const messages = document.querySelectorAll('._ak8q');

        let audioPlaying = null;

        messages.forEach((messageElement) => {
            const messageText = messageElement.textContent;
            if (containsNumber(messageText)) {
                if (!audioPlaying) {
                    audioPlaying = playAlertSound();
                }
            } else {
                if (audioPlaying) {
                    audioPlaying.pause();
                    audioPlaying = null;
                }
            }
        });
    }

    // Executar a função de monitoramento a cada intervalo de tempo
    setInterval(monitorMessages, 5000); // Verifica a cada 5 segundos
});
