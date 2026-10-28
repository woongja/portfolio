# woongjae-portfolio

이웅재 포트폴리오 · https://woongjae.vercel.app/

## 구조
- `src/index.template.html` — 페이지 본문 + 기본 CSS (테마 자리표시자 포함)
- `src/themes/*.css` — 테마별 덮어쓰기 CSS (첫 줄 `/* @fonts <Google Fonts URL> */`)
  - `clay.css` 클레이모피즘 (기본)
  - `brutal.css` 뉴브루탈리즘
- `build.js` — 템플릿 + 테마를 합쳐 `index.html` 생성
- `index.html` — 빌드 결과물 (커밋된 복사본은 기본 테마)

## 테마 바꾸기
- 로컬: `node build.js` (기본 clay) 또는 `THEME=brutal node build.js`
  - Windows PowerShell: `$env:THEME="brutal"; node build.js`
- Vercel: Project → Settings → Environment Variables 에 `THEME` = `brutal` 또는 `clay` 추가 후 Redeploy.
  변수가 없으면 clay 로 빌드됩니다.

## 내용 수정
본문/문구는 `src/index.template.html` 에서 고치고 `node build.js` 를 실행하세요. (`index.html` 을 직접 고치면 다음 빌드 때 덮어써집니다.)
