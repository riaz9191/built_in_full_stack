# 🚀 Production Deployment Guide

Complete guide to deploying your Next.js blog application to production.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Database Setup (PostgreSQL)](#database-setup-postgresql)
3. [Deploy to Vercel](#deploy-to-vercel-recommended)
4. [Deploy to Railway](#deploy-to-railway)
5. [Deploy to Any Platform (Docker)](#deploy-with-docker)
6. [Post-Deployment Steps](#post-deployment-steps)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

✅ **What You Need:**
- Git repository (GitHub, GitLab, or Bitbucket)
- PostgreSQL database (we'll set this up)
- ImgBB API key for image uploads
- Domain name (optional)

---

## Database Setup (PostgreSQL)

You **must** migrate from SQLite to PostgreSQL for production. Here are free options:

### Option 1: Vercel Postgres (Recommended for Vercel deployments)

1. **Sign up**: [vercel.com](https://vercel.com)
2. **Create database**:
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login and link project
   vercel login
   vercel link
   
   # Create Postgres database
   vercel postgres create
   ```
3. **Get connection string**: Copy from Vercel dashboard
   - Format: `postgres://default:xxx@xxx-pooler.xxx.vercel-storage.com:5432/verceldb`

### Option 2: Supabase (Free tier, excellent for any platform)

1. **Sign up**: [supabase.com](https://supabase.com)
2. **Create project**: Click "New Project"
3. **Get connection string**:
   - Go to: Settings → Database → Connection String
   - Select "URI" mode
   - Format: `postgresql://postgres:xxx@db.xxx.supabase.co:5432/postgres`

### Option 3: Railway (Free tier, built-in with deployment)

1. **Sign up**: [railway.app](https://railway.app)
2. **Create project**: Click "New Project"
3. **Add PostgreSQL**: Click "Add Database" → PostgreSQL
4. **Get connection string**: Automatically provided in environment variables

### Option 4: Neon (Free tier, serverless)

1. **Sign up**: [neon.tech](https://neon.tech)
2. **Create project**: Click "Create Project"
3. **Get connection string**: Copy from dashboard
   - Format: `postgresql://xxx:xxx@ep-xxx.us-east-2.aws.neon.tech/neondb`

---

## Deploy to Vercel (Recommended)

**Best for**: Zero-config, fastest deployment, great for Next.js

### Step 1: Prepare Your Repository

```bash
# Commit all changes
git add .
git commit -m "Prepare for production deployment"
git push origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository
4. Configure project:
   - **Framework**: Next.js (auto-detected)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### Step 3: Set Environment Variables

In Vercel dashboard, go to **Settings → Environment Variables**:

```env
DATABASE_URL=postgresql://your_connection_string
IMGBB_API_KEY=your_imgbb_api_key
NODE_ENV=production
```

### Step 4: Deploy

Click **"Deploy"** - Vercel will:
1. Install dependencies
2. Generate Prisma client
3. Build your application
4. Deploy to production

### Step 5: Run Database Migration

After first deployment:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Run migration
vercel env pull .env.production
npm run db:migrate:deploy
```

**Your app is live!** 🎉 Visit the URL provided by Vercel.

---

## Deploy to Railway

**Best for**: Full-stack apps, automatic PostgreSQL included

### Step 1: Connect Repository

1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository

### Step 2: Add PostgreSQL Database

1. In your Railway project, click "**New**"
2. Select "**Database**" → "**PostgreSQL**"
3. Railway automatically creates `DATABASE_URL` variable

### Step 3: Configure Environment Variables

Click on your app service → **Variables** tab:

```env
IMGBB_API_KEY=your_imgbb_api_key
NODE_ENV=production
```

(DATABASE_URL is automatically set by Railway)

### Step 4: Configure Build

Railway auto-detects Next.js, but you can customize:

- **Build Command**: `npm run build`
- **Start Command**: `npm start`

### Step 5: Deploy

Click "**Deploy**" - Railway will:
1. Install dependencies
2. Run migrations automatically
3. Build and deploy

**Your app is live!** 🎉 Railway provides a public URL.

---

## Deploy with Docker

**Best for**: Any cloud platform (AWS, GCP, Azure, DigitalOcean)

### Step 1: Build Docker Image

```bash
# Build image
docker build -t my-blog:latest .

# Test locally
docker run -p 3000:3000 \
  -e DATABASE_URL="your_postgres_connection_string" \
  -e IMGBB_API_KEY="your_api_key" \
  my-blog:latest
```

### Step 2: Push to Registry

```bash
# Tag for registry (example: Docker Hub)
docker tag my-blog:latest yourusername/my-blog:latest

# Push
docker push yourusername/my-blog:latest
```

### Step 3: Deploy to Platform

**AWS ECS, Google Cloud Run, Azure Container Instances, etc.**

Follow your platform's container deployment guide using the image: `yourusername/my-blog:latest`

Set environment variables:
- `DATABASE_URL`
- `IMGBB_API_KEY`
- `NODE_ENV=production`

---

## Post-Deployment Steps

### 1. Run Database Migrations

Make sure your database schema is up to date:

```bash
# For Vercel
vercel env pull .env.production
DATABASE_URL="your_production_url" npm run db:migrate:deploy

# Or use Prisma Studio to check
DATABASE_URL="your_production_url" bunx prisma studio
```

### 2. Seed Initial Data (Optional)

Create your first user:

```bash
# Update seed.js with your email
# Then run:
DATABASE_URL="your_production_url" node seed.js
```

### 3. Test Your Deployment

1. Visit your production URL
2. Navigate to `/blog`
3. Create a test post
4. Upload an image (test ImgBB integration)
5. Check database has the data

### 4. Set Up Custom Domain (Optional)

**Vercel:**
1. Go to Settings → Domains
2. Add your domain
3. Configure DNS records as shown

**Railway:**
1. Go to Settings → Domains
2. Click "Generate Domain" or add custom domain
3. Update DNS records

### 5. Configure Production Database

**Enable connection pooling** (recommended):

For Vercel Postgres or Supabase:
```env
# Use pooled connection (recommended for serverless)
DATABASE_URL="postgresql://...?pgbouncer=true"
```

---

## Troubleshooting

### Issue: "Environment variable not found: DATABASE_URL"

**Solution:**
1. Check environment variables are set in your platform dashboard
2. Redeploy after adding variables
3. For local testing, create `.env.production`:
   ```bash
   cp .env.production.example .env.production
   # Edit with your values
   ```

### Issue: Database connection errors

**Solution:**
1. Verify connection string format is correct
2. Check IP allowlist (some databases require whitelisting `0.0.0.0/0`)
3. For Vercel: Use pooled connection string
4. Test connection locally:
   ```bash
   DATABASE_URL="your_url" bunx prisma db push
   ```

### Issue: Build fails with Prisma errors

**Solution:**
1. Ensure `postinstall` script runs Prisma generate:
   ```json
   "postinstall": "prisma generate"
   ```
2. Clear build cache and redeploy
3. Check Prisma version compatibility

### Issue: Images not uploading

**Solution:**
1. Verify `IMGBB_API_KEY` is set correctly
2. Check API key is valid at [imgbb.com](https://api.imgbb.com)
3. Check browser console for errors
4. Test API key:
   ```bash
   curl -X POST "https://api.imgbb.com/1/upload?key=YOUR_KEY" \
     -F "image=base64_image_data"
   ```

### Issue: App crashes after deployment

**Solution:**
1. Check deployment logs in your platform dashboard
2. Verify all environment variables are set
3. Check Node.js version compatibility (v18+)
4. Test build locally:
   ```bash
   NODE_ENV=production npm run build
   NODE_ENV=production npm start
   ```

### Issue: Slow database queries

**Solution:**
1. Enable connection pooling
2. Add database indexes (check [prisma/schema.prisma](prisma/schema.prisma))
3. Use Prisma's query optimization:
   ```typescript
   // Add indexes for frequently queried fields
   model Post {
     @@index([published])
     @@index([createdAt])
   }
   ```

---

## Environment Variables Checklist

Before deploying, ensure you have:

- [ ] `DATABASE_URL` - PostgreSQL connection string
- [ ] `IMGBB_API_KEY` - ImgBB API key for image uploads
- [ ] `NODE_ENV=production` - Production environment flag
- [ ] Domain configured (if using custom domain)
- [ ] SSL/HTTPS enabled (automatic on most platforms)

---

## Quick Deploy Commands

```bash
# Vercel
vercel --prod

# Railway
railway up

# Docker
docker build -t my-blog . && docker push my-blog

# Heroku
git push heroku main

# Netlify
netlify deploy --prod
```

---

## Platform Comparison

| Platform | Database | Deployment | Cost | Best For |
|----------|----------|------------|------|----------|
| **Vercel** | External | Automatic | Free tier | Next.js apps |
| **Railway** | Built-in | Automatic | Free tier | Full-stack |
| **Netlify** | External | Automatic | Free tier | Static/JAMstack |
| **AWS** | RDS | Manual | Pay-as-go | Enterprise |
| **DigitalOcean** | Built-in | Manual | $5+/month | Custom setup |

---

## Next Steps After Deployment

1. ✅ Set up monitoring (Vercel Analytics, Railway Metrics)
2. ✅ Configure error tracking (Sentry, LogRocket)
3. ✅ Set up automated backups for database
4. ✅ Enable CDN for static assets
5. ✅ Configure SEO metadata
6. ✅ Set up SSL certificate (automatic on most platforms)
7. ✅ Create sitemap for better SEO
8. ✅ Add Google Analytics or similar

---

## Support & Resources

- **Next.js Deployment**: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Railway Documentation**: [docs.railway.app](https://docs.railway.app)
- **Prisma Deployment**: [prisma.io/docs/guides/deployment](https://www.prisma.io/docs/guides/deployment)

---

**Your blog is now production-ready!** 🚀

Need help? Check the troubleshooting section or reach out to your platform's support team.
