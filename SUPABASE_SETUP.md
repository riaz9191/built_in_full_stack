# 🚀 Complete Supabase Setup Guide - Step by Step

Everything you need to deploy your blog on Supabase (works with Vercel, Railway, or any platform).

---

## 📋 Table of Contents

1. [What is Supabase?](#what-is-supabase)
2. [Create Supabase Account](#step-1-create-supabase-account)
3. [Create a Project](#step-2-create-a-project)
4. [Get Connection String](#step-3-get-connection-string)
5. [Update Your Project](#step-4-update-your-project)
6. [Test Connection](#step-5-test-connection)
7. [Deploy to Vercel](#step-6-deploy-to-vercel-optional)
8. [Common Issues](#common-issues)

---

## What is Supabase?

**Supabase** = Free PostgreSQL Database in the Cloud

- ✅ Free tier: 500MB database
- ✅ Easy to use dashboard
- ✅ Works with any platform (Vercel, Railway, etc.)
- ✅ Perfect for small to medium projects
- ✅ Auto-backups included

---

## Step 1: Create Supabase Account

### 1.1 Go to Supabase Website
Open: [https://supabase.com](https://supabase.com)

You'll see the homepage with a "Start your project" button.

### 1.2 Sign Up

**Option A: GitHub (Recommended)**
1. Click "Sign Up" → "Continue with GitHub"
2. Click "Authorize supabase" if prompted
3. Done! ✅

**Option B: Email**
1. Click "Sign Up" → "Email"
2. Enter your email
3. Check your email for verification link
4. Click the link to verify
5. Create a password
6. Done! ✅

### 1.3 Verify Email
- Check your email inbox for Supabase verification
- Click the verification link
- You're now logged in!

---

## Step 2: Create a Project

### 2.1 Start New Project

Once logged in, you'll see the Supabase dashboard.

Click: **"New Project"** button (green button, top right)

### 2.2 Fill Project Details

You'll see a form with these fields:

**Name Your Project:**
```
My Blog App
```
(or any name you like)

**Database Password:**
```
Create a strong password: MySecure@Pass123
```
⚠️ **Save this password!** You'll need it later.

**Region:**
```
Choose closest to you:
- us-east-1 (New York - US)
- eu-west-1 (Ireland - Europe)
- ap-southeast-1 (Singapore - Asia)
```
Pick based on where your users are.

### 2.3 Create Project

Click: **"Create new project"** button

⏳ Wait 1-2 minutes for project to initialize...

You'll see a loading screen. Don't close it!

✅ When done, you'll see: **"Project is ready!"**

---

## Step 3: Get Connection String

### 3.1 Open Project Settings

Click the **gear icon** (⚙️) at the bottom left → **Project Settings**

### 3.2 Navigate to Database

In the left sidebar, click: **Database**

### 3.3 Get Connection String

Look for the section: **"Connection String"**

You'll see several options. Click: **"URI"**

Copy the connection string. It looks like:

```
postgresql://postgres:YOUR_PASSWORD@db.XXXXX.supabase.co:5432/postgres
```

**Replace `YOUR_PASSWORD` with the password you created in Step 2.2**

Example (with real password):
```
postgresql://postgres:MySecure@Pass123@db.abcdef123456.supabase.co:5432/postgres
```

💾 **Save this connection string!** You'll need it in the next step.

### 3.4 Alternative: Copy via Dashboard

If you can't find it:
1. Go to: **Settings** (⚙️) → **Database**
2. Scroll to: **Connection String**
3. Select: **URI** tab
4. Copy the full string

---

## Step 4: Update Your Project

Now connect your local project to Supabase.

### 4.1 Update `.env` File

Open: `.env` in your project root

Change this line:
```env
DATABASE_URL="file:./db/custom.db"
```

To this (paste your Supabase connection string):
```env
DATABASE_URL="postgresql://postgres:MySecure@Pass123@db.abcdef123456.supabase.co:5432/postgres"
```

**Your file should look like:**
```env
# Database - Supabase PostgreSQL
DATABASE_URL="postgresql://postgres:MySecure@Pass123@db.abcdef123456.supabase.co:5432/postgres"

# Image Upload
IMGBB_API_KEY=your_api_key_here

# Environment
NODE_ENV=development
```

### 4.2 Save the File

Press: **Ctrl+S** (or Cmd+S on Mac)

---

## Step 5: Test Connection

Let's verify everything works!

### 5.1 Open Terminal

Open your terminal/command prompt in your project folder.

### 5.2 Generate Prisma Client

Run this command:

```bash
bun run db:generate
```

You should see:
```
✅ Generated Prisma Client
```

If you get an error, check your DATABASE_URL has correct password.

### 5.3 Push Schema to Supabase

Run this command:

```bash
bun run db:push
```

This will:
1. Connect to Supabase
2. Create User table
3. Create Post table

You should see:
```
✅ Pushed to database successfully
```

If it asks "Do you want to continue?", type: **y** and press Enter

### 5.4 Verify in Supabase Dashboard

1. Go back to [supabase.com](https://supabase.com)
2. Click your project
3. In left sidebar, click: **SQL Editor** or **Table Editor**
4. You should see your tables:
   - `User`
   - `Post`

✅ Success! Your database is connected!

### 5.5 Test Locally

Start your app:

```bash
bun run dev
```

Visit: http://localhost:8888

Try creating a blog post - it should save to Supabase!

---

## Step 6: Deploy to Vercel (Optional)

Ready to make it live? Deploy to Vercel!

### 6.1 Push Code to GitHub

First, commit your changes:

```bash
git add .
git commit -m "Connect to Supabase database"
git push origin main
```

### 6.2 Go to Vercel

Open: [https://vercel.com](https://vercel.com)

Click: **"Add New..."** → **"Project"**

### 6.3 Import Repository

1. Click **"Import Git Repository"**
2. Select your GitHub repository
3. Click **"Import"**

### 6.4 Configure Project

You'll see project settings:

**Framework Preset**: Next.js (should be auto-selected)

**Build Command**: Leave as default (Vercel auto-detects)

**Output Directory**: `.next` (auto-filled)

### 6.5 Add Environment Variables

Scroll down to: **Environment Variables**

Add these variables:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | `postgresql://postgres:YOUR_PASSWORD@db.xxx.supabase.co:5432/postgres` |
| `IMGBB_API_KEY` | Your ImgBB API key |
| `NODE_ENV` | `production` |

Click **"Add"** for each one.

### 6.6 Deploy

Click: **"Deploy"** button

⏳ Wait 2-5 minutes for deployment...

When done, Vercel shows:
```
✅ Production
Deployment successful!
```

Click the domain link to visit your live blog! 🎉

---

## Complete Connection String Reference

Your Supabase connection string format:

```
postgresql://postgres:PASSWORD@db.PROJECT_ID.supabase.co:5432/postgres
```

Where:
- `PASSWORD` = Password you created in Step 2.2
- `PROJECT_ID` = Long random string (auto-generated)
- `5432` = PostgreSQL port (don't change)
- `postgres` = Default database name (don't change)

**Full example:**
```
postgresql://postgres:MySecure@Pass123@db.abcdef123456.supabase.co:5432/postgres
```

---

## Supabase Dashboard Features

Once connected, explore these features:

### 📊 Table Editor
- View your data
- Add/edit posts manually
- View user profiles

**Path**: Left sidebar → **Table Editor**

### 🔍 SQL Editor
- Run custom SQL queries
- Create backups
- Advanced database operations

**Path**: Left sidebar → **SQL Editor**

### 📈 Database Monitoring
- Check database usage (500MB free)
- View connection stats
- Monitor performance

**Path**: Settings ⚙️ → **Database**

### 🔐 Security Settings
- Database backups (auto-enabled)
- Access controls
- Replication

**Path**: Settings ⚙️ → **Database** → **Backups**

---

## Terminal Commands Quick Reference

```bash
# Generate Prisma client
bun run db:generate

# Push schema to database
bun run db:push

# Migrate database
bun run db:migrate:deploy

# Open Prisma Studio (view data)
bunx prisma studio

# Start dev server
bun run dev

# Build for production
bun run build

# Start production server
bun start
```

---

## Verify Deployment Steps

After deployment to Vercel:

### ✅ Check #1: App Loads
1. Visit your Vercel domain
2. Should see your blog homepage
3. No errors in browser console (F12)

### ✅ Check #2: Database Connected
1. Click "New Post"
2. Create a test post
3. Check post appears in blog
4. Post should be saved to Supabase

### ✅ Check #3: Images Work (If API key set)
1. Try uploading an image with a post
2. Image should appear
3. Check Supabase table editor for the image URL

### ✅ Check #4: Verify in Supabase
1. Go to [supabase.com](https://supabase.com)
2. Click your project
3. Go to **Table Editor**
4. Click **Post** table
5. Should see your test post there!

---

## Common Issues & Fixes

### ❌ Error: "PASSWORD authentication failed"

**Problem**: Password is wrong in connection string

**Fix**:
1. Go to Supabase dashboard
2. Settings ⚙️ → **Database** → **Connection String**
3. Check your password (you set it in Step 2.2)
4. Update `.env` with correct password

### ❌ Error: "Cannot find module '@prisma/client'"

**Problem**: Prisma client not generated

**Fix**:
```bash
bun run db:generate
```

### ❌ Error: "FATAL: remaining connection slots reserved for non-replication superuser connections"

**Problem**: Too many database connections (free tier limit)

**Fix**:
```bash
# Use connection pooling for Supabase
DATABASE_URL="postgresql://postgres:PASSWORD@db.xxx.supabase.co:6543/postgres"
#                                                              ^^^^
# Change 5432 to 6543 for pooling
```

### ❌ Error: "Relations do not exist"

**Problem**: Tables not created in database

**Fix**:
```bash
bun run db:push
```

### ❌ Error: "502 Bad Gateway" on Vercel

**Problem**: Database connection issue in production

**Fix**:
1. Verify DATABASE_URL in Vercel dashboard
2. Check connection string format
3. Redeploy: Click **Redeploy** in Vercel dashboard

### ❌ Cannot find connection string in dashboard

**Fix**:
1. Go to [supabase.com](https://supabase.com)
2. Click your project name
3. Click ⚙️ (Settings) bottom left
4. Click **Database** in sidebar
5. Look for **Connection String** section
6. Click **URI** tab
7. Copy the string

---

## File Checklist

Before deploying, verify these files are updated:

- [ ] `.env` - Contains Supabase DATABASE_URL
- [ ] `prisma/schema.prisma` - Set to `provider = "postgresql"`
- [ ] `.gitignore` - Contains `.env` (so you don't accidentally commit secrets)
- [ ] `package.json` - Contains latest build scripts

Run this to check:

```bash
cat .env | grep DATABASE_URL
cat prisma/schema.prisma | grep provider
```

---

## Security Best Practices

### 🔐 Protect Your Credentials

1. **Never commit `.env`** - Already in `.gitignore` ✅
2. **Never share connection string** - It has your password!
3. **Use strong password** - Your Supabase password
4. **Enable backups** - Done automatically ✅
5. **Monitor usage** - Check Supabase dashboard

### 🔒 Supabase Security Features

- Automatic backups ✅
- SSL/TLS encryption ✅
- Row-level security (available)
- Automated security updates ✅

---

## Monitoring Your Database

### Free Tier Limits

- **500MB** database size
- **10 concurrent connections**
- **Unlimited queries**
- **Auto-backups** (7-day retention)

Check usage:

1. Go to Supabase dashboard
2. Click your project
3. Settings ⚙️ → **Database**
4. See "Storage used" near top

### When to Upgrade

Upgrade to paid plan when you reach:
- 400MB+ database size
- Frequent connection timeouts
- Need more backups retention
- Need 24/7 support

---

## What's Next

### After Deployment

1. ✅ Set up custom domain (Vercel dashboard)
2. ✅ Configure email notifications
3. ✅ Set up GitHub Actions for CI/CD
4. ✅ Configure Sentry for error tracking
5. ✅ Enable Google Analytics

### Optional Enhancements

1. **Enable Row Level Security (RLS)** - Secure data access
2. **Add Supabase Auth** - User authentication
3. **Enable Realtime** - Live updates to posts
4. **Use Supabase Storage** - Store images there instead of ImgBB

---

## Support & Resources

- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Prisma Docs**: [prisma.io/docs](https://www.prisma.io/docs)
- **PostgreSQL Docs**: [postgresql.org/docs](https://www.postgresql.org/docs)

---

## Summary

You've successfully:

✅ Created Supabase account  
✅ Created PostgreSQL database  
✅ Got connection string  
✅ Connected your local project  
✅ Pushed database schema  
✅ Tested database connection  
✅ Deployed to Vercel (optional)  
✅ Created test post in live app  

**Your blog is now live on the internet!** 🎉

---

**Questions?** Go through the steps again or check the **Common Issues** section above.

**Stuck?** The terminal error message usually tells you exactly what's wrong. Copy the error and check the fixes above!

---

**Last Updated**: January 15, 2026
