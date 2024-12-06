document.addEventListener('DOMContentLoaded', () => {
    const groupNameInput = document.getElementById('groupName');
    const addGroupButton = document.getElementById('addGroup');
    const groupList = document.getElementById('groupList');

    // Carregar grupos salvos
    chrome.storage.sync.get(['groups'], (result) => {
        const groups = result.groups || [];
        groups.forEach(addGroupToList);
    });

    // Adicionar grupo à lista e salvar
    addGroupButton.addEventListener('click', () => {
        const name = groupNameInput.value.trim();
        if (name) {
            chrome.storage.sync.get(['groups'], (result) => {
                const groups = result.groups || [];
                groups.push(name);
                chrome.storage.sync.set({ groups }, () => {
                    addGroupToList(name);
                    groupNameInput.value = '';
                });
            });
        }
    });

    // Função para adicionar grupo à lista no DOM
    function addGroupToList(name) {
        const li = document.createElement('li');
        li.textContent = name;
        groupList.appendChild(li);
    }
});
