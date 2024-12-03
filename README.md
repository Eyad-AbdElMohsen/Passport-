# **OAuth Authentication API**

This API provides user authentication using **Google** and **GitHub** OAuth providers. It also includes endpoints for logging out users and accessing a protected route.

---

## **Setup and Installation**

### **1. Prerequisites**

- **Node.js** (v16 or later)
- **MongoDB** (or any database you're using for your project)
- Environment variables:
    - **`GOOGLE_CLIENT_ID`**
    - **`GOOGLE_CLIENT_SECRET`**
    - **`GOOGLE_CALLBACK_URL`**
    - **`GITHUB_CLIENT_ID`**
    - **`GITHUB_CLIENT_SECRET`**
    - **`GITHUB_CALLBACK_URL`**
    - **`PORT`**
    - **`DB_URL`**
---

### **2. Installation Steps**

1. Clone the repository:
    
    ```bash
    git clone <repository_url>
    cd <repository_folder>
    
    ```
    
2. Install dependencies:
    
    ```bash
    npm install
    
    ```
    
3. Set up environment variables: Create a **`.env`** file in the root directory and add the following:
    
    ```
    GOOGLE_CLIENT_ID=your-google-client-id
    GOOGLE_CLIENT_SECRET=your-google-client-secret
    GOOGLE_CALLBACK_URL=your-google-callback-url
    
    GITHUB_CLIENT_ID=your-github-client-id
    GITHUB_CLIENT_SECRET=your-github-client-secret
    GITHUB_CALLBACK_URL=your-github-callback-url
    
    ```
    
4. Start the server:
    Scripts
    
    Build: Compile TypeScript files.
    
    ```bash
    npm run build
    ```
    
    Start: Start the server.
    ```bash
    npm start
    ```
    
    Preserve: Clean and rebuild the project.
    ```bash
    npm run preserve
    ```
    
    Serve: Run the project in development mode with live reload.
    ```bash
    npm run serve
    ```
    

---

## **API Endpoints**

### **1. Google Authentication**

### **Initiate Login**

**GET** **`/auth/google`**

Redirects users to Google's login page.

**Query Parameters:**

- **`scope`**: Requested user permissions (e.g., **`profile`**, **`email`**).

### **Callback**

**GET** **`/api/sessions/oauth/google`**

Callback URL for handling Google authentication.

- On success: Responds with a success message.
- On failure: Redirects to **`/login`**.

---

### **2. GitHub Authentication**

### **Initiate Login**

**GET** **`/auth/github`**

Redirects users to GitHub's login page.

**Query Parameters:**

- **`scope`**: Requested user permissions (e.g., **`user:email`**).

### **Callback**

**GET** **`/auth/github/callback`**

Callback URL for handling GitHub authentication.

- On success: Responds with a success message.
- On failure: Redirects to **`/login`**.

---

### **3. Logout**

**GET** **`/logout`**

Logs the user out of the application.

- Responds with a success message upon successful logout.

---

### **4. Protected Routes**

### **Dashboard**

**GET** **`/dashboard`**

Returns a welcome message and the authenticated user's data.

**Middleware:** **`isAuthenticated`**

- Ensures only logged-in users can access the route.

**Example Response**:

```json
{
  "message": "Welcome to your dashboard!",
  "user": {
    "_id": "user_id",
    "username": "user_name",
    "email": "user_email"
  }
}

```

---

## **Middleware**

### **isAuthenticated**

This middleware ensures that a user is logged in before accessing protected routes.

- If authenticated: Proceeds to the requested route.
- If not authenticated: Returns an error response.

---

## **Technologies Used**

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for routing and middleware.
- **Passport.js**: For authentication strategies.
- **TypeScript**: Static typing for improved development.
