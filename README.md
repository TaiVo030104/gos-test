# Student Score Analysis System

A web application for analyzing and visualizing student exam scores.

## Features

- View student scores by registration number
- Analyze score distributions by subject
- View top 10 students in Group A

## Tech Stack

- Frontend: React, TypeScript, Chart.js
- Backend: NestJS, TypeScript, PostgreSQL
- Database: PostgreSQL

## Setup

1. Install dependencies:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```
2. Run Docker

```bash
docker compose up -d
```

3. Configure database:

- Create a PostgreSQL database
- Update database configuration in `backend/src/app.module.ts`

4. Import data:

```bash
cd backend
npm run command seed:csv
```

5. Start the application:

```bash
# Start backend (from backend directory)
npm run start:dev

# Start frontend (from frontend directory)
npm start
```

The application will be available at:

- Frontend: http://localhost:3000
- Backend: http://localhost:9000

## API Endpoints

- `GET /api/students/score?sbd={registration_number}` - Get student scores
- `GET /api/students/subject-statistics` - Get subject statistics
- `GET /api/students/top-10-group-a` - Get top 10 Group A students
![image](https://github.com/user-attachments/assets/a3529a7d-af76-4ca4-a101-fecb2306050e)
![image](https://github.com/user-attachments/assets/71167325-6c7e-4e47-9bbc-950af8798fa7)
![image](https://github.com/user-attachments/assets/5831628a-e98c-44dd-9929-f4a332903c0c)

