# Shorts & Reels Hider (쇼츠 & 릴스 차단기)

**YouTube Shorts**와 **Instagram Reels**를 화면에서 숨겨주는 크롬 확장 프로그램입니다.
무심코 숏폼 콘텐츠를 보며 낭비되는 시간을 줄이고, 디지털 웰빙을 실천하세요.

## ✨ 주요 기능

*   **YouTube Shorts 차단**:
    *   좌측 사이드바 및 미니 사이드바의 'Shorts(쇼츠)' 버튼 숨김
    *   홈 화면 및 검색 결과의 쇼츠 섹션(Shelf) 숨김
    *   동영상 그리드 내 쇼츠 영상 숨김
    *   한국어 UI("쇼츠") 및 영어 UI("Shorts") 모두 완벽 지원
*   **Instagram Reels 차단**:
    *   사이드바 및 탐색 탭의 릴스 아이콘 숨김
    *   피드 내 릴스 추천 게시물 숨김
*   **실시간 토글 (Real-time Toggling)**:
    *   페이지를 새로고침할 필요 없이, 팝업창에서 스위치만 끄고 켜면 즉시 적용됩니다.
*   **가벼운 성능**:
    *   브라우저의 기본 CSS 기능을 최대한 활용하여 성능 저하 없이 빠르게 작동합니다.

## 🛠 설치 방법 (개발자 모드)

이 프로젝트는 현재 소스 코드 형태로 제공됩니다. 크롬 브라우저에 직접 로드하여 사용할 수 있습니다.

1.  이 저장소를 다운로드하거나 클론(Clone)합니다.
2.  Chrome 브라우저를 열고 주소창에 `chrome://extensions`를 입력하여 이동합니다.
3.  우측 상단의 **'개발자 모드'** 스위치를 켭니다.
4.  좌측 상단의 **'압축해제된 확장 프로그램을 로드합니다'** 버튼을 클릭합니다.
5.  다운로드 받은 프로젝트 폴더(`shorts-reels-blocker`)를 선택합니다.
6.  설치 완료! 브라우저 툴바에 아이콘을 고정하여 사용하세요.

## 📖 사용 방법

1.  Chrome 툴바에서 **Shorts & Reels Hider** 아이콘을 클릭합니다.
2.  **YouTube Shorts 숨기기** 또는 **Instagram Reels 숨기기** 스위치를 조작합니다.
    *   **ON (초록색)**: 해당 플랫폼의 숏폼 콘텐츠가 숨겨집니다.
    *   **OFF (회색)**: 숏폼 콘텐츠가 다시 표시됩니다.
3.  설정 변경은 열려있는 탭에 **즉시 반영**됩니다.

## 📂 프로젝트 구조

```text
/
├── manifest.json        # 확장 프로그램 설정 파일 (Manifest V3)
├── icons/               # 아이콘 이미지 폴더
│   └── icon128.png      # 아이콘 이미지
├── popup/               # 팝업 UI 폴더
│   ├── popup.html       # 팝업 구조
│   ├── popup.css        # 팝업 스타일
│   └── popup.js         # 팝업 로직 (스토리지 저장)
└── scripts/             # 컨텐츠 스크립트 폴더
    ├── youtube.js       # 유튜브 차단 로직 (CSS 주입 + MutationObserver)
    └── instagram.js     # 인스타그램 차단 로직
```

## 💻 기술 스택

*   **Google Chrome Extension (Manifest V3)**
*   **HTML / CSS / JavaScript (Vanilla)**
*   **MutationObserver API**: 동적으로 로딩되는 SPA(Single Page Application) 콘텐츠 감지
*   **Chrome Storage API**: 사용자 설정 동기화 및 저장

## ⚠️ 주의 사항

*   YouTube나 Instagram의 웹사이트 구조(클래스명, 레이아웃 등)가 변경될 경우 차단 기능이 일시적으로 작동하지 않을 수 있습니다.
*   이 경우 업데이트가 필요할 수 있습니다.
