const HIDE_SELECTORS = [
    'ytd-guide-entry-renderer:has(a[href="/shorts/"])', // 사이드바
    'ytd-mini-guide-entry-renderer:has(a[href="/shorts/"])', // 미니 사이드바
    'ytd-rich-shelf-renderer[is-shorts]', // 홈페이지 쇼츠 선반(섹션)
    'ytd-reel-shelf-renderer', // 검색 결과 쇼츠 선반
    'ytd-rich-item-renderer:has(ytd-shorts-lockup-view-model)', // 그리드 내 쇼츠 항목
    'ytd-video-renderer:has(a[href*="/shorts/"])', // 검색 결과의 개별 쇼츠
    '#shorts-container', // 쇼츠 플레이어 컨테이너
    'a[href^="/shorts/"]' // 쇼츠로 연결되는 모든 링크
];

let observer = null;

function enableHider() {
    // 1. CSS 스타일 주입
    if (!document.getElementById('shorts-hider-style')) {
        const style = document.createElement('style');
        style.id = 'shorts-hider-style';
        style.textContent = `
            ytd-guide-entry-renderer:has(a[href^="/shorts"]),
            ytd-mini-guide-entry-renderer:has(a[href^="/shorts"]),
            ytd-guide-entry-renderer:has(a[title="Shorts"]),
            ytd-guide-entry-renderer:has(a[title="쇼츠"]),
            ytd-mini-guide-entry-renderer:has(a[title="Shorts"]),
            ytd-mini-guide-entry-renderer:has(a[title="쇼츠"]),
            ytd-rich-shelf-renderer[is-shorts],
            ytd-reel-shelf-renderer,
            ytd-rich-item-renderer:has(ytd-shorts-lockup-view-model),
            ytd-video-renderer:has(a[href^="/shorts"]),
            #shorts-container,
            a[href^="/shorts"],
            .gemini-shorts-hidden {
                display: none !important;
            }
        `;
        document.documentElement.appendChild(style);
    }

    // 2. 동적 정리 함수 실행
    dynamicCleanup();

    // 3. 옵저버 시작 (이미 실행 중이면 무시)
    if (!observer) {
        observer = new MutationObserver(() => {
            dynamicCleanup();
        });
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    }
}

function disableHider() {
    // 1. 스타일 태그 제거
    const style = document.getElementById('shorts-hider-style');
    if (style) style.remove();

    // 2. JS로 숨긴 요소들의 클래스 제거
    document.querySelectorAll('.gemini-shorts-hidden').forEach(el => {
        el.classList.remove('gemini-shorts-hidden');
    });

    // 3. 옵저버 중지
    if (observer) {
        observer.disconnect();
        observer = null;
    }
}

function dynamicCleanup() {
    // 예비책: 사이드바 항목의 텍스트 내용 확인
    const sidebarItems = document.querySelectorAll('ytd-guide-entry-renderer, ytd-mini-guide-entry-renderer');
    sidebarItems.forEach(item => {
        const text = item.innerText;
        if (text && (text.includes('Shorts') || text.includes('쇼츠'))) {
            item.classList.add('gemini-shorts-hidden');
        }
    });

    // CSS 선택자로 쉽게 잡히지 않는 섹션 숨기기
    const shelves = document.querySelectorAll('ytd-rich-section-renderer');
    shelves.forEach(shelf => {
        const header = shelf.querySelector('#rich-shelf-header');
        if (header && (header.innerText.includes('Shorts') || shelf.querySelector('ytd-rich-shelf-renderer[is-shorts]'))) {
            shelf.classList.add('gemini-shorts-hidden');
        }
    });

    const items = document.querySelectorAll('ytd-grid-video-renderer');
    items.forEach(item => {
        if (item.querySelector('a[href^="/shorts/"]')) {
            item.classList.add('gemini-shorts-hidden');
        }
    });
}

// 초기 로드 시 상태 확인
chrome.storage.sync.get('youtubeHider', (result) => {
    if (result.youtubeHider !== false) {
        enableHider();
    }
});

// 설정 변경 감지 (실시간 토글)
chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'sync' && changes.youtubeHider) {
        if (changes.youtubeHider.newValue !== false) {
            enableHider();
        } else {
            disableHider();
        }
    }
});

console.log("YouTube Shorts Hider Loaded");
