# 신항만 가스 홈페이지

부산 사하구 신평동에 위치한 **신항만 가스**의 공식 홈페이지입니다.

## 📋 프로젝트 소개

신항만 가스는 LPG 가스 판매 및 배달 서비스를 제공하는 전문 업체입니다. 
이 웹사이트는 Spring Boot와 Thymeleaf를 사용하여 구축되었습니다.

## 🚀 주요 기능

- **홈페이지**: 회사 소개 및 주요 서비스 안내
- **회사소개**: 비전, 미션, 서비스 지역 정보
- **제품 및 서비스**: 다양한 LPG 제품 및 서비스 안내
- **공지사항**: 새로운 소식 및 공지사항 게시
- **안전수칙**: 가스 안전 사용 수칙 및 대처 방법
- **문의하기**: 온라인 문의 양식
- **오시는 길**: 위치 정보 및 찾아오시는 방법

## 🛠 기술 스택

### Backend
- **Spring Boot 3.2.1**
- **Spring MVC**
- **Spring Data JPA**
- **Java 17**

### Frontend
- **Thymeleaf**
- **HTML5 / CSS3**
- **JavaScript (Vanilla)**

### Database
- **H2 Database** (개발용)

### Build Tool
- **Gradle**

## 📦 프로젝트 구조

```
sinhangman_gas/
├── src/
│   ├── main/
│   │   ├── java/com/sinhangman/gas/
│   │   │   ├── SinhangmanGasApplication.java
│   │   │   ├── controller/
│   │   │   │   ├── HomeController.java
│   │   │   │   ├── NoticeController.java
│   │   │   │   └── InquiryController.java
│   │   │   ├── service/
│   │   │   │   ├── NoticeService.java
│   │   │   │   └── InquiryService.java
│   │   │   ├── repository/
│   │   │   │   ├── NoticeRepository.java
│   │   │   │   └── InquiryRepository.java
│   │   │   ├── model/
│   │   │   │   ├── Notice.java
│   │   │   │   └── Inquiry.java
│   │   │   └── config/
│   │   │       └── DataInitializer.java
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── static/
│   │       │   ├── css/style.css
│   │       │   └── js/main.js
│   │       └── templates/
│   │           ├── layout/
│   │           ├── index.html
│   │           ├── about.html
│   │           ├── products.html
│   │           ├── safety.html
│   │           ├── notices/
│   │           ├── inquiry.html
│   │           └── location.html
│   └── test/
├── build.gradle
└── README.md
```

## 🔧 설치 및 실행 방법

### 필수 요구사항
- **JDK 17 이상**
- **Gradle 8.5 이상** (또는 Gradle Wrapper 사용)

### 1. 프로젝트 클론 또는 다운로드

```bash
cd /Users/2sssg/workspace2/sinhangman_gas
```

### 2. 프로젝트 빌드

```bash
./gradlew build
```

Windows의 경우:
```bash
gradlew.bat build
```

### 3. 애플리케이션 실행

```bash
./gradlew bootRun
```

또는

```bash
java -jar build/libs/sinhangman-gas-0.0.1-SNAPSHOT.jar
```

### 4. 브라우저에서 접속

```
http://localhost:8080
```

## 🗄 데이터베이스

개발 환경에서는 **H2 인메모리 데이터베이스**를 사용합니다.

### H2 콘솔 접속
- URL: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:gasdb`
- Username: `sa`
- Password: (비워두기)

### 초기 데이터

애플리케이션 실행 시 `DataInitializer`를 통해 샘플 공지사항 데이터가 자동으로 생성됩니다.

## 📱 주요 페이지

| 페이지 | URL | 설명 |
|--------|-----|------|
| 홈 | `/` | 메인 페이지 |
| 회사소개 | `/about` | 회사 정보 |
| 제품 및 서비스 | `/products` | 제품 소개 |
| 공지사항 목록 | `/notices` | 공지사항 리스트 |
| 공지사항 상세 | `/notices/{id}` | 공지사항 상세 보기 |
| 안전수칙 | `/safety` | 가스 안전 사용 수칙 |
| 문의하기 | `/inquiry` | 온라인 문의 양식 |
| 오시는 길 | `/location` | 위치 정보 |

## 🎨 디자인 특징

- **모던하고 깔끔한 UI**: 현대적인 디자인 트렌드 반영
- **반응형 웹 디자인**: 모바일, 태블릿, 데스크톱 모두 지원
- **사용자 친화적**: 직관적인 네비게이션과 레이아웃
- **브랜드 컬러**: 다크 그레이 (#1f2937, #374151)와 오렌지 액센트 (#f97316)

## 📞 연락처

- **상호**: 신항만 가스
- **주소**: 부산 사하구 을숙도대로677번길 11 (부산 사하구 신평동 568-4)
- **전화**: 010-5513-3481
- **영업시간**: 
  - 평일: 07:30 - 17:30
  - 토요일: 07:30 - 13:00
  - 일요일 및 공휴일: 휴무

## 🔐 보안 설정

운영 환경 배포 시 다음 사항들을 변경해야 합니다:

1. **application.properties** 설정 변경
   - H2 대신 MySQL/PostgreSQL 등 운영 DB 사용
   - H2 콘솔 비활성화 (`spring.h2.console.enabled=false`)
   - JPA DDL 설정 변경 (`spring.jpa.hibernate.ddl-auto=validate`)

2. **데이터베이스 보안**
   - 강력한 DB 비밀번호 설정
   - 환경 변수 또는 외부 설정 파일 사용

3. **HTTPS 적용**
   - SSL/TLS 인증서 설정
   - 포트 443 사용

## 🚀 배포

### Docker를 사용한 로컬 테스트

#### 방법 1: Docker 직접 빌드 및 실행

```bash
# Docker 이미지 빌드
docker build -t sinhangman-gas .

# Docker 컨테이너 실행
docker run -p 8080:8080 sinhangman-gas
```

#### 방법 2: Docker Compose 사용

```bash
# 빌드 및 실행
docker-compose up --build

# 백그라운드 실행
docker-compose up -d

# 중지
docker-compose down
```

### Render.com 배포 방법

#### 1. Render Dashboard 접속
- https://dashboard.render.com 로그인

#### 2. New Web Service 생성
- "New +" 클릭 → "Web Service" 선택
- GitHub 저장소 연결: `Esssg/sinhangman_gas`

#### 3. 배포 설정
```yaml
Name: sinhangman-gas
Runtime: Docker
Branch: master
Region: Singapore (또는 선호하는 지역)
Instance Type: Free
```

#### 4. 환경 변수 설정 (선택사항)
```
SPRING_PROFILES_ACTIVE=prod
JAVA_OPTS=-Xmx512m -Xms256m
```

#### 5. 배포 실행
- "Create Web Service" 클릭
- 자동으로 Docker 이미지 빌드 및 배포
- 배포 완료 후 제공된 URL로 접속

### 배포 특징

- ✅ **자동 배포**: GitHub master 브랜치에 푸시하면 자동으로 재배포
- ✅ **멀티 스테이지 빌드**: 최적화된 Docker 이미지
- ✅ **Health Check**: 자동 헬스 체크로 안정성 확보
- ✅ **환경 분리**: production 프로파일 사용

## 📝 개발 가이드

### 새로운 페이지 추가하기

1. **Controller 생성**: `controller/` 폴더에 새 컨트롤러 추가
2. **Template 생성**: `templates/` 폴더에 새 HTML 파일 추가
3. **Navigation 업데이트**: `layout/navigation.html`에 메뉴 항목 추가

### 공지사항 관리

현재는 초기 데이터만 생성됩니다. 관리자 페이지를 추가하여 공지사항을 CRUD 할 수 있습니다.

## 🐛 문제 해결

### 포트 충돌 시
`application.properties`에서 포트 변경:
```properties
server.port=8081
```

### 빌드 오류 시
```bash
./gradlew clean build --refresh-dependencies
```

## 📄 라이센스

이 프로젝트는 신항만 가스의 소유입니다.

## 🤝 기여

문의사항이나 개선 제안이 있으시면 연락 주시기 바랍니다.

---

© 2026 신항만 가스. All rights reserved.

