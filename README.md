AI-Powered Job Match Dashboard
Welcome to the AI-Powered Job Match Dashboard! This project is a web application built with Next.js, TypeScript, and Tailwind CSS. It allows users to sign up, view job recommendations, and see how well they match with each job based on their skills. The app also provides upskilling suggestions if the user is missing required skills for a job.

Features
1. User Signup
Users can sign up with their email, password, and skills.
Skills are stored as an array and used to calculate job match scores.
Loading and error states are handled during the signup process.

2. Job Recommendations
Displays a list of jobs fetched from a mock API.
Each job includes: Title, Company, Location, Salary, Required skills

3. Job Match Score
Calculates how well the user fits each job based on their skills.
Displays the match score as a progress bar and color-coded badge:
Green (80%+): Excellent fit.
Yellow (50-79%): Moderate fit.
Red (<50%): Poor fit.

4. Job Details Modal
Clicking on a job opens a modal with detailed information:
Job title, company, location, salary, and required skills.
Match score progress bar and badge.

5. Upskilling Suggestions
If the user is missing required skills for a job, an alert is shown with suggestions for upskilling.

6. Responsive Design
The UI is mobile-friendly and adapts well to different screen sizes.

Technologies Used
Frontend Framework: Next.js
Styling: Tailwind CSS
State Management: Context API
API Handling: Fetch
Type Checking: TypeScript

Setup Instructions
1. Clone the Repository
git clone https://github.com/your-username/job-match-dashboard.git
cd job-match-dashboard
2. Install Dependencies
npm install
3. Run the Development Server
npm run dev
4. Open the App
Visit http://localhost:3000 in your browser to view the app.

API Endpoints
1. Signup
URL: https://67bdb194321b883e790d8762.mockapi.io/api/elisha/v1/SignUp
Method: POST
Body:
{
  "email": "user@example.com",
  "password": "password123",
  "skills": ["React", "JavaScript"]
}
2. Fetch Jobs
URL: https://67bdb194321b883e790d8762.mockapi.io/api/elisha/v1/Job-Details
Method: GET

How It Works
Signup:
Users sign up with their email, password, and skills.
After signing up, they are redirected to the job page.

Job Page:
Displays a list of jobs fetched from the API.
Clicking a job opens a modal with job details and a match score.

Match Score:
Calculated based on the user’s skills and the job’s required skills.
Displayed as a progress bar and color-coded badge.

Upskilling Suggestions:
if the user is missing required skills, an alert is shown with suggestions.

