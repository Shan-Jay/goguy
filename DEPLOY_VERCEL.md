# 🚀 Deploy GoGuy to Vercel

Vercel is great for hosting Node.js + Express apps!

---

## ✅ Option 1: Deploy via GitHub (EASIEST - 2 minutes)

### Step 1: Go to Vercel
1. Open https://vercel.com
2. Click **"Sign Up"** or **"Sign In"**
3. Click **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub account

### Step 2: Import Your Repository
1. Click **"New Project"**
2. Search for **"goguy"**
3. Click on **"Shan-Jay/goguy"** to import
4. Click **"Import"**

### Step 3: Configure Environment Variables
1. Find **"Environment Variables"** section
2. Add your MongoDB URI:
   - **Name:** `MONGODB_URI`
   - **Value:** `mongodb://atlas-sql-69d2ba8307acaa54ca0db1c2-jeuwyj.a.query.mongodb.net/sample_mflix?ssl=true&authSource=admin`
3. Click **"Add"**

### Step 4: Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes for deployment
3. Get your live URL! 🎉

**Your app will be at:** `https://goguy-project.vercel.app`

---

## ✅ Option 2: Deploy via CLI (3 minutes)

### Step 1: Install Vercel CLI
```powershell
npm install -g vercel
```

### Step 2: Login to Vercel
```powershell
vercel login
```

Choose GitHub login, authorize, and return to terminal.

### Step 3: Deploy
```powershell
cd e:\GoGuy
vercel
```

Follow the prompts:
- Project name: `goguy`
- Link to existing project? `No`
- Which scope? `Your account`
- Link detected? `Yes`

### Step 4: Set Environment Variables
```powershell
vercel env add
```

Add:
- Name: `MONGODB_URI`
- Value: Your MongoDB connection string

### Step 5: Redeploy with Variables
```powershell
vercel --prod
```

---

## ⚠️ Important Note

**Vercel has a Serverless limitation:** Node.js processes auto-terminate after requests complete. This can cause MongoDB connection issues.

### Solutions:
1. **MongoDB Connection Pooling** - Use `serverless-mongodb` library
2. **Use Railway Instead** - Better for long-running backend apps
3. **Use Replit** - Easier for Node.js backend

---

## 🔧 Fix: Optimize for Serverless

If you want to use Vercel with serverless, update your `server.js`:

```javascript
// Add connection pooling
const mongoose = require('mongoose');

let isConnected = false;

async function connectToDatabase() {
  if (isConnected) return;
  
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  isConnected = true;
}

// Use this in your routes
```

---

## ✨ Recommendation

For **GoGuy backend**, I recommend:

| Platform | Best For | Effort |
|----------|----------|--------|
| **Railway** ⭐ | Backend servers | Easy |
| **Replit** | Quick testing | Very Easy |
| **Vercel** | Frontend/API routes | Medium |
| **Heroku** | Any app | Medium |

---

## 📋 Quick Commands

```powershell
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel

# Deploy to production
vercel --prod

# View deployments
vercel ls

# Check environment variables
vercel env ls
```

---

## 🎯 Next Steps

1. **Option A:** Use GitHub import at Vercel dashboard (easiest)
2. **Option B:** Use Railway instead (better for backend)
3. **Option C:** Install Vercel CLI and deploy

Which would you prefer?

