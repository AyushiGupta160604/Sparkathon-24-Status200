document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get('defaultFilter', (data) => {
        const defaultFilter = data.defaultFilter || "";
        document.getElementById('defaultFilter').value = defaultFilter;
    });

    document.getElementById('saveBtn').addEventListener('click', () => {
        const selectedFilter = document.getElementById('defaultFilter').value;
        chrome.storage.sync.set({ defaultFilter: selectedFilter }, () => {
            alert('Default filter saved.');
        });
    });
});