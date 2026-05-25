# 신항만 가스 홈페이지

부산 사하구 신평동에 위치한 **신항만 가스**의 정적 홈페이지입니다.

## 기술 스택

- Astro
- HTML/CSS/JavaScript
- Nginx
- Docker
- Render Docker Web Service

## 주요 페이지

| 페이지 | URL | 설명 |
| --- | --- | --- |
| 홈 | `/` | 메인 페이지 |
| 회사소개 | `/about` | 회사 정보 |
| 제품 및 서비스 | `/products` | 취급 제품과 서비스 |
| 공지사항 | `/notices` | 정적 공지사항 |
| 안전수칙 | `/safety` | 가스 안전 사용 수칙 |
| 오시는 길 | `/location` | 위치와 연락처 |

문의 저장, DB 기반 공지사항, 조회수 증가 같은 서버 동적 기능은 제거했습니다. 연락은 전화 링크와 오시는 길 페이지를 사용합니다.

## 프로젝트 구조

```text
sinhangman_gas/
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── render.yaml
├── package.json
├── package-lock.json
├── astro.config.mjs
├── public/
│   ├── css/style.css
│   ├── js/main.js
│   ├── images/
│   ├── robots.txt
│   └── sitemap.xml
└── src/
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
```

## 로컬 실행

```bash
npm install
npm run dev
```

정적 빌드:

```bash
npm run build
```

빌드 결과 미리보기:

```bash
npm run preview
```

## Docker 실행

```bash
docker build -t sinhangman-gas .
docker run --rm -p 8080:8080 sinhangman-gas
```

Docker Compose:

```bash
docker-compose up --build
```

접속 주소:

```text
http://localhost:8080
```

## 배포

Render에서는 `render.yaml`을 사용해 Docker Web Service로 배포합니다.

홈서버에서는 리버스 프록시 서버가 실제 서비스 서버의 컨테이너 `8080` 포트로 프록시하면 됩니다.

```text
Internet
→ reverse proxy server
→ service server
→ sinhangman-gas container:8080
```
