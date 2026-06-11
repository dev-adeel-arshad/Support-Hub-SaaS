# SupportHub SaaS

SupportHub is a support ticket management system inspired by platforms like Zendesk, Freshdesk, and Jira Service Management.

The main purpose of this project is not only to build a SaaS-style application but also to learn and understand the libraries, tools, and services that are commonly used in modern MERN stack applications.

## Project Vision

Many developers learn libraries separately through tutorials. With SupportHub, my goal is to bring multiple technologies together in one project and understand:

* Why these libraries are used
* What problems they solve
* How they are used in real-world applications
* How different tools work together in a complete system

The application allows users to create support tickets, upload attachments, add comments, and track the progress of their issues.

Administrators can manage tickets, assign them, update their status, and monitor overall activity.

---

## Core Features

### Authentication & Authorization

* User Registration
* User Login
* Password Hashing
* JWT Authentication
* Cookie-Based Authentication
* Role-Based Access Control (RBAC)

### Ticket Management

* Create Support Tickets
* Generate Unique Ticket IDs
* Update Ticket Status
* Assign Tickets
* Track Ticket Progress
* Set Ticket Priority

### Comment System

* Add Comments
* View Discussions
* Communication Between Users and Support Staff

### File Upload Management

* Upload Attachments
* Cloud Storage Integration
* Support for Screenshots and Documents

### Administration

* Admin Dashboard
* Ticket Assignment
* User Management
* Status Monitoring

---

## Ticket Lifecycle

Open
→ In Progress
→ Resolved
→ Closed

---

## Technology Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Frontend

* React.js
* React Router
* Redux Toolkit
* React Query
* Axios

### Cloud Services

* Cloudinary

---

## Libraries and Tools

One of the main goals of this project is to gain practical experience with commonly used libraries and understand their purpose in real applications.

### Backend Libraries

#### Express

Used to build REST APIs and handle server-side logic.

#### Mongoose

Used for working with MongoDB through schemas and models.

#### JSON Web Token (JWT)

Used for authentication and authorization.

#### bcryptjs

Used to securely hash user passwords.

#### Zod

Used for request validation and data validation.

#### Multer

Used for handling file uploads.

#### Cookie Parser

Used for reading and managing cookies.

#### CORS

Used to control cross-origin requests.

#### Helmet

Used to improve application security through HTTP headers.

#### Express Rate Limit

Used to protect APIs from abuse and excessive requests.

#### Morgan

Used for request logging during development.

#### Dotenv

Used for managing environment variables.

#### NanoID

Used for generating unique and readable ticket IDs.

#### Day.js

Used for date formatting and manipulation.

---

## Planned Frontend Libraries

### React Router DOM

For client-side routing.

### Axios

For making API requests.

### Redux Toolkit

For global state management.

### React Query

For server state management and caching.

### React Hook Form

For handling forms efficiently.

### Zod Resolver

For integrating Zod validation with forms.

### React Toastify

For notifications and alerts.

### React Icons

For icons and UI enhancements.

### React Loading Skeleton

For loading placeholders.

### Recharts

For charts and dashboard analytics.

---

## Architecture

The application follows a modular MVC architecture:

Routes
→ Validation Layer
→ Controllers
→ Database Models

Additional layers include:

* Authentication Middleware
* Authorization Middleware
* Global Error Handling
* Validation Utilities
* Response Utilities
* Cloud Service Integrations

---
