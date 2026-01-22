EduChat AI is a web-based chatbot designed specifically to answer science-related questions with high accuracy and consistency. It leverages Gemini AI for generating responses and is built with a modern full-stack architecture using React (Yarn) for the frontend and Django for the backend.

The system supports persistent chat sessions, allowing users to continue conversations without losing context, and uses a Django queue–based background processing mechanism to handle AI requests asynchronously, ensuring the application remains responsive under load.

This project focuses on reliability, clean separation of concerns, and real-world backend practices such as async task handling and session management — without relying on Docker or containerization.

Key Features

Science-only AI chatbot (domain-restricted)

Powered by Gemini AI for natural language responses

Persistent chat sessions

Non-blocking request handling using Django queues

React frontend managed with Yarn

REST-based communication between frontend and backend

Clean and extensible project structure

Tech Stack

Frontend

React

Yarn

Backend

Django

Django session management

Queue-based async task processing

AI

Gemini AI (via API)

====================================================================================

Installation & Setup
Prerequisites

Make sure you have the following installed:

Node.js (v18+ recommended)

Yarn

Python 3.10+

pip

Git

Step 1: Clone this repo

Step 2 (Frontend Setup):
cd frontend
yarn install

Start the frontend: yarn start

Frontend will run on: http://localhost:5173

Step 3 (Backend Setup):
cd backend
python -m venv venv
source venv/bin/activate # Linux/macOS # venv\Scripts\activate # Windows

pip install -r requirements.txt

Create a file named: .env.local

Add your Gemini API key in the create .env.local: GEMINI_API_KEY=your_secret_key_here

Apply migrations: python manage.py migrate

Run the server: python manage.py runserver

Backend will run on: http://localhost:8000

=============================================================================

Notes

Never commit API keys or secrets to the repository. Always use environment variables for sensitive configuration.

Your Gemini API key is required for the chatbot to function.

Chat sessions are stored server-side to maintain conversation context.
