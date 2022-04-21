# naver_game_javascript_crawler
자바스크립트(타입스크립트)를 이용한 네이버 게임라운지와 네이버 카페 게시글의 조회수, 좋아요, 댓글수 크롤러

## 사용 프레임워크
casperjs, puppeteer+typescript

## 개요
같은 기능을 두가지 버전으로 개발했으며 둘 중 하나만 사용하셔도 무방합니다.

## CasperJS
casperjs는 바닐라스크립트이기 때문에 casperjs 설치 후 단독 실행이 가능합니다.  
`casperjs cafe_post_info.js 매개변수url`

## Puppeteer
puppeteer의 경우 nodejs 라이브러리이므로 node 설치를 통해 필요 라이브러리 설치 후에 실행이 가능하며 추가로 타입스크립트를 적용해 구현했습니다.  
`ts-node cafe.ts 매개변수url`
  
설치한 nodejs 라이브러리
- `@types/puppeteer@5.4.5` -> puppeteer에 typescript 적용을 위해 필요한 라이브러리 (typescript 설정은 tsconfig.json 참고)
- `puppeteer@13.5.2` -> puppeteer 사용을 위한 라이브러리
- `ts-node@10.7.0` -> 타입스크립트 컴파일 및 실행에 필요한 라이브러리
- `typescript@4.6.3` -> 타입스크립트 사용을 위한 라이브러리
