# Step-by-Step Deployment Guide

Since I cannot log into your personal accounts to deploy the code, I have fully prepared the code to be deployed. I've updated your backend to connect to a free **MongoDB** database so your client bookings won't be deleted when you host it online.

Here is exactly what you need to do, step-by-step. It requires no coding!

---

## Step 1: Set up your free Database (MongoDB Atlas)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and sign up for a free account.
2. Click **Build a Database** and select the **FREE Shared** cluster option.
3. Once it's created, you will be asked to create a "Database User". Pick a username and password (write this password down!). Click **Create User**.
4. Important: Under "Network Access" or "IP Access List", click **Add IP Address**, and select **Allow Access from Anywhere** (0.0.0.0/0).
5. Go back to "Database" on the left menu, click **Connect**, then select **Drivers** (Node.js).
6. Under "Add your connection string into your application code", copy the link provided. It will look something like this:
   `mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority`
7. Replace `<password>` in that link with the password you created in step 3. ***Save this final link somewhere safe. This is your `MONGO_URI`.***

---

## Step 2: Push your code to GitHub
1. Create a free account on [GitHub](https://github.com/).
2. You need to gather all the files inside the `website` folder we just created (`public` folder, `models` folder, `server.js`, `database.js`, `package.json`, etc.) and put them into a new GitHub repository.

---

## Step 3: Deploy the Backend (Render.com)
1. Go to [Render](https://render.com/) and sign up with your GitHub account.
2. Click **New +** and select **Web Service**.
3. Connect it to your GitHub account and select your newly created repository.
4. **Important Settings:**
   * **Build Command**: `npm install`
   * **Start Command**: `node server.js`
   * Scroll down to **Environment Variables**. Click **Add Environment Variable**.
   * Key: `MONGO_URI`
   * Value: *(Paste the database link you saved from Step 1!)*
5. Click **Create Web Service**. Wait a few minutes for it to build and deploy. Once it says "Live", copy the URL provided at the very top (e.g., `https://your-app-name.onrender.com`).

---

## Step 4: Deploy the Frontend (Vercel)
1. In your local code editor, open the `website/public/script.js` file.
2. Look for `const response = await fetch('/api/book', ...` (around line 25).
3. Change `'/api/book'` to your actual Render URL plus `/api/book` (e.g., `https://your-app-name.onrender.com/api/book`).
4. Commit and push this change to your GitHub.
5. Go to [Vercel](https://vercel.com/) and sign up with your GitHub.
6. Click **Add New Project**, import your GitHub repository.
7. Under "Root Directory", click Edit and select the `public` folder.
8. Click **Deploy**!

You now have a fully functional, globally deployed website! Let me know if you get stuck on any of these steps.
