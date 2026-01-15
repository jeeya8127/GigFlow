🚀 Freelance Marketplace System (Full-Stack)
A high-performance Freelance Marketplace platform built using the MERN Stack (MongoDB, Express, React, Node.js). This project follows a strict RESTful API Architecture and emphasizes data integrity and secure session management.

🏗️ System Architecture: MVC Pattern
The backend is organized into a Model-View-Controller (MVC) design pattern to ensure clean separation of concerns and maintainability:

Models: Mongoose schemas defining the structure for Users, Gigs, and Bids.

Controllers: Contain the business logic, such as authentication, gig posting, and the atomic hiring process.

Routes: Dedicated modules that map specific API endpoints to their respective controller functions.

Middleware: Custom scripts for JWT authentication and error handling.

🔒 Advanced Security: JWT + HttpOnly Cookies
To mitigate common web vulnerabilities like Cross-Site Scripting (XSS), this project implements HttpOnly Cookies for authentication:

XSS Mitigation: Authentication tokens are stored in a cookie that is inaccessible via frontend JavaScript (document.cookie).

Automatic Headers: By setting withCredentials: true in the frontend, the browser automatically attaches the authentication token to every cross-origin request.

Strict Policies: Configured with sameSite: 'strict' to prevent unauthorized Cross-Site Request Forgery (CSRF).

📊 Core Entities & Relationships
User: Supports roles for Clients (Gig Owners) and Freelancers (Bidders).

Gig: Represents a job post with a budget, description, and status (open, assigned, or completed).

Bid: A proposal from a Freelancer linked to a specific Gig, containing an amount and a status (pending, hired, or rejected).

⚡ Atomic Hiring Workflow
The "Hire" logic is designed to be Atomic, ensuring the database remains consistent even if a request fails midway. When a freelancer is hired:

The selected Bid status is updated to hired.

Category,Method,Endpoint,Description,Auth Required
Auth,POST,/api/auth/register,Register a new user account.,No
Auth,POST,/api/auth/login,Authenticate and set HttpOnly Cookie.,No
Gigs,GET,/api/gigs,Fetch all Open gigs (supports ?search=).,No
Gigs,POST,/api/gigs,Create a new job post.,Yes (Client)
Bids,POST,/api/bids,Submit a proposal for an open gig.,Yes (Freelancer)
Bids,GET,/api/bids/:gigId,Retrieve all bids for a specific gig.,Yes (Owner)
Hiring,PATCH,/api/bids/:bidId/hire,Atomic logic to hire and close a gig.,Yes (Owner)

🚀 Local Installation
Clone the Repository:
git clone https://github.com/jeeya8127/GigFlow.git

Environment Variables: Create a .env file in the backend folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

Install Dependencies:
# Install backend deps
cd backend && npm install
# Install frontend deps
cd ../frontend && npm install
Run the App:
# Run backend
npm start
# Run frontend
npm run dev

All other Bids for that Gig are automatically updated to rejected.

The Gig status is transitioned from open to assigned.
