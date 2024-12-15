# TripSync - a collaborative trip planning with friends!
![image](https://github.com/user-attachments/assets/c914943b-5ed8-4934-accf-5111e9040ff0)

## Tech Stack
- React
- Node.js
- Express.js
- PostgreSQL

## Setup Instructions
1. Clone the repository
2. Install backend dependencies: `cd backend && npm install`
3. Install frontend dependencies: `cd frontend && npm install`
4. Create a .env file in backend with:
- postgreSQL details:
  - DB_HOST
  - DB_USERNAME
  - DB_PORT
  - DB_PASSWORD
  - DB
- SMTP email details:
  - EMAIL_USER
  - EMAIL_PASS
  - SMPT_HOST
- JWT:
  - JWT_SECRET
6. Run backend: `npm run dev`
7. Run frontend: `npm run dev`
