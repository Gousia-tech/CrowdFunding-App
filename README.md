# SmileDonors - Crowdfunding Platform for Orphanages 🤝

SmileDonors is a full-stack crowdfunding platform designed to connect compassionate donors with registered orphanages. Built using a microservices architecture, this platform enables secure donations, orphanage discovery, and seamless user experiences for both organizations and donors.

## 🛠 Tech Stack

### Backend
- **Java**, **Spring Boot**
- **MongoDB** for Donor/Organization data
- **JWT** Authentication & Role-based Authorization
- **Microservices**: Auth/Login Service, Organization Service, Razorpay Payment Service

### Frontend
- **React.js** with responsive UI
- **Axios** for API communication
- **Tailwind CSS** / Custom styling for clean, intuitive design

### Payment
- **Razorpay Integration** for real-time secure transactions

---

## ✨ Features

- 🔒 Donor & Organization Registration/Login (JWT secured)
- 📬 Email-based donor/organization profile management
- 🧾 Donor Reviews & Ratings for orphanages
- 💳 Razorpay-based donation gateway
- 🏠 Organization profiles with orphanage details and donation status
- 📊 Dashboard-like UI for donors and organizations
- 🔄 Microservice communication using `RestTemplate` and HTTP APIs

---

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Node.js + npm
- MongoDB (local or cloud)
- IDEs (VSCode + IntelliJ recommended)

### Backend Setup
1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/SmileDonors.git
   cd SmileDonors
