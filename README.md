# Student Score Analysis System

A web application for analyzing and visualizing student exam scores.

## Features

- Import exam scores from CSV file
- View student scores by registration number
- Analyze score distributions by subject
- View top 10 students in Group A

## Tech Stack

- Frontend: React, TypeScript, Chart.js
- Backend: NestJS, TypeScript, PostgreSQL
- Database: PostgreSQL


### Import Data Using pgAdmin

1. Install PostgreSQL and pgAdmin:

   - Download PostgreSQL from: https://www.postgresql.org/download/windows/
   - During installation, remember the password you set for the postgres user
   - pgAdmin will be installed automatically with PostgreSQL

2. Create Database:

   - Open pgAdmin
   - Right-click on "Databases" in the left sidebar
   - Select "Create" > "Database"
   - Name it "exam_scores"
   - Click "Save"

3. Import CSV using pgAdmin:
   - In pgAdmin, expand your "exam_scores" database
   - Right-click on "Tables"
   - Select "Import/Export"
   - In the Import dialog:
     - Set "Import/Export" to "Import"
     - Set "Filename" to your CSV file path
     - Set "Format" to "csv"
     - Set "Header" to "Yes"
     - Set "Delimiter" to ","
     - Set "Encoding" to "UTF8"
   - Click "OK" to import

### Import Data Using Backend Command

Alternatively, you can import data using the backend command:

1. Place your CSV file in the `backend/data` directory
2. Configure database connection in `backend/.env`:

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=exam_scores
```

3. Run the import command:

```bash
cd backend
npm run command import:exam-scores
```

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
# Import exam scores from CSV file
cd backend
npm run command import:exam-scores

# Or import sample data
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
