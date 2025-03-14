# Project Name
 <b>Hands on- Volunteering Platform</b>

## 📌 Project Overview
Hands on Volunteering is a platform developed to connect individuals with meaningful volunteer opportunities.

---

## 🔑 Key Features  

### 👤 **Users**  
✅ **Secure Registration & Sign-In** – Authenticate using JWT with Bcrypt password hashing.  
✅ **Community Help Posts** – Users can create open-ended help requests.  
✅ **Profile Management** – Users can showcase their **skills, interests, and volunteer history**.  
✅ **Volunteer Opportunities** – Browse, join, and participate in events with **one-click registration**.  
✅ **Event Participation & Tracking** – Track all **past and upcoming volunteer activities**.  

### 🏢 **Admin / Organizations**  
✅ **Event Management** – Create, update, or delete events in different categories.  
✅ **Community Help Posts Management** – View, update, and delete community help posts.  
✅ **Profile Management** – Admins can **update user details** and manage roles.  
✅ **Automated Event Handling** – Events dynamically update based on **date**; expired events are removed for users but **not for admins** (admins can edit, restore, or delete them).  

### 📅 **Events & Categories**  
✅ **Event Categories** – Events are classified into **Education, Environment, and Healthcare**, using **dynamic tab-based filtering**.  
✅ **Smart Event Management** – Past events automatically disappear for users but remain **editable or deletable** for admins.  
✅ **Real-Time Updates** – Users get notified of **new events, updates, and participation statuses**.  

### 🤝 **Community Help Requests**  
✅ Users and organizations can **post or respond** to open-ended requests.  
✅ Requests have an **urgency level** (Low, Medium, Urgent) for prioritization.  

---

## 📌 Technologies Used
- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Authentication:** JWT (JSON Web Token)
- **Hashing:** Bcrypt
- **API Requests:** Fetch
- **Tools:** GitHub

## 📌 Features
- User authentication (Login, Signup, Logout)
- CRUD operations (Create, Read, Update, Delete)
- Profile management
- Real-time updates
- Secure API endpoints

## 📌 Database Visualization
<img src="https://i.ibb.co/yFtqQBmY/Volunteers-Platform-ERD.png" alt="Volunteers Platform ERD" width="100%"/>


## 📌 Setup Instructions
1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-repo/project-name.git
   ```
2. **Navigate into the project directory:**
   ```sh
   cd project-name
   ```
3. **Install dependencies:**
   ```sh
   npm install
   ```
4. **Configure environment variables:**
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     DATABASE_URL=your_database_url
     JWT_SECRET=your_jwt_secret
     ```

## 📌 Running the Project
### Development Mode
```sh
npm run dev
```

## 📌 Contributors
- Mohammad Bin Harun ([GitHub](https://github.com/mohdbinharun56))

