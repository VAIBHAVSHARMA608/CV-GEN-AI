# CV-GEN-AI
A full-stack resume builder with a React frontend and Express/MongoDB backend. Users fill in education, experience, skills, and personal details via dynamic forms. Data is stored in MongoDB using a well-defined Mongoose schema with sub‑documents for education and experience. 


✅ 1. Project Title & Overview
# AI‑Powered Resume Builder
A full‑stack app using React (frontend), Express/Mongoose (backend), and Puppeteer for PDF resume generation. Users input personal details, education, experience, and skills to get a downloadable, well‑styled PDF.

📋 2. Features
Dynamic form with multiple education & experience entries

Data persistence with MongoDB via Mongoose schemas

AI-enhanced resume suggestions (via OpenAI GPT)

Browser-based PDF generation with Puppeteer

Responsive UI powered by React and Tailwind/Bootstrap

⚙️ 3. Tech Stack
Frontend: React, Bootstrap/Tailwind CSS

Backend: Express, Mongoose, MongoDB

PDF: Puppeteer for HTML → PDF conversion

AI: OpenAI API integration

Dev tools: nodemon, dotenv

🚀 4. Getting Started
Clone and install:
bash
Copy
Edit
git clone <your-repo-url>
cd backend
npm install
cd ../frontend
npm install
Configure .env in backend:
env
Copy
Edit
MONGO_URI=mongodb://127.0.0.1:27017/myResumeDB
OPENAI_API_KEY=your_openai_key
PORT=4000
Build and run:
bash
Copy
Edit
# Frontend
cd frontend
npm run build

# Backend
cd ../backend
npm run dev
👉 5. Usage
Open http://localhost:4000/

Fill out the form and submit

View AI suggestions (optional)

Download your resume at /resume/pdf/<resumeId>

🌳 6. File Structure
txt
Copy
Edit
cv-builder/
├ backend/
│ ├ index.js
│ ├ models/Resume.js
│ └ package.json
└ frontend/
  ├ cv.html
  ├ cv.css
  └ (React or static files)
🛠️ 7. PDF Generation
Uses Puppeteer in Express to render your resume into a full‑style PDF. Triggered via /resume/pdf/:id, pulling data from MongoDB, converting to HTML, and returning the PDF.

⚙️ 8. AI Suggestions
(If implemented) Sends form data to OpenAI’s GPT‑3.5 endpoint to enhance resume entries before saving or generating.

💾 9. Database Schema
Main model fields:

fullName, email, phone

education: array with institution, degree, year

experience: array with role, company, duration, details

skills (String array), tenth, twelfth

declaration: Boolean

📃 10. Contributing
You're welcome to contribute!

Fork the repo

Create a feature branch

Commit changes & open a PR

⚖️ 11. License
Released under the MIT License.
