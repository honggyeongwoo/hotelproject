# HotelProject

## 로컬 실행 방법

### 1. 데이터베이스 설정

MySQL을 설치하고 실행한 뒤 `HotelProject` 데이터베이스를 만듭니다. 아래 기본 설정의 `localhost`는 **현재 프로그램을 실행하는 PC**를 뜻합니다. 따라서 다른 PC에서 실행하면 그 PC의 MySQL을 바라봅니다.

### 2. 환경 변수 파일 만들기

프로젝트 루트에서 `.env.example`을 복사해 `.env` 파일을 만들고, MySQL 접속 정보를 입력합니다.

```powershell
Copy-Item .env.example .env
```

`.env.example`은 GitHub에 올라가는 작성 예시입니다. 실제 비밀번호는 각 PC의 `.env`에 입력합니다. `.env`는 Git에서 제외되므로 GitHub에 올라가지 않고, 다른 PC에서 `git pull`해도 자동으로 전달되지 않습니다.

### 3. 백엔드 실행

프로젝트의 `backend` 폴더에서 실행합니다.

```powershell
cd backend
.\gradlew.bat bootRun
```

백엔드는 루트 폴더의 `.env` 파일에서 `DB_URL`, `DB_USERNAME`, `DB_PASSWORD` 값을 읽습니다.

### 4. 프론트엔드 실행

새 터미널에서 `frontend` 폴더로 이동한 뒤 실행합니다.

```powershell
cd frontend
npm install
npm run dev
```

## 여러 PC에서 같은 데이터를 사용하려면

현재 `DB_URL`의 `localhost` 설정은 각 PC의 로컬 MySQL을 사용합니다. 여러 PC가 같은 데이터베이스를 써야 한다면 접근 가능한 별도 MySQL 서버를 준비하고, 각 PC의 `.env`에 그 서버 주소와 접속 정보를 설정해야 합니다. 비밀번호는 GitHub 저장소에 저장하지 마세요.
