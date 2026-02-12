# 🏥 Doctor Appointment System

> A scalable full-stack healthcare web application for booking and managing medical appointments with AI-powered symptom analysis and real-time notifications.

---

## 🚀 Overview

The **Doctor Appointment System** is a production-ready MERN stack application designed to streamline appointment scheduling between patients and doctors.  

It integrates **AI-based symptom analysis**, secure authentication, role-based dashboards, payment integration, and real-time notifications to enhance healthcare workflow efficiency.

---

## 🔥 Key Highlights

- 🤖 AI-based Symptom Checker (BERT NLP Model)
- 👥 Role-Based Access (Patient | Doctor | Admin)
- 📅 Smart Appointment Booking & Calendar View
- 🔔 Real-Time Email & SMS Notifications
- 💳 Online Payment Integration
- 📊 Admin Analytics Dashboard
- 🔐 JWT & OAuth2 Secure Authentication
- 🐳 Dockerized & Cloud Deployment Ready

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Redux Toolkit
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- RESTful APIs

### Database
- MongoDB
- Mongoose ODM

### AI / ML
- TensorFlow
- BERT NLP Model (Symptom Classification)

### Third-Party Integrations
- Twilio (SMS Alerts)
- Nodemailer (Email Notifications)
- Google Calendar API
- Razorpay / PayPal (Payments)

### DevOps & Deployment
- Docker
- AWS EC2
- GitHub Actions (CI/CD)

---

## 📸 Screenshots

> Add your real images inside `/screenshots` folder

```
/screenshots/dashboard.png
/screenshots/appointments.png
/screenshots/analytics.png
```

---

## 🏗️ System Architecture

- MVC structured backend
- Secure JWT middleware
- Role-based authorization
- AI microservice integration
- REST API communication
- Containerized deployment

---

## ⚙️ Installation Guide

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Ketan9548/Doctor_Appointment.git
cd Doctor_Appointment
```

---

### 2️⃣ Install Dependencies

#### Backend Setup
```bash
cd server
npm install
```

#### Frontend Setup
```bash
cd client
npm install
```

---

### 3️⃣ Configure Environment Variables

Create `.env` file inside `server` folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
TWILIO_SID=your_twilio_sid
TWILIO_AUTH=your_twilio_auth_token
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
RAZORPAY_KEY=your_payment_key
```

---

### 4️⃣ Run the Application

```bash
# Start backend
npm run server

# Start frontend
npm start
```

---

## 📊 Core Features Breakdown

### 👨‍⚕️ Patient
- Register & Login
- Book / Cancel / Reschedule appointments
- Online payment
- View appointment history
- Receive SMS & email notifications

### 🩺 Doctor
- Manage availability
- Accept / Reject appointments
- View patient details
- Dashboard analytics

### 🛠️ Admin
- Manage doctors & patients
- Monitor revenue
- View system analytics
- Platform management controls

---

## 🔒 Security Features

- JWT Authentication
- OAuth2 Support
- Role-Based Middleware
- Protected Routes
- Secure API Validation

---

## 🚀 Future Enhancements

- 🎥 Video Consultation (Telemedicine)
- 📱 React Native Mobile App
- ⭐ Doctor Rating & Review System
- 🧾 AI Prescription Assistance
- 📈 Advanced Analytics with Charts

---

## 📈 Why This Project Matters

This project demonstrates:

- Real-world SaaS architecture
- Full MERN stack implementation
- AI + Web integration
- Secure authentication & payment systems
- Cloud-ready production deployment

---

## 👨‍💻 Author

**Ketan Chauhan**  
Full Stack Developer (MERN Stack)  
Passionate about scalable applications and AI integration.

🔗 LinkedIn: https://www.linkedin.com/in/ketan-chauhan-82056021a  
🌐 Portfolio: https://portfolio-1-mf6l.onrender.com/  

---

## ⭐ Support

If you found this project helpful, please consider giving it a ⭐ on GitHub.

---

