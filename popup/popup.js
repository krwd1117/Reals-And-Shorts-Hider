document.addEventListener('DOMContentLoaded', () => {
    const youtubeToggle = document.getElementById('youtube-toggle');
    const instagramToggle = document.getElementById('instagram-toggle');
    const statusText = document.getElementById('status-text');

    // Load saved states
    chrome.storage.sync.get(['youtubeHider', 'instagramHider'], (result) => {
        youtubeToggle.checked = result.youtubeHider !== false;
        instagramToggle.checked = result.instagramHider !== false;
        updateStatusText();
    });

    youtubeToggle.addEventListener('change', () => {
        chrome.storage.sync.set({ youtubeHider: youtubeToggle.checked });
        updateStatusText();
    });

    instagramToggle.addEventListener('change', () => {
        chrome.storage.sync.set({ instagramHider: instagramToggle.checked });
        updateStatusText();
    });

    function updateStatusText() {
        if (youtubeToggle.checked || instagramToggle.checked) {
            statusText.textContent = '작동 중';
            statusText.style.color = '#188038';
        } else {
            statusText.textContent = '중지됨';
            statusText.style.color = '#d93025';
        }
    }
});
