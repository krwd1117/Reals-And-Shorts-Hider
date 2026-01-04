let observer = null;

function enableHider() {
    // 1. CSS 스타일 주입
    if (!document.getElementById('reels-hider-style')) {
        const style = document.createElement('style');
        style.id = 'reels-hider-style';
        style.textContent = `
            /* 사이드바 릴스 링크 */
            a[href="/reels/"], 
            /* 탐색 페이지 릴스 및 일반 릴스 링크 */
            a[href*="/reels/"],
            /* 그리드 내 릴스 아이콘/마커 */
            div[aria-label="Reels"],
            /* 종종 릴스인 비디오 마커 */
            svg[aria-label="Reels"],
            /* JS로 숨겨진 요소 */
            .gemini-reels-hidden {
                display: none !important;
            }
        `;
        document.documentElement.appendChild(style);
    }

    // 2. 동적 정리 실행
    dynamicCleanup();

    // 3. 옵저버 시작
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
    // 1. 스타일 제거
    const style = document.getElementById('reels-hider-style');
    if (style) style.remove();

    // 2. JS로 추가한 클래스 제거
    document.querySelectorAll('.gemini-reels-hidden').forEach(el => {
        el.classList.remove('gemini-reels-hidden');
    });

    // 3. 옵저버 중지
    if (observer) {
        observer.disconnect();
        observer = null;
    }
}

function dynamicCleanup() {
    // 인스타그램은 매우 난독화된 클래스를 사용하므로 href와 aria-label에 의존합니다
    const links = document.querySelectorAll('a[href*="/reels/"]');
    links.forEach(link => {
        // 독립적인 릴스 링크인지 그리드의 일부인지 확인
        const gridItem = link.closest('div[style*="padding-top: 100%"]') || link.parentElement;
        if (gridItem && gridItem.tagName === 'DIV') {
            // 순수하게 릴스인지 확인
            if (link.href.includes('/reels/')) {
                // gridItem.classList.add('gemini-reels-hidden'); // 필요 시 주석 해제하여 사용
            }
        }
    });

    // 사이드바 전용
    const sidebarLink = document.querySelector('a[href="/reels/"]');
    if (sidebarLink) {
        const sidebarItem = sidebarLink.closest('div[role="presentation"]') || sidebarLink.parentElement;
        if (sidebarItem) sidebarItem.classList.add('gemini-reels-hidden');
    }
}

// 초기 로드 시 상태 확인
chrome.storage.sync.get('instagramHider', (result) => {
    if (result.instagramHider !== false) {
        enableHider();
    }
});

// 설정 변경 감지 (실시간 토글)
chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'sync' && changes.instagramHider) {
        if (changes.instagramHider.newValue !== false) {
            enableHider();
        } else {
            disableHider();
        }
    }
});

console.log("Instagram Reels Hider Loaded");
