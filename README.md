# HotelProject

## Local setup

1. Install and start MySQL, then create the `HotelProject` database.
2. Copy `.env.example` to `.env` in the project root and enter your local MySQL username and password.
3. Start the backend from the `backend` directory with `gradlew bootRun` (Windows: `gradlew.bat bootRun`). Spring Boot reads the root `.env` file when started this way.
4. Start the frontend from the `frontend` directory with `npm install` and `npm run dev`.

`.env` is excluded from Git. Each computer needs its own local `.env`; GitHub does not provide repository secrets to a local `git pull`.
