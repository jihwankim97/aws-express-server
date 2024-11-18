# Express & Redis Demo

## Overview
Express.js와 Redis를 활용하여 간단한 RESTful API를 구현하는 실습 프로젝트입니다. Redis를 데이터베이스로 활용하여 메시지를 리스트 형태로 추가하고, 조회하는 기능을 포함합니다. 또한, Jest를 사용한 테스트 코드 작성도 실습하였습니다.

## 주요 기능
- 메시지를 Redis 리스트에 추가
- Redis 리스트에서 모든 메시지 가져오기
- Redis 데이터 초기화
- Jest를 활용한 간단한 단위 테스트 및 통합 테스트

## 기술 스택
- **Express.js**: 간단하고 빠른 Node.js 웹 프레임워크
- **Redis**: 고속 데이터 관리 및 리스트 데이터 구조 활용
- **Jest**: 테스트 코드 작성 및 실행을 위한 JavaScript 테스트 프레임워크

## 실행 방법

### 1. Redis 서버 실행
Redis가 설치되어 있다면 아래 명령어로 Redis 서버를 실행합니다:
```bash
redis-server --port 6379
```


Redis 서버를 실행한 후, Redis 클라이언트로 접속하여 연결 확인:
```bash
redis-cli -p 6380
auth test_env
ping
```
정상적으로 실행되었다면 PONG이 출력됩니다.

### 2. 프로젝트 의존성 설치
레포지토리를 클론한 후 의존성을 설치합니다:
```bash
git clone https://github.com/jihwankim97/express-redis-demo.git
cd express-redis-demo
npm install
```

### 3. 환경 변수 설정

프로젝트 실행 전에 필요한 환경 변수를 설정해야 합니다. 프로젝트 디렉토리에서 `.env.example` 파일을 복사하여 `.env` 파일을 생성하고, 필요한 값을 채워 넣습니다:

1. `.env` 파일 생성:
```bash
cp .env.example .env
```
.env 파일 열기 및 아래 내용을 추가:

```bash
PORT=4000
REDIS_URL=redis://localhost:6379
```
### 4. 프로젝트 실행
빌드

TypeScript 파일을 JavaScript로 빌드합니다:
```bash
npm run build
```

애플리케이션 실행

빌드된 애플리케이션을 실행합니다:
```bash
npm start

```

개발 모드 실행

개발 중에는 dev 스크립트를 실행하여 TypeScript 변경 사항을 자동으로 감지하고, 서버를 재시작합니다:
```bash
npm run dev

```

### 5. 테스트 실행

테스트 코드를 실행하기 전에, **테스트 전용 Redis 서버**를 실행해야 합니다. 테스트 환경에서 사용되는 Redis 데이터가 일반 실행 모드와 겹칠 경우 예상치 못한 충돌이나 오류가 발생할 수 있기 때문에, 테스트 전용 포트를 설정합니다.

1. 테스트용 Redis 서버 실행
실행중인 레디스 서버를 닫고 테스트 전용 Redis 서버를 실행합니다:
```bash
redis-server --port 6380 --requirepass test_env
```
2. Redis 서버 확인

Redis 서버가 제대로 실행되었는지 확인하려면 아래 명령어를 입력합니다:
```bash
redis-cli -p 6380
auth test_env
ping

```
3. 테스트 실행

테스트 코드를 실행하여 애플리케이션의 단위 테스트 및 통합 테스트를 확인합니다:
```bash
npm run test
```
💡 참고:
테스트는 포트 6380에서 실행되는 Redis 서버를 사용하며, 데이터를 초기화(flushDb())하여 독립적인 테스트 환경을 보장합니다.
테스트 실행이 완료되면 Redis 서버를 중지하여 리소스를 해제하는 것이 좋습니다:

```bash
redis-cli -p 6380 shutdown
```
💡 이유:
일반 모드에서 사용되는 Redis 데이터와 테스트 환경의 데이터가 섞이면 예상치 못한 오류가 발생할 수 있습니다.
이를 방지하기 위해 별도의 포트(예: 6380)와 비밀번호(test_env)를 사용하여 테스트 전용 Redis 서버를 실행합니다.
테스트는 Redis의 데이터를 초기화하며, 독립적으로 작동하도록 설계되었습니다.
