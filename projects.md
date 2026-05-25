# 프로젝트 구조 설명

## 개요

이 프로젝트는 `신항만 가스`의 정적 홈페이지다. 기존 Spring Boot + Thymeleaf 구조에서 Astro + Nginx + Docker 구조로 전환되어, 빌드 시점에 생성된 HTML/CSS/JavaScript를 Nginx가 서빙한다.

서버 사이드 동적 기능은 없다. 문의 저장, H2 DB, JPA, Thymeleaf 렌더링, 공지사항 조회수 증가 기능은 제거되었다.

## 기술 스택

- Astro
- HTML/CSS/JavaScript
- Nginx
- Docker
- Render Docker Web Service

## 루트 구조

```text
sinhangman_gas/
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── render.yaml
├── package.json
├── package-lock.json
├── astro.config.mjs
├── README.md
├── plans.md
├── projects.md
├── public/
└── src/
```

- `package.json`: Astro 실행, 빌드, preview 스크립트와 의존성을 정의한다.
- `astro.config.mjs`: Astro 사이트 설정이다.
- `Dockerfile`: Node 22로 Astro를 빌드한 뒤 Nginx unprivileged 이미지에서 정적 파일을 서빙한다.
- `nginx.conf`: 컨테이너 내부 `8080` 포트에서 `dist` 결과물을 서빙하는 Nginx 설정이다.
- `docker-compose.yml`: 로컬 Docker 실행과 헬스 체크 설정이다.
- `render.yaml`: Render Docker Web Service 배포 설정이다.

## 소스 구조

```text
src/
├── components/
│   ├── Footer.astro
│   └── Navigation.astro
├── layouts/
│   └── BaseLayout.astro
└── pages/
    ├── index.astro
    ├── about.astro
    ├── products.astro
    ├── safety.astro
    ├── location.astro
    └── notices/
        ├── index.astro
        ├── welcome.astro
        ├── safety-guide.astro
        └── holiday-delivery.astro
```

- `Navigation.astro`: 공통 상단 내비게이션이다. `/inquiry` 링크는 제거했다.
- `Footer.astro`: 공통 푸터다. 문의는 전화와 오시는 길로 유도한다.
- `BaseLayout.astro`: 일반 하위 페이지의 공통 HTML head, 내비게이션, 푸터, CSS/JS 로딩을 담당한다.
- `index.astro`: 메인 페이지다. 기존 인트로 애니메이션 DOM 구조를 유지하기 위해 별도 HTML 문서 구조를 사용한다.
- `notices/`: DB 없이 정적으로 작성한 공지사항 목록과 상세 페이지다.

## 정적 자산 구조

```text
public/
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/
├── robots.txt
└── sitemap.xml
```

- `public/css/style.css`: 기존 스타일을 정적 사이트 구조에 맞게 사용한다.
- `public/js/main.js`: 인트로 애니메이션, 지도 표시 전환, 제품 카테고리 토글 등 클라이언트 동작을 담당한다.
- `public/images/`: 화면에 쓰이는 이미지다. 배포 경로 문제를 줄이기 위해 주요 참조 이미지는 ASCII 파일명으로 복사해 사용한다.

## 라우팅

| URL | 파일 | 설명 |
| --- | --- | --- |
| `/` | `src/pages/index.astro` | 메인 페이지 |
| `/about` | `src/pages/about.astro` | 회사소개 |
| `/products` | `src/pages/products.astro` | 제품 및 서비스 |
| `/notices` | `src/pages/notices/index.astro` | 정적 공지사항 목록 |
| `/notices/welcome` | `src/pages/notices/welcome.astro` | 공지 상세 |
| `/notices/safety-guide` | `src/pages/notices/safety-guide.astro` | 공지 상세 |
| `/notices/holiday-delivery` | `src/pages/notices/holiday-delivery.astro` | 공지 상세 |
| `/safety` | `src/pages/safety.astro` | 안전수칙 |
| `/location` | `src/pages/location.astro` | 오시는 길 |

## 빌드와 런타임

개발/빌드:

```bash
npm install
npm run build
```

Docker 런타임:

```text
Node 22 build stage
→ npm ci
→ npm run build
→ dist 생성
→ Nginx runtime stage
→ /usr/share/nginx/html 서빙
```

컨테이너 내부 포트는 `8080`이다.

## 배포 구조

Render:

```text
Git push
→ Render Docker build
→ Astro build
→ Nginx container
→ healthCheckPath: /
```

홈서버:

```text
Internet
→ reverse proxy server
→ service server
→ sinhangman-gas container:8080
```

정적 사이트이므로 애플리케이션 서버 세션, DB 연결, `X-Forwarded-*` 헤더 처리는 필요하지 않다.
