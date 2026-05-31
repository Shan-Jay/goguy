# ⚡ Quick Start

## 3-Step Local Setup

### Step 1: Install & Run
```bash
npm install
npm start
```

### Step 2: Get MongoDB (1 minute)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create free cluster (region: closest to you)
4. Create database user → Save password
5. Add IP "0.0.0.0/0" to Network Access

### Step 3: Get Connection String & Configure
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Open `.env` file:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/goguy?retryWrites=true&w=majority
   ```
5. Replace `username` and `password`

Done! Visit http://localhost:5000

---

## Deploy (Choose One)

### 🚂 Railway (Easiest - 2 minutes)
1. Go to railway.app
2. "New Project" → "Deploy from GitHub"
3. Select this repo
4. Add `MONGODB_URI` environment variable
5. Done! ✅

### 🎪 Replit (No setup - 1 minute)
1. Go to replit.com
2. Import from GitHub
3. Add "MONGODB_URI" secret
4. Click Run ▶️

### 🎢 Heroku
```bash
heroku create goguy-app
heroku config:set MONGODB_URI="your_string"
git push heroku main
```

---

## That's It! 🎉
Your app now has online database working from anywhere!
